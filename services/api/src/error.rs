use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::Serialize;
use utoipa::ToSchema;

#[derive(Debug, Serialize, ToSchema)]
pub struct ApiError {
    pub code: &'static str,
    pub message: String,
}

pub fn api_error(
    status: StatusCode,
    code: &'static str,
    message: impl Into<String>,
) -> impl IntoResponse {
    (
        status,
        Json(ApiError {
            code,
            message: message.into(),
        }),
    )
}
