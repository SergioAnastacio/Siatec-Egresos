# Desktop (Tauri + Next.js)

MVP Desktop usando **Tauri 2** + **Next.js (Pages Router)**.

## Rutas

- `/login` → guarda un **Dev Token** (localStorage) y lo manda en requests como `Authorization: Bearer <token>`
- `/egresos` → ejemplo real llamando `GET /api/v1/egresos`
- `/usuarios` y `/usuarios/[id]` → placeholder (ver sección “Pendiente”)

## Desarrollo (Windows)

### 1) Instalar dependencias

Desde la raíz del monorepo:

```bash
pnpm install
```

### 2) Levantar API (Rust)

En una terminal:

```bash
cd services/api
cargo run
```

Por defecto el Desktop apunta a `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:3001`.

> Si la API está configurada con `DEV_TOKEN`, entra a `/login` y pega el token.

### 3) Levantar Desktop (modo web)

```bash
pnpm -C apps/desktop dev
```

### 4) (Opcional) Levantar Desktop como app Tauri

Requisitos:
- Rust toolchain
- Dependencias de Tauri para Windows

Luego:

```bash
pnpm -C apps/desktop dev:tauri
```

## Pendiente / Notas

- La API actual (`services/api`) **no expone endpoints de usuarios**, por eso `/usuarios` y `/usuarios/[id]` están como placeholder.
  Para completarlo se requieren endpoints tipo:
  - `GET /api/v1/usuarios`
  - `GET /api/v1/usuarios/:id`
