# SIATEC-Egresos

Monorepo para el canal **Desktop (Tauri)**, **Web (Next.js)** y **API** del proyecto SIATEC-Egresos.

## Objetivo
- Modernizar y operar un sistema orientado a egresos con una arquitectura consistente (monorepo) y colaboración humano+agentes.

## Stack (replicado de SIATEC-Codex)
- Monorepo: Turborepo + pnpm workspaces
- Desktop: Tauri 2.x + Next.js (Pages Router)
- Web: Next.js (Pages Router)
- API: (a definir; scaffold inicial en services/api)

## Comandos
- `pnpm dev`
- `pnpm build`
- `pnpm validate`

## Trabajo con agentes
- Leer `.codex/AGENTS.md`
- Tomar una tarea desde `.codex/tasks/queued/` y moverla a `in-progress/`
