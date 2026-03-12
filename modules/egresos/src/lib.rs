//! Tipos de dominio/DTOs para el módulo de egresos.
//!
//! **Nota:** este crate intentionally no tiene IO ni persistencia.

use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

/// Estado del egreso.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum EgresoStatus {
    /// Capturado pero aún no enviado a aprobación.
    Draft,
    /// En proceso de revisión/aprobación.
    Pending,
    /// Aprobado.
    Approved,
    /// Rechazado.
    Rejected,
    /// Cancelado.
    Canceled,
}

/// Representa un egreso ya registrado en el sistema.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, ToSchema)]
pub struct Egreso {
    /// Identificador del egreso.
    pub id: String,
    /// Concepto o descripción breve del egreso.
    pub concepto: String,
    /// Monto del egreso (moneda implícita; se definirá formalmente en próximos incrementos).
    pub monto: f64,
    /// Estado actual del egreso.
    pub status: EgresoStatus,
}

/// Payload mínimo para crear un egreso.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, ToSchema)]
pub struct CreateEgresoRequest {
    pub concepto: String,
    pub monto: f64,
}

impl CreateEgresoRequest {
    /// Validación ligera (sin dependencias externas).
    pub fn validate(&self) -> Result<(), String> {
        if self.concepto.trim().is_empty() {
            return Err("concepto is required".to_string());
        }
        if !self.monto.is_finite() || self.monto <= 0.0 {
            return Err("monto must be > 0".to_string());
        }
        Ok(())
    }
}
