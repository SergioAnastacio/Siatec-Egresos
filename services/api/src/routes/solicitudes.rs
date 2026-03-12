use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use uuid::Uuid;

use crate::{error::api_error, error::ApiError, state::AppState};

fn validate_uuid(id: &str) -> Result<Uuid, (StatusCode, Json<ApiError>)> {
    Uuid::parse_str(id).map_err(|_| {
        (
            StatusCode::BAD_REQUEST,
            Json(ApiError {
                code: "invalid_id",
                message: "id must be a UUID".to_string(),
            }),
        )
    })
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum SolicitudTipo {
    Bienes,
    Servicios,
    Prestamo,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum SolicitudStatus {
    Draft,
    Sent,
    Canceled,
}

/// DTO mínimo de Solicitud.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, ToSchema)]
pub struct SolicitudDto {
    pub id: String,
    pub tipo: SolicitudTipo,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub area_id: Option<String>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub notas: Option<String>,

    pub status: SolicitudStatus,

    /// Fecha/hora de creación (RFC3339).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<String>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct CreateSolicitudRequest {
    pub tipo: SolicitudTipo,
    #[serde(default)]
    pub area_id: Option<String>,
    #[serde(default)]
    pub notas: Option<String>,
}

impl CreateSolicitudRequest {
    pub fn validate(&self) -> Result<(), String> {
        if let Some(n) = &self.notas {
            if n.len() > 4000 {
                return Err("notas must be <= 4000 chars".to_string());
            }
        }
        Ok(())
    }
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct UpdateSolicitudRequest {
    #[serde(default)]
    pub area_id: Option<String>,
    #[serde(default)]
    pub notas: Option<String>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct UpdateSolicitudStatusRequest {
    pub status: SolicitudStatus,
    #[serde(default)]
    pub motivo: Option<String>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct ListSolicitudesQuery {
    #[serde(default)]
    pub q: Option<String>,
    #[serde(default)]
    pub estado: Option<String>,
    #[serde(default)]
    pub tipo: Option<SolicitudTipo>,
    #[serde(default)]
    pub page: Option<u32>,
    #[serde(default, rename = "pageSize")]
    pub page_size: Option<u32>,
}

/// GET /api/v1/solicitudes
#[utoipa::path(
    get,
    path = "/api/v1/solicitudes",
    tag = "Solicitudes",
    security(("devToken" = [])),
    params(
        ("q" = Option<String>, Query, description = "Búsqueda libre"),
        ("estado" = Option<String>, Query, description = "Filtro por estado (string; MVP)"),
        ("tipo" = Option<SolicitudTipo>, Query, description = "Filtro por tipo"),
        ("page" = Option<u32>, Query, description = "Página"),
        ("pageSize" = Option<u32>, Query, description = "Tamaño de página")
    ),
    responses(
        (status = 200, description = "Lista de solicitudes", body = [SolicitudDto]),
        (status = 401, description = "No autorizado", body = ApiError)
    )
)]
pub async fn list_solicitudes(
    State(state): State<AppState>,
    Query(query): Query<ListSolicitudesQuery>,
) -> impl IntoResponse {
    let guard = state.solicitudes.lock().await;
    let mut list: Vec<SolicitudDto> = guard.values().cloned().collect();

    // Filters (MVP)
    // q -> por ahora busca contra `id` (sirve como "código"/folio en in-memory)
    if let Some(q) = query.q.as_deref().map(str::trim).filter(|s| !s.is_empty()) {
        let q = q.to_lowercase();
        list.retain(|s| s.id.to_lowercase().contains(&q));
    }

    // estado -> aceptamos string libre, pero mapeamos valores conocidos (es/en)
    if let Some(estado) = query
        .estado
        .as_deref()
        .map(str::trim)
        .filter(|s| !s.is_empty())
    {
        let estado = estado.to_lowercase();
        list.retain(|s| {
            let current = format!("{:?}", s.status).to_lowercase();
            // internal (draft/sent/canceled) via Debug: Draft/Sent/Canceled
            match estado.as_str() {
                "borrador" => matches!(s.status, SolicitudStatus::Draft),
                "enviada" | "enviado" => matches!(s.status, SolicitudStatus::Sent),
                "cancelada" | "cancelado" => matches!(s.status, SolicitudStatus::Canceled),
                // also accept english-ish
                "draft" => matches!(s.status, SolicitudStatus::Draft),
                "sent" => matches!(s.status, SolicitudStatus::Sent),
                "canceled" | "cancelled" => matches!(s.status, SolicitudStatus::Canceled),
                // fallback: string match against enum name
                _ => current == estado,
            }
        });
    }

    if let Some(tipo) = query.tipo {
        list.retain(|s| s.tipo == tipo);
    }

    // Orden estable (created_at) para que no “salte” en UI. Si no hay created_at, por id.
    list.sort_by(|a, b| a.created_at.cmp(&b.created_at).then(a.id.cmp(&b.id)));

    // Pagination (MVP)
    let page_size = query.page_size.unwrap_or(50).clamp(1, 500) as usize;
    let page = query.page.unwrap_or(1).max(1) as usize;
    let start = (page - 1).saturating_mul(page_size);
    let end = start.saturating_add(page_size);

    let list = list.into_iter().skip(start).take(end - start).collect::<Vec<_>>();

    (StatusCode::OK, Json(list))
}

/// POST /api/v1/solicitudes
#[utoipa::path(
    post,
    path = "/api/v1/solicitudes",
    tag = "Solicitudes",
    security(("devToken" = [])),
    request_body = CreateSolicitudRequest,
    responses(
        (status = 201, description = "Solicitud creada", body = SolicitudDto),
        (status = 400, description = "Validación", body = ApiError),
        (status = 401, description = "No autorizado", body = ApiError)
    )
)]
pub async fn create_solicitud(
    State(state): State<AppState>,
    Json(req): Json<CreateSolicitudRequest>,
) -> axum::response::Response {
    if let Err(msg) = req.validate() {
        return api_error(StatusCode::BAD_REQUEST, "validation_error", msg).into_response();
    }

    let id = Uuid::new_v4();
    let solicitud = SolicitudDto {
        id: id.to_string(),
        tipo: req.tipo,
        area_id: req.area_id,
        notas: req.notas,
        status: SolicitudStatus::Draft,
        created_at: Some(Utc::now().to_rfc3339()),
    };

    let mut guard = state.solicitudes.lock().await;
    guard.insert(id.to_string(), solicitud.clone());

    (StatusCode::CREATED, Json(solicitud)).into_response()
}

/// GET /api/v1/solicitudes/{id}
#[utoipa::path(
    get,
    path = "/api/v1/solicitudes/{id}",
    tag = "Solicitudes",
    security(("devToken" = [])),
    params(
        ("id" = String, Path, description = "ID de la solicitud (UUID)")
    ),
    responses(
        (status = 200, description = "Detalle de la solicitud", body = SolicitudDto),
        (status = 400, description = "ID inválido", body = ApiError),
        (status = 401, description = "No autorizado", body = ApiError),
        (status = 404, description = "No encontrada", body = ApiError)
    )
)]
pub async fn get_solicitud(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> impl IntoResponse {
    if validate_uuid(&id).is_err() {
        return api_error(StatusCode::BAD_REQUEST, "invalid_id", "id must be a UUID")
            .into_response();
    }

    let guard = state.solicitudes.lock().await;
    match guard.get(&id) {
        Some(s) => (StatusCode::OK, Json(s.clone())).into_response(),
        None => api_error(StatusCode::NOT_FOUND, "not_found", "solicitud not found")
            .into_response(),
    }
}

/// PATCH /api/v1/solicitudes/{id}
#[utoipa::path(
    patch,
    path = "/api/v1/solicitudes/{id}",
    tag = "Solicitudes",
    security(("devToken" = [])),
    params(
        ("id" = String, Path, description = "ID de la solicitud (UUID)")
    ),
    request_body = UpdateSolicitudRequest,
    responses(
        (status = 200, description = "Solicitud actualizada", body = SolicitudDto),
        (status = 400, description = "Validación", body = ApiError),
        (status = 401, description = "No autorizado", body = ApiError),
        (status = 404, description = "No encontrada", body = ApiError)
    )
)]
pub async fn update_solicitud(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(req): Json<UpdateSolicitudRequest>,
) -> impl IntoResponse {
    if validate_uuid(&id).is_err() {
        return api_error(StatusCode::BAD_REQUEST, "invalid_id", "id must be a UUID")
            .into_response();
    }

    if let Some(n) = &req.notas {
        if n.len() > 4000 {
            return api_error(
                StatusCode::BAD_REQUEST,
                "validation_error",
                "notas must be <= 4000 chars",
            )
            .into_response();
        }
    }

    let mut guard = state.solicitudes.lock().await;
    match guard.get_mut(&id) {
        Some(s) => {
            // MVP: si el cliente manda null no cambia; si manda string vacía permite.
            if req.area_id.is_some() {
                s.area_id = req.area_id;
            }
            if req.notas.is_some() {
                s.notas = req.notas;
            }
            (StatusCode::OK, Json(s.clone())).into_response()
        }
        None => api_error(StatusCode::NOT_FOUND, "not_found", "solicitud not found")
            .into_response(),
    }
}

