use std::net::SocketAddr;

use axum::Router;
use tokio::net::TcpListener;
use tower_http::trace::TraceLayer;
use tracing::info;

use crate::{app::build_router, config::AppConfig, state::AppState};

pub async fn serve(cfg: AppConfig) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let addr = SocketAddr::new(cfg.host, cfg.port);

    let state = AppState::default();
    let app: Router = build_router(state).layer(TraceLayer::new_for_http());

    let listener = TcpListener::bind(addr).await?;
    info!(listen_addr = %addr, "listening");

    axum::serve(listener, app).await?;
    Ok(())
}
