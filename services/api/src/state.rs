use std::{collections::HashMap, sync::Arc};

use tokio::sync::Mutex;

use siatec_egresos_egresos::Egreso;

/// Estado compartido de la aplicación (in-memory).
#[derive(Clone)]
pub struct AppState {
    pub egresos: Arc<Mutex<HashMap<String, Egreso>>>,

    /// Token dev estático (si está configurado). Se usa para emitirlo en /auth/login.
    pub dev_token: Option<String>,

    /// Usuario dev base para endpoints MVP.
    pub dev_user_id: String,
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            egresos: Arc::new(Mutex::new(HashMap::new())),
            dev_token: None,
            dev_user_id: "00000000-0000-0000-0000-000000000001".to_string(),
        }
    }
}
