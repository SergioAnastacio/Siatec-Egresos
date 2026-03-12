mod app;
mod config;
mod http;
mod openapi;
mod routes;
mod telemetry;

use crate::{config::AppConfig, telemetry::init_telemetry};
use tracing::{error, info};

#[tokio::main]
async fn main() {
    // Loads variables from .env (if present) into process env.
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
