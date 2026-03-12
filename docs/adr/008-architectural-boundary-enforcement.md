# ADR 008 - Enforcement tecnico de baseline y limites del monorepo

## Estado

Aprobado

## Contexto

El repositorio ya tiene reglas arquitectonicas documentadas, pero sin una
superficie comun de scripts y validaciones es dificil hacerlas cumplir en
GitHub, GitLab o trabajo local.

## Decision

Se define una baseline tecnica comun en la raiz del monorepo con estos
elementos:

- `package.json` raiz con comandos compartidos
- `turbo.json` como orquestador comun
- `tsconfig.base.json` y `tsconfig.json` para TypeScript
- `.editorconfig` y `.npmrc` para consistencia operativa
- `tools/validate-structure.mjs` para validar estructura minima
- `tools/workspace-task.mjs` como placeholder uniforme mientras llega el
  scaffolding funcional

Todos los workspaces deben exponer como minimo:

- `build`
- `lint`
- `typecheck`
- `test`

Las apps activas tambien deben exponer `dev`.

## Consecuencias

- GitHub y GitLab comparten la misma superficie de validacion
- `desktop` y `web` quedan integradas al flujo desde el principio
- la estructura minima del monorepo se puede validar antes del scaffolding real
