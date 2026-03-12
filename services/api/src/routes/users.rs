use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use utoipa::ToSchema;

use crate::{error::ApiError, error::api_error, routes::auth::UserDto, state::AppState};

#[derive(Debug, ToSchema)]
pub struct UsersListResponse {
    pub items: Vec<UserDto>,
}

fn seed_users(state: &AppState) -> Vec<UserDto> {
    // MVP: catálogo in-memory.
    // En el futuro vendrá de DB (SQL Server).
    vec![
        UserDto {
            id: state.dev_user_id.clone(),
            login: "dev".to_string(),
            nombre: Some("Dev User".to_string()),
            roles: Some(vec!["admin".to_string()]),
        },
        UserDto {
            id: "00000000-0000-0000-0000-000000000002".to_string(),
            login: "operador".to_string(),
            nombre: Some("Operador".to_string()),
            roles: Some(vec!["operator".to_string()]),
        },
    ]
}

/// GET /api/v1/users
#[utoipa::path(
    get,
    path = "/api/v1/users",
    tag = "Users",
    security(("devToken" = [])),
    responses(
        (status = 200, description = "Listado de usuarios", body = UsersListResponse),
        (status = 401, description = "No autorizado", body = ApiError)
    )
)]
pub async fn list_users(State(state): State<AppState>) -> impl IntoResponse {
    let items = seed_users(&state);
    (StatusCode::OK, Json(UsersListResponse { items })).into_response()
}

/// GET /api/v1/users/{id}
#[utoipa::path(
    get,
    path = "/api/v1/users/{id}",
    tag = "Users",
    security(("devToken" = [])),
    params(
        ("id" = String, Path, description = "ID de usuario")
    ),
    responses(
        (status = 200, description = "Detalle de usuario", body = UserDto),
        (status = 401, description = "No autorizado", body = ApiError),
        (status = 404, description = "No encontrado", body = ApiError)
    )
)]
pub async fn get_user(State(state): State<AppState>, Path(id): Path<String>) -> impl IntoResponse {
    let items = seed_users(&state);
    match items.into_iter().find(|u| u.id == id) {
        Some(u) => (StatusCode::OK, Json(u)).into_response(),
        None => api_error(StatusCode::NOT_FOUND, "not_found", "user not found").into_response(),
    }
}
