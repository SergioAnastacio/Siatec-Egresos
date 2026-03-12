use utoipa::OpenApi;

use crate::{error::ApiError, routes};

/// Documento OpenAPI del servicio.
#[derive(OpenApi)]
#[openapi(
    paths(
        routes::health::get_health,
        routes::version::get_version,
        routes::auth::login,
        routes::auth::me,
        routes::users::list_users,
        routes::users::get_user,
        routes::egresos::list_egresos,
        routes::egresos::create_egreso,
        routes::egresos::get_egreso,
        routes::egresos::update_egreso_status
    ),
    components(
        schemas(
            routes::health::HealthResponse,
            routes::version::VersionResponse,
            ApiError,
            routes::auth::LoginRequest,
            routes::auth::LoginResponse,
            routes::auth::MeResponse,
            routes::auth::UserDto,
            routes::users::UsersListResponse,
            routes::egresos::UpdateEgresoStatusRequest,
            siatec_egresos_egresos::Egreso,
            siatec_egresos_egresos::CreateEgresoRequest,
            siatec_egresos_egresos::EgresoStatus
        )
    ),
    tags(
        (name = "Ops", description = "Endpoints operativos"),
        (name = "Auth", description = "Endpoints de autenticación (MVP/dev)"),
        (name = "Users", description = "Catálogo/listado de usuarios (MVP/dev)"),
        (name = "Egresos", description = "API de egresos (planeada)" )
    )
)]
pub struct ApiDoc;
