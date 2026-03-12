use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::Serialize;
use tokio_util::compat::TokioAsyncWriteCompatExt;
use utoipa::ToSchema;

use crate::{config::AppConfig, error::api_error};

#[derive(Debug, Serialize, ToSchema)]
pub struct DbHealthResponse {
    pub ok: bool,
    pub message: Option<String>,
}

/// GET /db/health
///
/// Smoke test for SQL Server connectivity.
///
/// Requires:
/// - `SQLSERVER_URL` in environment (see `.env.example`).
///
/// Note: intended for development environments only.
#[utoipa::path(
    get,
    path = "/db/health",
    tag = "Ops",
    responses(
        (status = 200, description = "DB OK", body = DbHealthResponse),
        (status = 400, description = "Bad request / missing or invalid SQLSERVER_URL", body = ApiError),
        (status = 503, description = "DB unavailable", body = DbHealthResponse)
    )
)]
pub async fn get_db_health() -> axum::response::Response {
    let cfg = match AppConfig::from_env() {
        Ok(c) => c,
        Err(e) => return api_error(StatusCode::INTERNAL_SERVER_ERROR, "config_error", e).into_response(),
    };

    let Some(conn_str) = cfg.sqlserver_url.clone() else {
        return api_error(
            StatusCode::BAD_REQUEST,
            "missing_sqlserver_url",
            "SQLSERVER_URL is not set".to_string(),
        )
        .into_response();
    };

    let config = match tiberius::Config::from_ado_string(&conn_str) {
        Ok(c) => c,
        Err(e) => {
            return api_error(
                StatusCode::BAD_REQUEST,
                "invalid_sqlserver_url",
                format!("Invalid SQLSERVER_URL: {e}"),
            )
            .into_response();
        }
    };

    let addr = config.get_addr();

    let tcp = match tokio::net::TcpStream::connect(addr).await {
        Ok(s) => s,
        Err(e) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(DbHealthResponse {
                    ok: false,
                    message: Some(format!("TCP connect failed: {e}")),
                }),
            )
                .into_response();
        }
    };

    tcp.set_nodelay(true).ok();

    let mut client = match tiberius::Client::connect(config, tcp.compat_write()).await {
        Ok(c) => c,
        Err(e) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(DbHealthResponse {
                    ok: false,
                    message: Some(format!("SQL Server connect failed: {e}")),
                }),
            )
                .into_response();
        }
    };

    // tiberius returns a QueryStream that borrows `client`; ensure it is dropped before returning.
    let resp = {
        let res = client.simple_query("SELECT 1 AS ok").await;
        match res {
            Ok(_) => (
                StatusCode::OK,
                Json(DbHealthResponse {
                    ok: true,
                    message: None,
                }),
            )
                .into_response(),
            Err(e) => (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(DbHealthResponse {
                    ok: false,
                    message: Some(format!("Query failed: {e}")),
                }),
            )
                .into_response(),
        }
    };

    resp
}
