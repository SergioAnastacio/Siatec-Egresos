# Branding Corporativo

## Objetivo

Definir la identidad visual base de SIATEC para que desktop, web y futuros
artefactos compartan la misma marca.

ADR relacionado: `docs/adr/005-branding-system.md`

## Paleta oficial

| Token      | Valor    | Uso principal |
|------------|----------|---------------|
| Primary    | `#151060`| Marca principal, encabezados, elementos institucionales |
| Secondary  | `#3C40C6`| Acciones secundarias, acentos de interfaz |
| Accent     | `#89A9FF`| Resaltados suaves, estados activos, fondos ligeros |
| Blue Mid   | `#2A4682`| Superficies intermedias, navegacion, apoyo visual |
| Success    | `#079D0E`| Confirmaciones, estados correctos |
| Error      | `#F50A1A`| Errores, alertas criticas |
| Warning    | `#FFD900`| Advertencias y mensajes preventivos |
| Light      | `#F5F9FF`| Fondos claros y superficies suaves |
| Text       | `#0B0B0B`| Texto principal |

## Tipografia

- Fuente principal: `Arial`
- Uso recomendado: interfaz general, tablas, formularios, navegacion y documentos funcionales

## Logotipo

Ubicacion tecnica oficial:

- `packages/ui/assets/branding/`

Archivos recomendados:

- `logo-primary.svg`
- `logo-primary-dark.svg`
- `logo-primary-light.svg`
- `icon-mark.svg`
- `favicon.svg`

Regla:

- El logotipo no debe colocarse dentro de `apps/web` ni `apps/desktop`
- Las apps deben consumirlo desde `packages/ui/assets/branding/`

## Tokens tecnicos

Ubicacion tecnica oficial:

- `packages/ui/tokens/brand.css`

Esta ubicacion permite que la marca sea consumida por web y desktop sin duplicacion.

## Uso esperado

- `Primary` para header, barra institucional y CTA principal
- `Secondary` para botones secundarios y enlaces destacados
- `Accent` para badges, estados activos y fondos sutiles
- `Blue Mid` para paneles, navegacion lateral y soporte visual
- `Light` para fondo base claro
- `Text` para texto general
- `Success`, `Error` y `Warning` para estados del sistema

## Accesibilidad

- Validar contraste antes de usar `Accent` sobre fondos claros
- `Warning` no debe usarse como color de texto principal sobre blanco sin soporte visual adicional
- Los estados no deben depender solo del color

## Implementacion

- La decision arquitectonica vive en `docs/adr/005-branding-system.md`
- Los assets viven en `packages/ui/assets/branding/`
- Los tokens viven en `packages/ui/tokens/brand.css`
- Los componentes que consumen branding viven en `packages/ui/`
