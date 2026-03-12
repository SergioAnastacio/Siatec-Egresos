use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct VersionResponse {
    pub name: &'static str,
    pub version: &'static str,
}

pub async fn get_version() -> impl IntoResponse {
    (
        StatusCode::OK,
        Json(VersionResponse {
            name: env!("CARGO_PKG_NAME"),
            version: env!("CARGO_PKG_VERSION"),
        }),
    )
}
