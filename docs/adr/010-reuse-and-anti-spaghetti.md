# ADR 010 - Reutilizacion obligatoria y control de complejidad

## Estado

Aprobado

## Contexto

En una operacion con multiples desarrolladores y agentes, el deterioro mas
rapido suele venir por duplicacion de codigo, componentes casi iguales y mezcla
de UI, estado, fetch y reglas de negocio dentro del mismo archivo.

## Decision

Se adopta esta regla general:

- si una pieza reutilizable ya existe, debe usarse
- si un patron aparece o aparecera en multiples lugares, debe extraerse
- no se permite copiar y pegar implementaciones parecidas como solucion por
  defecto

Ubicacion esperada:

- `packages/ui/` para UI compartida entre desktop y web
- `apps/*` para UI especifica de canal
- `modules/*` para UI o logica especifica de dominio
- `services/` para capacidades transversales

Distribucion de responsabilidades:

- pagina: composicion de ruta
- componente: presentacion o interaccion focalizada
- hook: estado y efectos
- service: integracion externa o acceso a datos
- store: estado compartido

## Consecuencias

- menor duplicacion entre desktop y web
- mas consistencia para agentes
- menor riesgo de componentes gigantes o archivos dificiles de mantener
