use axum::{routing::get, Router};
use utoipa::OpenApi;

use crate::{openapi::ApiDoc, routes, state::AppState};

pub fn build_router(state: AppState) -> Router {
    // Business endpoints live under /api/v1.
    let egresos = Router::new()
        .route(
            "/",
            get(routes::egresos::list_egresos).post(routes::egresos::create_egreso),
        )
        .route("/{egreso_id}", get(routes::egresos::get_egreso))
        .route(
            "/{egreso_id}/status",
            axum::routing::patch(routes::egresos::update_egreso_status),
        );

    let v1 = Router::new().nest("/egresos", egresos);

    Router::new()
        .route("/health", get(routes::health::get_health))
        .route("/version", get(routes::version::get_version))
        .route("/openapi.json", get(|| async { axum::Json(ApiDoc::openapi()) }))
        .nest("/api/v1", v1)
        .with_state(state)
}
