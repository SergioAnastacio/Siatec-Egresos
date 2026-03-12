use axum::{
    extract::Path,
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use siatec_egresos_egresos::{CreateEgresoRequest, Egreso, EgresoStatus};

#[derive(Debug, Serialize, ToSchema)]
pub struct ApiError {
    pub code: &'static str,
    pub message: String,
}

fn not_implemented() -> impl IntoResponse {
    (
        StatusCode::NOT_IMPLEMENTED,
        Json(ApiError {
            code: "not_implemented",
            message: "Not implemented yet".to_string(),
        }),
    )
}

/// GET /api/v1/egresos
#[utoipa::path(
    get,
    path = "/api/v1/egresos",
    tag = "Egresos",
    responses(
        (status = 200, description = "Lista de egresos", body = [Egreso]),
        (status = 501, description = "No implementado", body = ApiError)
    )
)]
pub async fn list_egresos() -> impl IntoResponse {
    not_implemented()
}

/// POST /api/v1/egresos
#[utoipa::path(
    post,
    path = "/api/v1/egresos",
    tag = "Egresos",
    request_body = CreateEgresoRequest,
    responses(
        (status = 201, description = "Egreso creado", body = Egreso),
        (status = 400, description = "Validación", body = ApiError),
        (status = 501, description = "No implementado", body = ApiError)
    )
)]
pub async fn create_egreso(Json(_req): Json<CreateEgresoRequest>) -> impl IntoResponse {
    not_implemented()
}

/// GET /api/v1/egresos/{egreso_id}
#[utoipa::path(
    get,
    path = "/api/v1/egresos/{egreso_id}",
    tag = "Egresos",
    params(
        ("egreso_id" = String, Path, description = "ID del egreso")
    ),
    responses(
        (status = 200, description = "Detalle del egreso", body = Egreso),
        (status = 404, description = "No encontrado", body = ApiError),
        (status = 501, description = "No implementado", body = ApiError)
    )
)]
pub async fn get_egreso(Path(_egreso_id): Path<String>) -> impl IntoResponse {
    not_implemented()
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct UpdateEgresoStatusRequest {
    pub status: EgresoStatus,
}

/// PATCH /api/v1/egresos/{egreso_id}/status
#[utoipa::path(
    patch,
    path = "/api/v1/egresos/{egreso_id}/status",
    tag = "Egresos",
    params(
        ("egreso_id" = String, Path, description = "ID del egreso")
    ),
    request_body = UpdateEgresoStatusRequest,
    responses(
        (status = 200, description = "Egreso actualizado", body = Egreso),
        (status = 400, description = "Validación", body = ApiError),
        (status = 404, description = "No encontrado", body = ApiError),
        (status = 501, description = "No implementado", body = ApiError)
    )
)]
pub async fn update_egreso_status(
    Path(_egreso_id): Path<String>,
    Json(_req): Json<UpdateEgresoStatusRequest>,
) -> impl IntoResponse {
    not_implemented()
}
