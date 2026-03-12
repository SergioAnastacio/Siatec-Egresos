use axum::{
    body::Body,
    extract::State,
    http::{header, Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
};

use crate::error::api_error;

#[derive(Debug, Clone)]
pub struct DevAuth {
    /// If `None`, auth is disabled (useful for local dev).
    pub token: Option<String>,
}

pub async fn require_dev_token(
    State(auth): State<DevAuth>,
    req: Request<Body>,
    next: Next,
) -> Response {
    let Some(expected) = auth.token.as_deref().filter(|t| !t.is_empty()) else {
        // Auth not configured; keep routes accessible.
        return next.run(req).await;
    };

    let header_value = req
        .headers()
        .get(header::AUTHORIZATION)
        .and_then(|h| h.to_str().ok());

    let Some(header_value) = header_value else {
        return api_error(
            StatusCode::UNAUTHORIZED,
            "unauthorized",
            "missing Authorization header",
        )
        .into_response();
    };

    let Some(token) = header_value.strip_prefix("Bearer ") else {
        return api_error(
            StatusCode::UNAUTHORIZED,
            "unauthorized",
            "invalid Authorization scheme (expected Bearer)",
        )
        .into_response();
    };

    if token != expected {
        return api_error(StatusCode::UNAUTHORIZED, "unauthorized", "invalid token")
            .into_response();
    }

    next.run(req).await
}
