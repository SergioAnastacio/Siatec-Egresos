use crate::config::AppConfig;
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

pub fn init_telemetry(cfg: &AppConfig) {
    let env_filter = EnvFilter::try_new(cfg.log_level.clone())
        .unwrap_or_else(|_| EnvFilter::new("info"));

    // JSON logs are convenient for container/platform ingestion.
    // If you prefer human logs locally, remove `.json()`.
    tracing_subscriber::registry()
        .with(env_filter)
        .with(fmt::layer().json())
        .init();
}
