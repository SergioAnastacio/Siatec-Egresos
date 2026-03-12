# Siatec Egresos API (Rust + Axum)

Skeleton inicial del servicio API.

## Endpoints

- `GET /health` → `200` `{ "status": "ok" }`
- `GET /version` → `200` `{ "name": "...", "version": "..." }`

> Nota: El namespace `/api/v1` está **reservado** para endpoints de negocio futuros (aún sin implementar).

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
