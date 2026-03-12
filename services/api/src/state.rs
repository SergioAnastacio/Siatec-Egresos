use std::{collections::HashMap, sync::Arc};

use tokio::sync::Mutex;

use siatec_egresos_egresos::Egreso;

/// Estado compartido de la aplicación (in-memory).
#[derive(Clone, Default)]
pub struct AppState {
    pub egresos: Arc<Mutex<HashMap<String, Egreso>>>,
}
