# ADR 002 - Usar eliminacion logica en entidades de negocio

## Estado

Aprobado

## Contexto

SIATEC opera sobre informacion administrativa y fiscal donde la trazabilidad es
obligatoria. La eliminacion fisica de registros de entidades de negocio genera
riesgos de auditoria, integridad historica y cumplimiento.

## Decision

Las entidades de negocio se desactivaran mediante eliminacion logica.

La estrategia por defecto sera usar una bandera de actividad, por ejemplo
`activo = 0`, o el mecanismo equivalente definido por la tabla existente.

## Consecuencias

- Los repositorios no deben ejecutar `DELETE` fisico sobre entidades de negocio.
- Las consultas deben contemplar el filtro de registros activos cuando aplique.
- El modelo de datos debe preservar historial y trazabilidad.
- Los cambios excepcionales sobre datos deben documentarse explicitamente.

## Notas

Este ADR aplica a tablas de entidades de negocio. No sustituye reglas especificas
para auditoria, catalogos tecnicos o procesos administrativos especiales.
