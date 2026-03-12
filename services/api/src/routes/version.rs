use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::Serialize;
use utoipa::ToSchema;

#[derive(Debug, Serialize, ToSchema)]
pub struct VersionResponse {
    pub name: &'static str,
    pub version: &'static str,
}

#[utoipa::path(
    get,
    path = "/version",
    tag = "Ops",
    responses((status = 200, description = "Versión del servicio", body = VersionResponse))
)]
pub async fn get_version() -> impl IntoResponse {
    (
        StatusCode::OK,
        Json(VersionResponse {
            name: env!("CARGO_PKG_NAME"),
            version: env!("CARGO_PKG_VERSION"),
        }),
    )
}
