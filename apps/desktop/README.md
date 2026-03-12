# @siatec-egresos/desktop

Canal desktop (Tauri 2 + Next.js **Pages Router** + TypeScript + Tailwind).

## Estructura

- `src/pages/*` rutas Next (Pages Router)
  - `/login` placeholder
  - `/egresos` placeholder con llamada real a `GET /api/v1/egresos`
- `src/features/` (reservado)
- `src/shared/` utilidades compartidas (env, estilos, etc.)
- `src/services/` capa de acceso a APIs
- `src-tauri/` runtime Tauri (Rust)

## Variables de entorno

- `NEXT_PUBLIC_API_BASE_URL` (default: `http://127.0.0.1:3001`)

## Desarrollo

### Frontend (solo navegador)

```bash
pnpm --filter @siatec-egresos/desktop dev:frontend
# abre http://localhost:3100
```

### Desktop real (Tauri)

```bash
pnpm --filter @siatec-egresos/desktop dev:tauri
```

> `dev:tauri` ejecuta `tauri dev`, que a su vez llama `pnpm -C .. dev:frontend` (ver `src-tauri/tauri.conf.json`).

## Build

### Build frontend

```bash
pnpm --filter @siatec-egresos/desktop build
# alias de build:frontend
```

### Build Tauri

```bash
pnpm --filter @siatec-egresos/desktop build:tauri
```

## Requisitos (Windows)

Para **compilar Tauri** en Windows normalmente necesitas:

- Rust toolchain (rustup)
- Visual Studio Build Tools ("Desktop development with C++")
- WebView2 runtime (suele venir preinstalado)

Si faltan los Build Tools, el frontend (Next) debe compilar, pero `build:tauri` puede fallar.

## Nota sobre eg-010 (@siatec-egresos/api-client)

`/egresos` actualmente usa `fetch` (ver `src/services/http.ts`).
Cuando exista el package real `@siatec-egresos/api-client`, se migra el consumo en `src/services/egresos.ts`.
