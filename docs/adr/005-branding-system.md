# ADR 005 - Sistema de branding corporativo

## Estado

Aprobado

## Contexto

SIATEC necesita una identidad visual consistente entre desktop, web, documentos
y artefactos internos. Si el branding se define por aplicacion, se duplica,
diverge y se vuelve dificil de mantener.

Tambien se requiere una ubicacion tecnica unica para logotipos, tokens de color
y reglas base de presentacion.

## Decision

El branding corporativo se define de forma centralizada.

La decision arquitectonica vive en este ADR.
La especificacion visual vive en `docs/architecture/branding.md`.
Los assets y tokens tecnicos viven en `packages/ui/`.

Ubicaciones oficiales:

- `docs/architecture/branding.md` para especificacion funcional y visual
- `packages/ui/assets/branding/` para logotipos y variantes
- `packages/ui/tokens/brand.css` para tokens visuales base consumibles por apps

## Consecuencias

- Web y desktop consumen la misma fuente de verdad de branding
- Los cambios de identidad visual no deben definirse dentro de una app especifica
- La implementacion visual futura debe partir de `packages/ui/`
- Los documentos de negocio pueden reutilizar la misma definicion de marca

## Notas

El branding inicial usa la paleta y tipografia acordadas por el equipo.
Los componentes y temas concretos se definiran en tareas posteriores.
