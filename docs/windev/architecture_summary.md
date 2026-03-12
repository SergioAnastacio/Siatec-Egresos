# Architecture Summary

## 1. Purpose

This repository modernizes the legacy SIATEC / LUCCA WinDev system into a new desktop-first architecture.

This is not a line-by-line port.
It is a new implementation that preserves business behavior while moving business logic out of the front end.

## 2. Current Scope

Current release:
- Desktop only
- Windows x64 and x86
- Tauri shell
- Next.js App Router embedded UI
- Rust backend/services
- SQL Server database

Future:
- selective Web modules
- selective Mobile modules

Do not implement Web or Mobile now.

## 3. Layering Model

### Presentation
- `apps/desktop/src/app`
- `apps/desktop/src/components`

Responsibilities:
- render UI
- collect user input
- local UX validation only

### Desktop command layer
- `apps/desktop/src-tauri/src/commands`

Responsibilities:
- expose thin Tauri commands
- delegate to Rust services

### Application / Domain
- `services/api/src/<module>/service.rs`
- `services/api/src/<module>/rules.rs`

Responsibilities:
- business logic
- validation
- authorization
- orchestration

### Infrastructure
- `services/api/src/<module>/repository.rs`

Responsibilities:
- SQL Server access
- data mapping
- transactions

## 4. Key Rules

- No business logic in TSX
- No SQL in frontend
- Tauri commands are thin
- Rust owns rules and repositories
- Use trusted FKs
- Use `RowVer` on mutable entities where available
- Use normalized date outputs where available
- Use `AtencionServicios.USUARIO_ID` as canonical
- Use `Argon2id` for modern password handling

## 5. Current Modules In Scope

### Auth
Responsibilities:
- login
- temporary legacy compatibility in backend only
- progressive migration to modern password hashing
- user state checks

Tables expected:
- `Usuarios`
- `UsuHist`
- related permission tables if needed by current auth flow

### Inicio
Responsibilities:
- load desktop home context
- resolve allowed navigation
- provide authorized shell state

Tables expected:
- `Usuarios`
- `DatosGrales`
- `ConfInter`
- permission tables if needed

## 6. Modules Explicitly Out Of Scope For First Run

- Solicitudes Bienes
- Solicitudes Servicios
- Usuarios catalog
- Usuarios edit
- reporting
- packaging automation
- web app
- mobile app

## 7. Definition Of First Successful Slice

The first slice is successful when:

- monorepo structure exists
- desktop shell exists
- login page exists
- auth service exists
- inicio page exists
- inicio service exists
- code compiles
- SQL is only in Rust repositories
- TSX contains no business logic