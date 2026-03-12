use std::net::SocketAddr;

use axum::Router;
use tokio::net::TcpListener;
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing::info;

use crate::{app::build_router, auth::DevAuth, config::AppConfig, state::AppState};

pub async fn serve(cfg: AppConfig) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let addr = SocketAddr::new(cfg.host, cfg.port);

    let mut state = AppState::default();
    state.dev_token = cfg.dev_token.clone();

    let dev_auth = DevAuth {
        token: cfg.dev_token.clone(),
    };

    // Dev CORS: allow all (avoid browser CORS friction during development).
    // NOTE: tighten this for production.
    let cors = CorsLayer::permissive();

    let app: Router = build_router(state, dev_auth)
        .layer(cors)
        .layer(TraceLayer::new_for_http());

    let listener = TcpListener::bind(addr).await?;
    info!(listen_addr = %addr, "listening");

    axum::serve(listener, app).await?;
    Ok(())
}
