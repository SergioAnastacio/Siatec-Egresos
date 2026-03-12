# SIATEC-Egresos

Monorepo para el canal **Desktop (Tauri)**, **Web (Next.js)** y **API** del proyecto SIATEC-Egresos.

## Objetivo
- Modernizar y operar un sistema orientado a egresos con una arquitectura consistente (monorepo) y colaboración humano+agentes.

## Stack (replicado de SIATEC-Codex)
- Monorepo: Turborepo + pnpm workspaces
- Desktop: Tauri 2.x + Next.js (Pages Router)
- Web: Next.js (Pages Router)
- API: Rust + Axum (OpenAPI en `/openapi.json`)

## Puertos (defaults)
- Web (Next): `http://localhost:3000`
- API (Axum): `http://127.0.0.1:3001`

## Comandos

### API
```powershell
cd services\api
cargo run
```

### Web
```powershell
pnpm --filter @siatec-egresos/web dev
```

### Validación
- `pnpm build`
- `pnpm validate`

## Trabajo con agentes
- Leer `.codex/AGENTS.md`
- Tomar una tarea desde `.codex/tasks/queued/` y moverla a `in-progress/`
