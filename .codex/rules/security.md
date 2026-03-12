# Reglas de Seguridad -- SIATEC

La seguridad de nivel gubernamental es requerida desde el primer dia.
Estas reglas son no negociables y aplican a cada modulo.

---

## Autenticacion

Usar tokens JWT con expiracion.
Los tokens deben almacenarse solo en memoria -- nunca en localStorage ni sessionStorage.

```tsx
// Incorrecto -- localStorage es vulnerable a ataques XSS
localStorage.setItem('token', jwt)
sessionStorage.setItem('token', jwt)

// Correcto -- solo en memoria, se limpia al cerrar la app
useAuthStore.setState({ token: jwt })
```

Campos requeridos en el payload JWT:
- `user_id` -- identificador interno del usuario
- `role`    -- rol del usuario (admin, operador, auditor)
- `exp`     -- timestamp de expiracion
- `iat`     -- timestamp de emision

El payload JWT nunca debe incluir:
- contrasenas o hashes de contrasenas
- RFCs o identificadores gubernamentales
- datos financieros
- RFC o CURP

---

## RBAC -- Control de Acceso Basado en Roles

Roles definidos en SIATEC:

| Rol        | Descripcion                                       |
|------------|---------------------------------------------------|
| admin      | Acceso completo al sistema                        |
| operador   | Acceso operacional a las areas asignadas          |
| auditor    | Solo lectura, visibilidad del log de auditoria    |

El RBAC se aplica en la capa de servicio. Nunca en los comandos.

### Incorrecto -- autorizacion en el comando
```rust
#[tauri::command]
pub async fn desactivar_registro(
    id: i32,
    state: State<'_, AppState>,
) -> Result<(), AppError> {
    // [ ] verificacion RBAC en el lugar incorrecto
    if state.usuario_actual.rol != "admin" {
        return Err(AppError::Unauthorized);
    }
    state.registro_service.desactivar(id).await
}
```

### Correcto -- autorizacion en el servicio
```rust
impl RegistroService {
    pub async fn desactivar(
        &self,
        id: i32,
        solicitante: &UsuarioActual,
    ) -> Result<(), AppError> {
        // [x] verificacion RBAC en la capa de servicio
        if solicitante.rol != "admin" {
            return Err(AppError::Unauthorized);
        }
        self.registro_repo.desactivar(id).await
    }
}
```

---

## Validacion de Entrada

Todas las entradas deben validarse en frontend y backend.
La validacion en frontend mejora la UX. La validacion en backend previene ataques.
Nunca confiar en los datos provenientes del cliente.

```rust
// Validacion en backend -- siempre requerida
pub struct CrearRegistroInput {
    pub nombre: String,
    pub email: String,
    pub rol: String,
}

impl CrearRegistroInput {
    pub fn validar(&self) -> Result<(), AppError> {
        if self.nombre.trim().is_empty() {
            return Err(AppError::Validation("el nombre es requerido".into()));
        }
        if !self.email.contains('@') {
            return Err(AppError::Validation("el email es invalido".into()));
        }
        let roles_validos = ["admin", "operador", "auditor"];
        if !roles_validos.contains(&self.rol.as_str()) {
            return Err(AppError::Validation("el rol es invalido".into()));
        }
        Ok(())
    }
}
```

---

## Log de Auditoria

Todas las operaciones sensibles deben escribir una entrada en el log de auditoria.

Operaciones que requieren log de auditoria:
- Intentos de login (exitosos y fallidos)
- Cambios de permisos o roles
- Creacion y desactivacion de registros
- Cualquier operacion financiera
- Cambios de configuracion
- Exportaciones de datos

```rust
// services/auditoria_service.rs
pub struct EntradaAuditoria {
    pub usuario_id: i32,
    pub accion: String,           // ej. "usuario.desactivar", "auth.login.fallido"
    pub entidad: String,          // ej. "usuarios", "solicitudes"
    pub entidad_id: Option<i32>,
    pub direccion_ip: Option<String>,
    pub resultado: ResultadoAuditoria,  // Exito | Fallo
    pub timestamp: DateTime<Utc>,
    // NOTA: Nunca incluir valores de campos sensibles en las entradas de auditoria
}

#[async_trait]
pub trait AuditoriaService: Send + Sync {
    async fn registrar(&self, entrada: EntradaAuditoria) -> Result<(), AppError>;
}
```

---

## Datos Sensibles

Nunca loguear, exponer en respuestas de API ni almacenar en el estado del frontend:
- Contrasenas o hashes de contrasenas
- Tokens JWT
- RFCs, CURPs u otros identificadores gubernamentales
- Numeros de cuenta financiera
- Cadenas de conexion a base de datos

Las variables de entorno nunca deben estar hardcodeadas en el codigo fuente.
Todos los secretos deben vivir en archivos .env.
Los archivos .env nunca se hacen commit al repositorio (.gitignore lo refuerza).

---

## Seguridad de API

Endpoints publicos (sin autenticacion requerida):
```
POST /api/v1/auth/login
GET  /api/v1/health
```

Todos los demas endpoints requieren un JWT valido en el header Authorization:
```
Authorization: Bearer <token>
```

Requisitos de limite de tasa:
- `POST /api/v1/auth/login` -- max 5 intentos por minuto por IP
- Todos los demas endpoints -- max 100 solicitudes por minuto por token

Respuesta cuando se excede el limite de tasa:
```json
{
  "error": {
    "codigo": "RATE_LIMIT_EXCEEDED",
    "mensaje": "Demasiadas solicitudes. Intenta de nuevo en 60 segundos.",
    "reintento_en": 60
  }
}
```