/// PATCH /api/v1/solicitudes/{id}/status
#[utoipa::path(
    patch,
    path = "/api/v1/solicitudes/{id}/status",
    tag = "Solicitudes",
    security(("devToken" = [])),
    params(
        ("id" = String, Path, description = "ID de la solicitud (UUID)")
    ),
    request_body = UpdateSolicitudStatusRequest,
    responses(
        (status = 200, description = "Solicitud actualizada", body = SolicitudDto),
        (status = 400, description = "Validación", body = ApiError),
        (status = 401, description = "No autorizado", body = ApiError),
        (status = 404, description = "No encontrada", body = ApiError)
    )
)]
pub async fn update_solicitud_status(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(req): Json<UpdateSolicitudStatusRequest>,
) -> impl IntoResponse {
    if validate_uuid(&id).is_err() {
        return api_error(StatusCode::BAD_REQUEST, "invalid_id", "id must be a UUID")
            .into_response();
    }

    // MVP: no forzamos máquina de estados, solo prohibimos cancelar sin motivo.
    if req.status == SolicitudStatus::Canceled {
        if req.motivo.as_deref().unwrap_or("").trim().is_empty() {
            return api_error(
                StatusCode::BAD_REQUEST,
                "validation_error",
                "motivo is required when status=canceled",
            )
            .into_response();
        }
    }

    let mut guard = state.solicitudes.lock().await;
    match guard.get_mut(&id) {
        Some(s) => {
            s.status = req.status;
            (StatusCode::OK, Json(s.clone())).into_response()
        }
        None => api_error(StatusCode::NOT_FOUND, "not_found", "solicitud not found")
            .into_response(),
    }
}
