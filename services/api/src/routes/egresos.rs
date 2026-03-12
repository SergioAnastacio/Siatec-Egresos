use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use uuid::Uuid;

use siatec_egresos_egresos::{CreateEgresoRequest, Egreso, EgresoStatus};

use crate::state::AppState;

#[derive(Debug, Serialize, ToSchema)]
pub struct ApiError {
    pub code: &'static str,
    pub message: String,
}

fn api_error(status: StatusCode, code: &'static str, message: impl Into<String>) -> impl IntoResponse {
    (
        status,
        Json(ApiError {
            code,
            message: message.into(),
        }),
    )
}

fn validate_uuid(id: &str) -> Result<Uuid, (StatusCode, Json<ApiError>)> {
    Uuid::parse_str(id)
        .map_err(|_| (StatusCode::BAD_REQUEST, Json(ApiError { code: "invalid_id", message: "egreso_id must be a UUID".to_string() })))
}

/// GET /api/v1/egresos
#[utoipa::path(
    get,
    path = "/api/v1/egresos",
    tag = "Egresos",
    responses(
        (status = 200, description = "Lista de egresos", body = [Egreso])
    )
)]
pub async fn list_egresos(State(state): State<AppState>) -> impl IntoResponse {
    let guard = state.egresos.lock().await;
    let list: Vec<Egreso> = guard.values().cloned().collect();
    (StatusCode::OK, Json(list))
}

/// POST /api/v1/egresos
#[utoipa::path(
    post,
    path = "/api/v1/egresos",
    tag = "Egresos",
    request_body = CreateEgresoRequest,
    responses(
        (status = 201, description = "Egreso creado", body = Egreso),
        (status = 400, description = "Validación", body = ApiError)
    )
)]
pub async fn create_egreso(
    State(state): State<AppState>,
    Json(req): Json<CreateEgresoRequest>,
) -> axum::response::Response {
    if let Err(msg) = req.validate() {
        return api_error(StatusCode::BAD_REQUEST, "validation_error", msg).into_response();
    }

    let id = Uuid::new_v4();
    let egreso = Egreso {
        id: id.to_string(),
        concepto: req.concepto,
        monto: req.monto,
        status: EgresoStatus::Draft,
        created_at: Some(Utc::now().to_rfc3339()),
    };

    let mut guard = state.egresos.lock().await;
    guard.insert(id.to_string(), egreso.clone());

    (StatusCode::CREATED, Json(egreso)).into_response()
}

/// GET /api/v1/egresos/{egreso_id}
#[utoipa::path(
    get,
    path = "/api/v1/egresos/{egreso_id}",
    tag = "Egresos",
    params(
        ("egreso_id" = String, Path, description = "ID del egreso (UUID)")
    ),
    responses(
        (status = 200, description = "Detalle del egreso", body = Egreso),
        (status = 400, description = "ID inválido", body = ApiError),
        (status = 404, description = "No encontrado", body = ApiError)
    )
)]
pub async fn get_egreso(
    State(state): State<AppState>,
    Path(egreso_id): Path<String>,
) -> impl IntoResponse {
    if validate_uuid(&egreso_id).is_err() {
        return api_error(StatusCode::BAD_REQUEST, "invalid_id", "egreso_id must be a UUID")
            .into_response();
    }

    let guard = state.egresos.lock().await;
    match guard.get(&egreso_id) {
        Some(e) => (StatusCode::OK, Json(e.clone())).into_response(),
        None => api_error(StatusCode::NOT_FOUND, "not_found", "egreso not found").into_response(),
    }
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
        ("egreso_id" = String, Path, description = "ID del egreso (UUID)")
    ),
    request_body = UpdateEgresoStatusRequest,
    responses(
        (status = 200, description = "Egreso actualizado", body = Egreso),
        (status = 400, description = "Validación", body = ApiError),
        (status = 404, description = "No encontrado", body = ApiError)
    )
)]
pub async fn update_egreso_status(
    State(state): State<AppState>,
    Path(egreso_id): Path<String>,
    Json(req): Json<UpdateEgresoStatusRequest>,
) -> impl IntoResponse {
    if validate_uuid(&egreso_id).is_err() {
        return api_error(StatusCode::BAD_REQUEST, "invalid_id", "egreso_id must be a UUID")
            .into_response();
    }

    let mut guard = state.egresos.lock().await;
    match guard.get_mut(&egreso_id) {
        Some(e) => {
            e.status = req.status;
            (StatusCode::OK, Json(e.clone())).into_response()
        }
        None => api_error(StatusCode::NOT_FOUND, "not_found", "egreso not found").into_response(),
    }
}
