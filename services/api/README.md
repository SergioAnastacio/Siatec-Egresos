# Siatec Egresos API (Rust + Axum)

Skeleton inicial del servicio API.

## Endpoints

### Ops

- `GET /health` → `200` `{ "status": "ok" }`
- `GET /version` → `200` `{ "name": "...", "version": "..." }`

### OpenAPI

- `GET /openapi.json` → documento OpenAPI (JSON)
- `/docs` (Swagger UI) está deshabilitado por ahora para evitar bloqueos de build en algunos entornos Windows; usa `/openapi.json`.

### Negocio (planeado / stubs)

> Nota: El namespace `/api/v1` está **reservado** para endpoints de negocio.
>
> Actualmente los endpoints de egresos existen como **stubs** (responden `501 Not Implemented`) para poder publicar contratos y esquemas en OpenAPI.

- `GET /api/v1/egresos`
- `POST /api/v1/egresos`
- `GET /api/v1/egresos/{egreso_id}`
- `PATCH /api/v1/egresos/{egreso_id}/status`

## Requisitos

- Rust (stable) + Cargo

## Configuración por variables de entorno

Variables soportadas:

- `API_HOST` (default: `127.0.0.1`)
- `API_PORT` (default: `3000`)
- `API_LOG_LEVEL` (default: `info`) — formato estilo `RUST_LOG`

Puedes copiar `.env.example` a `.env`.

## Correr local

Desde `services/api`:

```bash
cargo build
cargo run
```

Probar:

```bash
curl http://127.0.0.1:3000/health
curl http://127.0.0.1:3000/version
```
