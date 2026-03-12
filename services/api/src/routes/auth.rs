use axum::{
    extract::State,
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::{error::ApiError, error::api_error, state::AppState};

#[derive(Debug, Deserialize, ToSchema)]
pub struct LoginRequest {
    pub login: String,
    pub password: String,
}

#[derive(Debug, Serialize, ToSchema, Clone)]
pub struct UserDto {
    pub id: String,
    pub login: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub nombre: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub roles: Option<Vec<String>>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct LoginResponse {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub token: Option<String>,
    pub user: UserDto,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct MeResponse {
    pub user: UserDto,
}

/// POST /api/v1/auth/login
#[utoipa::path(
    post,
    path = "/api/v1/auth/login",
    tag = "Auth",
    request_body = LoginRequest,
    responses(
        (status = 200, description = "Login exitoso", body = LoginResponse),
        (status = 401, description = "Credenciales inválidas", body = ApiError)
    )
)]
pub async fn login(State(state): State<AppState>, Json(req): Json<LoginRequest>) -> impl IntoResponse {
    // MVP/dev-mode:
    // - Aceptamos cualquier combinación (por ahora).
    // - Emitimos un token estático (si está configurado) para que la web lo use como Bearer.
    let login = req.login.trim();
    if login.is_empty() {
        return api_error(StatusCode::UNAUTHORIZED, "invalid_credentials", "login is required")
            .into_response();
    }

    let user = UserDto {
        id: state.dev_user_id.clone(),
        login: login.to_string(),
        nombre: Some("Dev User".to_string()),
        roles: Some(vec!["admin".to_string()]),
    };

    let res = LoginResponse {
        token: state.dev_token.clone().filter(|t| !t.is_empty()),
        user,
    };

    (StatusCode::OK, Json(res)).into_response()
}

/// GET /api/v1/auth/me
#[utoipa::path(
    get,
    path = "/api/v1/auth/me",
    tag = "Auth",
    security(("devToken" = [])),
    responses(
        (status = 200, description = "Identidad actual", body = MeResponse),
        (status = 401, description = "No autorizado", body = ApiError)
    )
)]
pub async fn me(State(state): State<AppState>) -> impl IntoResponse {
    // MVP/dev-mode: el middleware valida el token si existe `API_DEV_TOKEN`.
    let user = UserDto {
        id: state.dev_user_id.clone(),
        login: "dev".to_string(),
        nombre: Some("Dev User".to_string()),
        roles: Some(vec!["admin".to_string()]),
    };

    (StatusCode::OK, Json(MeResponse { user })).into_response()
}
