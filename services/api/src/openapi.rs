use utoipa::{
    openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme},
    OpenApi,
};

use crate::{error::ApiError, routes};

/// Documento OpenAPI del servicio.
#[derive(OpenApi)]
#[openapi(
    paths(
        routes::health::get_health,
        routes::version::get_version,
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
            routes::egresos::UpdateEgresoStatusRequest,
            siatec_egresos_egresos::Egreso,
            siatec_egresos_egresos::CreateEgresoRequest,
            siatec_egresos_egresos::EgresoStatus
        ),
        security_schemes(
            (
                "devToken" = SecurityScheme::Http(
                    HttpBuilder::new()
                        .scheme(HttpAuthScheme::Bearer)
                        .bearer_format("static")
                        .build()
                )
            )
        )
    ),
    tags(
        (name = "Ops", description = "Endpoints operativos"),
        (name = "Egresos", description = "API de egresos (planeada)" )
    )
)]
pub struct ApiDoc;
