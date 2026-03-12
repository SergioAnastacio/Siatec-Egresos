use axum::{routing::get, Router};

use crate::routes;

pub fn build_router() -> Router {
    // Root router: only platform/ops endpoints for now.
    // Business endpoints will live under /api/v1 (reserved).
    let v1 = Router::new();

    Router::new()
        .route("/health", get(routes::health::get_health))
        .route("/version", get(routes::version::get_version))
        .nest("/api/v1", v1)
}
