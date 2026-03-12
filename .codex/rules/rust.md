# Reglas de Rust -- SIATEC

Estas reglas aplican a todo el codigo Rust en el proyecto.

---

## Manejo de Errores

Nunca usar unwrap() o expect() en codigo de produccion.
Siempre retornar Result<T, AppError> y propagar errores con ?.

### Incorrecto
```rust
let conn = pool.get().unwrap();
let registro = repo.buscar_por_id(id).expect("registro no encontrado");
```

### Correcto
```rust
let conn = pool.get().map_err(|e| AppError::Database(e.to_string()))?;
let registro = repo.buscar_por_id(id).await?;
```

---

## Contexto de Error

Los errores sin contexto son inutils para depurar.
Siempre incluir que operacion fallo y que identificador estaba involucrado.

### Incorrecto
```rust
conn.query_one(query, params).await?;
```

### Correcto
```rust
conn.query_one(query, params)
    .await
    .map_err(|e| AppError::Database(
        format!("buscar_por_id fallo para id={}: {}", id, e)
    ))?;
```

---

## Tipo AppError

Definir un unico tipo de error central. Todos los servicios y repositorios lo retornan.

```rust
// src/models/error.rs
#[derive(Debug, thiserror::Error, serde::Serialize)]
pub enum AppError {
    #[error("Error de base de datos: {0}")]
    Database(String),

    #[error("No encontrado: {0}")]
    NotFound(String),

    #[error("No autorizado")]
    Unauthorized,

    #[error("Error de validacion: {0}")]
    Validation(String),

    #[error("Error interno: {0}")]
    Internal(String),
}
```

---

## Estructura de Comandos

Los comandos Tauri deben ser delgados. Cero logica de negocio dentro de los comandos.
Los comandos reciben entrada, llaman a un servicio, retornan el resultado.

### Incorrecto
```rust
#[tauri::command]
pub async fn obtener_registro(id: i32, db: State<'_, DbPool>) -> Result<Registro, String> {
    // [ ] logica de negocio y acceso a base de datos directamente en el comando
    let conn = db.get().map_err(|e| e.to_string())?;
    let registro = conn
        .query_one("SELECT * FROM tabla WHERE id = @P1", &[&id])
        .map_err(|e| e.to_string())?;
    Ok(registro)
}
```

### Correcto
```rust
// src/commands/registro_commands.rs
#[tauri::command]
pub async fn obtener_registro(
    id: i32,
    state: State<'_, AppState>,
) -> Result<RegistroResponse, AppError> {
    state.registro_service.buscar_por_id(id).await
}

// src/services/registro_service.rs
impl RegistroService {
    pub async fn buscar_por_id(&self, id: i32) -> Result<RegistroResponse, AppError> {
        let registro = self.registro_repo.buscar_por_id(id).await?;
        Ok(RegistroResponse::from(registro))
    }
}

// src/repositories/registro_repository.rs
impl SqlRegistroRepository {
    pub async fn buscar_por_id(&self, id: i32) -> Result<Registro, AppError> {
        // solo logica de base de datos aqui
    }
}
```

---

## Traits para Abstracciones

Usar traits para todos los servicios y repositorios.
Esto hace posible las pruebas con implementaciones mock.

```rust
// src/repositories/registro_repository.rs

#[async_trait]
pub trait RegistroRepository: Send + Sync {
    async fn buscar_por_id(&self, id: i32) -> Result<Registro, AppError>;
    async fn buscar_todos(&self) -> Result<Vec<Registro>, AppError>;
    async fn crear(&self, input: CrearRegistroInput) -> Result<Registro, AppError>;
    async fn actualizar(&self, id: i32, input: ActualizarRegistroInput) -> Result<Registro, AppError>;
    async fn desactivar(&self, id: i32) -> Result<(), AppError>;
}

// Implementacion concreta SQL Server
pub struct SqlRegistroRepository {
    pool: DbPool,
}

#[async_trait]
impl RegistroRepository for SqlRegistroRepository {
    async fn buscar_por_id(&self, id: i32) -> Result<Registro, AppError> {
        // NOTA: Reemplazar tabla y columnas con valores reales de database/schema/
        // Este es solo un ejemplo estructural -- no usar hasta que el schema este documentado
        todo!("implementar despues de documentar database/schema/")
    }
}
```

> NOTA: Todas las implementaciones de repositorio que referencian nombres de tablas o columnas
> deben escribirse despues de que el schema de la base de datos este documentado en database/schema/.
> No inventar nombres de tablas o columnas.

---

## Gestion de Estado

Definir todo el estado de la aplicacion en state/mod.rs.
Inyectar dependencias a traves de AppState, no mediante parametros de comando.

```rust
// src/state/mod.rs
use std::sync::Arc;

pub struct AppState {
    // Agregar campos de servicio aqui a medida que se implementen los modulos
    // Ejemplo (no agregar hasta que el modulo exista):
    // pub usuario_service: Arc<dyn UsuarioService>,
    // pub auth_service: Arc<dyn AuthService>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            // inicializar servicios aqui
        }
    }
}
```

---

## Logging

Usar el crate tracing. Nunca usar println! en codigo de produccion.

```rust
use tracing::{debug, error, info, warn};

// Correcto -- campos estructurados, sin datos sensibles
info!(registro_id = %id, "Obteniendo registro");
warn!(intento = %count, ip = %ip, "Multiples intentos de login fallidos");
error!(error = %e, registro_id = %id, "Consulta de base de datos fallo");
debug!(query = %sql, "Ejecutando consulta");

// Incorrecto
println!("id de registro: {}", id);
```

Nunca loguear:
- Contrasenas o hashes de contrasenas
- Tokens JWT
- RFCs, CURPs u otros identificadores gubernamentales
- Montos financieros en contextos sensibles
- Cadenas de conexion a base de datos

---

## Organizacion de Modulos

commands/mod.rs registra todos los comandos y los re-exporta.

```rust
// src/commands/mod.rs
pub mod health_commands;
// Agregar modulos de comandos aqui a medida que se implementen:
// pub mod usuario_commands;
// pub mod auth_commands;
```

main.rs debe permanecer minimal -- solo conecta Tauri.

```rust
// src/main.rs
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod state;

fn main() {
    tracing_subscriber::init();

    tauri::Builder::default()
        .manage(state::AppState::new())
        .invoke_handler(tauri::generate_handler![
            commands::health_commands::health_check,
            // agregar comandos aqui a medida que se implementen modulos
        ])
        .run(tauri::generate_context!())
        .expect("error al ejecutar la aplicacion tauri");
}
```
