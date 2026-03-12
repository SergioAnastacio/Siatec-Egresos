# ADR 009 - Quality gates minimos para GitHub y GitLab

## Estado

Aprobado

## Contexto

SIATEC debe operar en GitHub y GitLab al mismo tiempo. Mantener pipelines
distintas por plataforma incrementa deriva operativa y resultados inconsistentes.

## Decision

GitHub Actions y GitLab CI deben ejecutar la misma secuencia de validacion desde
la raiz del repositorio:

1. `pnpm install --frozen-lockfile`
2. `pnpm validate:structure`
3. `pnpm lint`
4. `pnpm typecheck`
5. `pnpm test`

La definicion de calidad vive en los comandos raiz del monorepo. Las pipelines
son adaptadores del proveedor, no fuentes separadas de logica.

Para trabajo local y cierre de tareas, esta secuencia es la base, no el limite.
Cuando una tarea toque un canal ejecutable, el agente o desarrollador debe
intentar ademas:

6. `pnpm --filter <workspace> build`
7. smoke run del canal afectado

La CI valida la base comun. La verificacion de arranque real del canal se agrega
como quality gate local o especializada a medida que el workspace madure.

## Consecuencias

- menor deriva entre GitHub y GitLab
- mismo criterio de aceptacion para `desktop`, `web` y workspaces compartidos
- mas facil endurecer la CI despues, sin duplicar reglas
- se deja preparado el camino para que Codex valide no solo compilacion, sino
  tambien arranque real de las aplicaciones
