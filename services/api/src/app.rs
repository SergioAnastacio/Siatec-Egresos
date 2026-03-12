use axum::{middleware, routing::get, Router};
use utoipa::OpenApi;

use crate::{auth, auth::DevAuth, openapi::ApiDoc, routes, state::AppState};

pub fn build_router(state: AppState, dev_auth: DevAuth) -> Router {
    // Business endpoints live under /api/v1.
    //
    // Public (read-only)
    let egresos_public = Router::new()
        .route("/", get(routes::egresos::list_egresos))
        .route("/{egreso_id}", get(routes::egresos::get_egreso));

    // Protected (write)
    let egresos_protected = Router::new()
        .route("/", axum::routing::post(routes::egresos::create_egreso))
        .route(
            "/{egreso_id}/status",
            axum::routing::patch(routes::egresos::update_egreso_status),
        )
        .route_layer(middleware::from_fn_with_state(
            dev_auth,
            auth::require_dev_token,
        ));

    let egresos = Router::new().merge(egresos_public).merge(egresos_protected);

    let v1 = Router::new().nest("/egresos", egresos);

    Router::new()
        .route("/health", get(routes::health::get_health))
        .route("/version", get(routes::version::get_version))
        .route("/openapi.json", get(|| async { axum::Json(ApiDoc::openapi()) }))
        .route("/db/health", get(routes::db::get_db_health))
        .nest("/api/v1", v1)
        .with_state(state)
}
