# Runbook — Probar SIATEC‑Egresos (otra máquina)

Este documento sirve para levantar **API + Web + Desktop** y probar los módulos actuales (**Login/Usuarios** y **Solicitudes**) en una máquina distinta.

> Nota: el MVP usa **auth en modo dev** con token estático.

---

## 1) Requisitos

- Node.js 22 LTS (recomendado)
- pnpm (vía Corepack o instalación global)
- Rust toolchain (stable) + Cargo

Opcional (solo si quieres compilar Tauri nativo):
- Visual Studio Build Tools (MSVC) + dependencias Tauri

---

## 2) Clonar e instalar

```powershell
git clone https://github.com/SergioAnastacio/Siatec-Egresos.git
cd Siatec-Egresos
pnpm install
```

---

## 3) Configuración de entorno (API)

Crear archivo `services/api/.env`:

```env
# Token dev requerido por endpoints protegidos
API_DEV_TOKEN=super-secret-dev-token

# (Opcional) URL SQL Server para /db/health
# SQLSERVER_URL=server=tcp:HOST,1433;database=master;user=USER;password=PASS;trustservercertificate=true;encrypt=true
```

---

## 4) Levantar API

En una terminal:

```powershell
cd services/api
cargo run
```

Debe escuchar en: `http://127.0.0.1:3001`

### 4.1 Smoke test (curl)

#### Login
```powershell
curl -s -X POST http://127.0.0.1:3001/api/v1/auth/login `
  -H "Content-Type: application/json" `
  -d "{\"login\":\"dev\",\"password\":\"dev\"}"
```

#### Me
```powershell
curl -i http://127.0.0.1:3001/api/v1/auth/me `
  -H "Authorization: Bearer super-secret-dev-token"
```

#### Users
```powershell
curl -s http://127.0.0.1:3001/api/v1/users `
  -H "Authorization: Bearer super-secret-dev-token"
```

#### Solicitudes (crear + listar)
```powershell
# Crear solicitud (bienes)
curl -s -X POST http://127.0.0.1:3001/api/v1/solicitudes `
  -H "Authorization: Bearer super-secret-dev-token" `
  -H "Content-Type: application/json" `
  -d "{\"tipo\":\"bienes\",\"areaId\":\"A1\",\"notas\":\"primera\"}"

# Listar (paginación)
curl -s "http://127.0.0.1:3001/api/v1/solicitudes?page=1&pageSize=10" `
  -H "Authorization: Bearer super-secret-dev-token"

# Filtrar por estado (ejemplo)
curl -s "http://127.0.0.1:3001/api/v1/solicitudes?estado=borrador" `
  -H "Authorization: Bearer super-secret-dev-token"
```

---

## 5) Levantar Web

En otra terminal (raíz del repo):

```powershell
pnpm --filter @siatec-egresos/web dev
```

Abrir:
- `http://localhost:3000/login`

### Flujo Web a probar
1) Login
2) Usuarios: `http://localhost:3000/usuarios`
3) Solicitudes: `http://localhost:3000/solicitudes`
   - Nueva solicitud / Nuevo préstamo / Cancelar / Editar

> La web usa token guardado en `localStorage`.

---

## 6) Levantar Desktop (modo Next.js)

En otra terminal:

```powershell
cd apps/desktop
pnpm dev
```

Abrir:
- `http://localhost:3100/login`

Pegar token:
- `super-secret-dev-token`

Probar:
- `http://localhost:3100/usuarios`
- `http://localhost:3100/solicitudes`

---

## 7) Validación repo (CI-like)

Desde raíz:

```powershell
pnpm validate
```

---

## Notas

- El módulo **Solicitudes** actualmente es **in-memory** (persistencia real vendrá al conectar SQL Server).
- `GET /openapi.json` expone el OpenAPI actual de la API Rust.
