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
            dev_auth.clone(),
            auth::require_dev_token,
        ));

    let egresos = Router::new().merge(egresos_public).merge(egresos_protected);

    let auth_public = Router::new().route("/login", axum::routing::post(routes::auth::login));

    let auth_protected = Router::new()
        .route("/me", get(routes::auth::me))
        .route_layer(middleware::from_fn_with_state(
            dev_auth.clone(),
            auth::require_dev_token,
        ));

    let auth_router = Router::new().merge(auth_public).merge(auth_protected);

    let users_router = Router::new()
        .route("/", get(routes::users::list_users))
        .route("/{id}", get(routes::users::get_user))
        .route_layer(middleware::from_fn_with_state(
            dev_auth.clone(),
            auth::require_dev_token,
        ));

    let solicitudes_router = Router::new()
        .route("/", get(routes::solicitudes::list_solicitudes))
        .route("/", axum::routing::post(routes::solicitudes::create_solicitud))
        .route("/{id}", get(routes::solicitudes::get_solicitud))
        .route("/{id}", axum::routing::patch(routes::solicitudes::update_solicitud))
        .route(
            "/{id}/status",
            axum::routing::patch(routes::solicitudes::update_solicitud_status),
        )
        .route_layer(middleware::from_fn_with_state(
            dev_auth.clone(),
            auth::require_dev_token,
        ));

    let v1 = Router::new()
        .nest("/auth", auth_router)
        .nest("/users", users_router)
        .nest("/egresos", egresos)
        .nest("/solicitudes", solicitudes_router);

    Router::new()
        .route("/health", get(routes::health::get_health))
        .route("/version", get(routes::version::get_version))
        .route("/openapi.json", get(|| async { axum::Json(ApiDoc::openapi()) }))
        .route("/db/health", get(routes::db::get_db_health))
        .nest("/api/v1", v1)
        .with_state(state)
}
