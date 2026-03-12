# ADR 001 - Usar Tauri para la aplicacion desktop

## Estado

Aprobado

## Contexto

SIATEC requiere una aplicacion desktop con alta seguridad, bajo consumo de recursos
y capacidad de integrarse con un backend en Rust.

El proyecto tambien necesita una experiencia de desarrollo alineada con el resto
del monorepo, donde el frontend use React y NextJS y el backend desktop use Rust.

## Decision

La aplicacion desktop usara Tauri 2.x como contenedor nativo y Rust como backend.

El frontend desktop usara NextJS con Pages Router.

## Consecuencias

- El backend desktop queda en Rust y no en Node.js.
- La comunicacion entre frontend y backend desktop se hara mediante comandos Tauri.
- La app desktop comparte tecnologia frontend con la app web.
- Se evita adoptar Electron como runtime principal.

## Notas

Este ADR define una decision de plataforma. No define la estructura interna
del repositorio ni los limites entre modulos.
