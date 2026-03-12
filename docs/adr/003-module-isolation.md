# ADR 003 - Aislar los modulos ERP entre si

## Estado

Aprobado

## Contexto

El sistema se construira como un ERP modular. Si los modulos se importan
directamente entre si, el acoplamiento crece rapido y la evolucion del dominio
se vuelve dificil de controlar.

## Decision

Los modulos ERP en `modules/` no pueden importar directamente otros modulos.

El codigo compartido entre modulos debe ubicarse en `packages/`.
Los servicios transversales con estado o integracion compartida deben ubicarse
en `services/`.

## Consecuencias

- Cada modulo conserva ownership claro sobre su dominio.
- La reutilizacion pasa por contratos comunes y no por dependencias ad hoc.
- Los cambios transversales deben elevarse a `packages/` o `services/`.
- La arquitectura favorece pruebas, mantenimiento y autonomia del agente.

## Notas

Este ADR establece un limite arquitectonico. La estructura exacta del monorepo
se define en un ADR separado.
