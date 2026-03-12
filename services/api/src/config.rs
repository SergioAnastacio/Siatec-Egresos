use std::{env, net::IpAddr, str::FromStr};

#[derive(Debug, Clone)]
pub struct AppConfig {
    pub host: IpAddr,
    pub port: u16,
    /// RUST_LOG-style filter, e.g. "info" or "siatec_egresos_api=debug,tower_http=info"
    pub log_level: String,
}

impl AppConfig {
    pub fn from_env() -> Result<Self, String> {
        let host = env::var("API_HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
        let port = env::var("API_PORT").unwrap_or_else(|_| "3000".to_string());
        let log_level = env::var("API_LOG_LEVEL").unwrap_or_else(|_| "info".to_string());

        let host = IpAddr::from_str(&host).map_err(|e| format!("API_HOST invalid: {e}"))?;
        let port = port
            .parse::<u16>()
            .map_err(|e| format!("API_PORT invalid: {e}"))?;

        Ok(Self {
            host,
            port,
            log_level,
        })
    }
}
