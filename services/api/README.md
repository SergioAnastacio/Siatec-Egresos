# Siatec Egresos API (Rust + Axum)

Skeleton inicial del servicio API.

## Endpoints

### Ops

- `GET /health`  `200` `{ "status": "ok" }`
- `GET /version`  `200` `{ "name": "...", "version": "..." }`

### OpenAPI

- `GET /openapi.json`  documento OpenAPI (JSON)
- `/docs` (Swagger UI) está deshabilitado por ahora para evitar bloqueos de build en algunos entornos Windows; usa `/openapi.json`.

### Negocio (MVP/dev + stubs)

> Nota: El namespace `/api/v1` está **reservado** para endpoints de negocio.

#### Auth (MVP/dev)

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

#### Usuarios (MVP/dev)

- `GET /api/v1/users`
- `GET /api/v1/users/{id}`

#### Egresos

- `GET /api/v1/egresos`
- `POST /api/v1/egresos`
- `GET /api/v1/egresos/{egreso_id}`
- `PATCH /api/v1/egresos/{egreso_id}/status`

## Requisitos

- Rust (stable) + Cargo

## Configuración por variables de entorno

Variables soportadas:

- `API_HOST` (default: `127.0.0.1`)
- `API_PORT` (default: `3001`)
- `API_LOG_LEVEL` (default: `info`) - formato estilo `RUST_LOG`
- `API_DEV_TOKEN` (opcional) - token estático para proteger endpoints **protegidos** (MVP).
  - Header: `Authorization: Bearer <token>`
  - Si `API_DEV_TOKEN` no está configurado (vacío), el auth se considera **deshabilitado**.

Puedes copiar `.env.example` a `.env`.

## Correr local

Desde `services/api`:

```bash
cargo build
cargo run
```

## Probar con curl

> Nota: si `API_DEV_TOKEN` está configurado, usa el mismo token en los endpoints protegidos.

```bash
# Ops
curl http://127.0.0.1:3001/health
curl http://127.0.0.1:3001/version
curl http://127.0.0.1:3001/openapi.json

# --- Auth (MVP/dev) ---

# Login (dev): emite el token estático si API_DEV_TOKEN está configurado
curl -s -X POST http://127.0.0.1:3001/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"login":"dev","password":"dev"}' | cat

# Me (requiere Authorization: Bearer <token> si API_DEV_TOKEN está configurado)
curl -i http://127.0.0.1:3001/api/v1/auth/me \
  -H 'Authorization: Bearer super-secret-dev-token'

# --- Users (MVP/dev) ---

curl -s http://127.0.0.1:3001/api/v1/users \
  -H 'Authorization: Bearer super-secret-dev-token' | cat

curl -s http://127.0.0.1:3001/api/v1/users/00000000-0000-0000-0000-000000000001 \
  -H 'Authorization: Bearer super-secret-dev-token' | cat

# --- Egresos ---

curl http://127.0.0.1:3001/api/v1/egresos

# Write endpoints (requieren token si API_DEV_TOKEN está configurado)

# 1) Falla (401)
curl -i -X POST http://127.0.0.1:3001/api/v1/egresos \
  -H 'Content-Type: application/json' \
  -d '{"concepto":"cafe","monto":10.5}'

# 2) Éxito (201)
API_DEV_TOKEN=super-secret-dev-token # ejemplo
curl -i -X POST http://127.0.0.1:3001/api/v1/egresos \
  -H 'Authorization: Bearer super-secret-dev-token' \
  -H 'Content-Type: application/json' \
  -d '{"concepto":"cafe","monto":10.5}'
```
