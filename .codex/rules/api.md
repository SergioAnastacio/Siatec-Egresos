# Reglas de API -- SIATEC

Estas reglas aplican a todos los endpoints REST del sistema.

Los endpoints REST son solo para clientes web y movil.
La app desktop usa Comandos Tauri -- no usa REST.

---

## Convenciones REST

### Versionado

Todos los endpoints deben usar el prefijo `/api/v1/`.

```
[x] /api/v1/usuarios
[x] /api/v1/solicitudes
[x] /api/v1/auth/login

[ ] /usuarios
[ ] /api/usuarios
[ ] /v1/usuarios
```

### Nombrado de recursos

Sustantivos en plural, snake_case, en espanol (para coincidir con el lenguaje del dominio existente):

```
[x] /api/v1/usuarios
[x] /api/v1/solicitudes
[x] /api/v1/tipos_solicitud

[ ] /api/v1/getUsuarios
[ ] /api/v1/usuario
[ ] /api/v1/Users
```

### Metodos HTTP

| Operacion          | Metodo  | Ejemplo                            |
|--------------------|---------|------------------------------------|
| Listar todos       | GET     | GET /api/v1/usuarios               |
| Obtener uno        | GET     | GET /api/v1/usuarios/:id           |
| Crear              | POST    | POST /api/v1/usuarios              |
| Actualizar parcial | PATCH   | PATCH /api/v1/usuarios/:id         |
| Desactivar         | DELETE  | DELETE /api/v1/usuarios/:id        |

Nota: DELETE en SIATEC realiza eliminacion logica (activo = 0). Nunca fisica.

### Filtrado y paginacion

```
GET /api/v1/usuarios?page=1&limit=20
GET /api/v1/usuarios?rol=operador&activo=true
GET /api/v1/solicitudes?fecha_inicio=2025-01-01&fecha_fin=2025-12-31
```

---

## Formato de Respuesta

### Exito -- recurso unico

```json
{
  "data": {
    "id": 1,
    "nombre": "Juan Perez",
    "email": "juan@example.com",
    "rol": "operador"
  }
}
```

### Exito -- lista

```json
{
  "data": [
    { "id": 1, "nombre": "Juan Perez" },
    { "id": 2, "nombre": "Maria Garcia" }
  ],
  "meta": {
    "total": 45,
    "pagina": 1,
    "limite": 20,
    "total_paginas": 3
  }
}
```

### Error

```json
{
  "error": {
    "codigo": "VALIDATION_ERROR",
    "mensaje": "El campo email es requerido",
    "detalles": [
      { "campo": "email", "mensaje": "El campo email es requerido" }
    ]
  }
}
```

### Codigos de Estado HTTP

| Codigo | Cuando usar                                              |
|--------|----------------------------------------------------------|
| 200    | Exito con cuerpo de respuesta                            |
| 201    | Recurso creado                                           |
| 204    | Exito sin cuerpo (ej. desactivar)                        |
| 400    | Solicitud invalida o fallo de validacion                 |
| 401    | No autenticado                                           |
| 403    | Autenticado pero no autorizado (RBAC)                    |
| 404    | Recurso no encontrado                                    |
| 409    | Conflicto (ej. RFC duplicado)                            |
| 422    | Entidad no procesable                                    |
| 429    | Limite de tasa excedido                                  |
| 500    | Error interno del servidor                               |

---

## Documentacion OpenAPI

Cada endpoint debe estar documentado en `docs/api/openapi.yaml`
antes de que la tarea se considere completa.

### Estructura minima por endpoint

```yaml
# NOTA: Este es un ejemplo estructural.
# Reemplazar nombres de recursos y refs de schema con valores reales.
/api/v1/usuarios:
  get:
    summary: Listar usuarios
    description: Devuelve una lista paginada de usuarios activos del sistema.
    tags:
      - Usuarios
    security:
      - bearerAuth: []
    parameters:
      - name: page
        in: query
        schema:
          type: integer
          default: 1
      - name: limit
        in: query
        schema:
          type: integer
          default: 20
    responses:
      '200':
        description: Lista de usuarios
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UsuarioListResponse'
      '401':
        $ref: '#/components/responses/Unauthorized'
      '403':
        $ref: '#/components/responses/Forbidden'
      '500':
        $ref: '#/components/responses/InternalError'
```

### Reglas OpenAPI

- Usar `$ref` para todos los schemas reutilizables -- nunca definir el mismo schema dos veces
- Todos los endpoints autenticados deben tener `security: [bearerAuth: []]`
- Cada endpoint debe documentar al menos: 200/201, 401, 403, 500
- Los schemas de solicitud y respuesta deben ser tipos separados
- Nunca exponer campos internos en schemas de respuesta: hashes de contrasenas,
  banderas activo, RFCs o claves foraneas salvo que sea explicitamente requerido

---

## Autenticacion

Endpoints publicos (sin token requerido):
```
POST /api/v1/auth/login
GET  /api/v1/health
```

Todos los demas endpoints requieren:
```
Authorization: Bearer <jwt_token>
```

---

## Limite de Tasa

| Endpoint                | Limite                                     |
|-------------------------|--------------------------------------------|
| POST /api/v1/auth/login | 5 intentos por minuto por IP               |
| Todos los demas         | 100 solicitudes por minuto por token       |

---

## Desktop vs Web/Movil

| Aspecto             | Desktop (Tauri)           | Web / Movil (REST)          |
|---------------------|---------------------------|-----------------------------|
| Comunicacion        | Comandos Tauri (invoke)   | HTTP REST                   |
| Autenticacion       | Estado Rust en memoria    | JWT en header Authorization |
| Docs OpenAPI        | No aplica                 | Requerido                   |
| Limite de tasa      | No aplica                 | Requerido                   |

Los modulos desktop no exponen endpoints REST.
Si la app web necesita la misma funcionalidad que un comando Tauri del desktop,
se debe crear un endpoint REST separado -- el comando no se reutiliza.
