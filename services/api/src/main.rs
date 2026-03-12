mod app;
mod auth;
mod config;
mod error;
mod http;
mod openapi;
mod routes;
mod state;
mod telemetry;

use crate::{config::AppConfig, telemetry::init_telemetry};
use tracing::{error, info};

#[tokio::main]
async fn main() {
    // Loads variables from .env into process env.
    //
    // By default `dotenvy::dotenv()` looks for `.env` in the current working directory.
    // In practice, we sometimes run the API from the repo root, so we also try parent
    // directories (best-effort) to reduce setup friction.
    if let Ok(mut dir) = std::env::current_dir() {
        for _ in 0..4 {
            let candidate = dir.join(".env");
            if candidate.exists() {
                let _ = dotenvy::from_path(&candidate);
                break;
            }
            if !dir.pop() {
                break;
            }
        }
    }

    // Fallback to default behavior.
    let _ = dotenvy::dotenv();

    let cfg = match AppConfig::from_env() {
        Ok(c) => c,
        Err(e) => {
            eprintln!("Failed to load configuration: {e}");
            std::process::exit(1);
        }
    };

    init_telemetry(&cfg);

    info!(
        host = %cfg.host,
        port = cfg.port,
        log_level = %cfg.log_level,
        "starting api"
    );

    if let Err(e) = http::serve(cfg).await {
        error!(error = %e, "server terminated with error");
        std::process::exit(1);
    }
}
