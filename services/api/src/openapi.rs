use utoipa::{Modify, OpenApi};
use utoipa::openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme};

use crate::{error::ApiError, routes};

/// Inyecta el esquema de seguridad `devToken` (Bearer) usado en endpoints protegidos.
struct SecurityAddon;

impl Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        let bearer = SecurityScheme::Http(
            HttpBuilder::new()
                .scheme(HttpAuthScheme::Bearer)
                // No es JWT necesariamente, pero Swagger UI lo entiende.
                .bearer_format("JWT")
                .build(),
        );

        openapi
            .components
            .get_or_insert_with(Default::default)
            .add_security_scheme("devToken", bearer);
    }
}

/// Documento OpenAPI del servicio.
#[derive(OpenApi)]
#[openapi(
    modifiers(&SecurityAddon),
    paths(
        routes::health::get_health,
        routes::version::get_version,
        routes::db::get_db_health,
        routes::auth::login,
        routes::auth::me,
        routes::users::list_users,
        routes::users::get_user,
        routes::egresos::list_egresos,
        routes::egresos::create_egreso,
        routes::egresos::get_egreso,
        routes::egresos::update_egreso_status,
        routes::solicitudes::list_solicitudes,
        routes::solicitudes::create_solicitud,
        routes::solicitudes::get_solicitud,
        routes::solicitudes::update_solicitud,
        routes::solicitudes::update_solicitud_status
    ),
    components(
        schemas(
            routes::health::HealthResponse,
            routes::version::VersionResponse,
            routes::db::DbHealthResponse,
            ApiError,
            routes::auth::LoginRequest,
            routes::auth::LoginResponse,
            routes::auth::MeResponse,
            routes::auth::UserDto,
            routes::users::UsersListResponse,
            routes::egresos::UpdateEgresoStatusRequest,
            siatec_egresos_egresos::Egreso,
            siatec_egresos_egresos::CreateEgresoRequest,
            siatec_egresos_egresos::EgresoStatus,
            routes::solicitudes::SolicitudDto,
            routes::solicitudes::SolicitudTipo,
            routes::solicitudes::SolicitudStatus,
            routes::solicitudes::CreateSolicitudRequest,
            routes::solicitudes::UpdateSolicitudRequest,
            routes::solicitudes::UpdateSolicitudStatusRequest
        )
    ),
    tags(
        (name = "Ops", description = "Endpoints operativos"),
        (name = "Auth", description = "Endpoints de autenticación (MVP/dev)"),
        (name = "Users", description = "Catálogo/listado de usuarios (MVP/dev)"),
        (name = "Egresos", description = "API de egresos (planeada)" ),
        (name = "Solicitudes", description = "MVP Solicitudes" )
    )
)]
pub struct ApiDoc;
