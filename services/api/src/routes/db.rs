use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::Serialize;

use crate::{config::AppConfig, error::api_error};

#[derive(Debug, Serialize)]
pub struct DbHealthResponse {
    pub ok: bool,
}

/// GET /db/health
///
/// Smoke test for SQL Server connectivity.
///
/// Note: This is best-effort and intended for development environments only.
pub async fn get_db_health() -> impl IntoResponse {
    // Placeholder for now; full connectivity check will be implemented when env/driver requirements are confirmed.
    // We return 501 until SQLSERVER_URL is configured and the check is implemented.
    api_error(
        StatusCode::NOT_IMPLEMENTED,
        "db_health_not_implemented",
        "SQL Server smoke check not implemented yet",
    )
}
