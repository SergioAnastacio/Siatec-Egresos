# Reglas de Frontend -- SIATEC

Estas reglas aplican a todo el codigo React y NextJS en el proyecto.

---

## Componentes

Solo componentes funcionales. Nunca usar componentes de clase.
Cada componente debe tener una sola responsabilidad visible.
Si un componente hace demasiadas cosas, dividelo antes de seguir agregando logica.

## Reutilizacion obligatoria

Antes de crear un componente, hook o servicio nuevo:

1. Busca si ya existe una pieza equivalente en `apps/`, `modules/`, `packages/ui/` o `services/`.
2. Si existe una pieza adecuada, usala.
3. Si no existe y el patron ya aparece en mas de un lugar, crea la abstraccion reutilizable.

Reglas practicas:

- UI compartida entre desktop y web va en `packages/ui/`
- UI especifica de una app se queda en la app
- UI especifica de un modulo se queda en el modulo
- Hooks compartidos entre multiples consumidores deben extraerse
- Llamadas a datos o integraciones nunca deben duplicarse entre componentes

### Nunca hacer

- copiar y pegar componentes casi iguales con cambios menores de texto o clases
- repetir la misma transformacion de datos en multiples paginas
- meter fetch, manejo de estado, presentacion y reglas de negocio en un solo componente

### Cuando extraer

Extrae una pieza antes de continuar si se cumple cualquiera de estas condiciones:

- el mismo patron aparece en 2 o mas lugares
- el componente mezcla presentacion con logica asincrona o transformaciones complejas
- el archivo deja de ser entendible de un vistazo
- hay partes internas que ya tienen un nombre natural de dominio o UI

### Incorrecto
```tsx
class TarjetaUsuario extends React.Component {
  render() {
    return <div>{this.props.nombre}</div>
  }
}
```

### Correcto
```tsx
interface TarjetaUsuarioProps {
  nombre: string
  rol: string
}

export function TarjetaUsuario({ nombre, rol }: TarjetaUsuarioProps) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border border-gray-200">
      <span className="font-semibold text-gray-900">{nombre}</span>
      <span className="text-sm text-gray-500">{rol}</span>
    </div>
  )
}
```

---

## Estilos

Solo TailwindCSS. Sin estilos en linea. Sin CSS modules. Sin styled-components.

### Incorrecto
```tsx
<div style={{ display: 'flex', color: 'red', padding: '16px' }}>
```

### Correcto
```tsx
<div className="flex text-red-500 p-4">
```

---

## TypeScript

Nunca usar any. Definir interfaces para todas las props, respuestas de API y valores de retorno de hooks.

### Incorrecto
```tsx
function ListaRegistros({ registros }: any) { ... }

async function obtenerDatos(): Promise<any> { ... }
```

### Correcto
```tsx
// NOTA: Reemplazar nombres de campo con valores reales una vez documentado database/schema/.
// Este es solo un ejemplo estructural.
interface Registro {
  id: number
  // agregar campos despues de documentar el schema
}

interface ListaRegistrosProps {
  registros: Registro[]
  alSeleccionar: (id: number) => void
}

function ListaRegistros({ registros, alSeleccionar }: ListaRegistrosProps) { ... }
```

---

## Custom Hooks

Todos los custom hooks van en hooks/.
El nombre debe empezar con use.
Una responsabilidad por hook.
Siempre retornar un objeto con campos nombrados -- nunca un array plano.
Los hooks no deben renderizar UI ni contener markup.

```tsx
// hooks/useVerificacionSalud.ts
import { useState } from 'react'
import { verificarSalud } from '@/services/sistema.service'

interface UseVerificacionSaludReturn {
  estado: string | null
  cargando: boolean
  error: string | null
  verificar: () => Promise<void>
}

export function useVerificacionSalud(): UseVerificacionSaludReturn {
  const [estado, setEstado] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const verificar = async () => {
    setCargando(true)
    setError(null)
    try {
      const resultado = await verificarSalud()
      setEstado(resultado)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setCargando(false)
    }
  }

  return { estado, cargando, error, verificar }
}
```

---

## Comunicacion con Tauri

Todas las llamadas invoke() deben vivir en services/.
Los componentes y hooks nunca deben llamar invoke() directamente.

### Incorrecto
```tsx
// [ ] invoke directamente en un componente
export default function PaginaInicio() {
  const manejarClick = async () => {
    const resultado = await invoke('health_check')
  }
}
```

### Correcto
```tsx
// services/sistema.service.ts -- todas las llamadas invoke viven aqui
import { invoke } from '@tauri-apps/api/core'

export async function verificarSalud(): Promise<string> {
  return invoke<string>('health_check')
}

// hooks/useVerificacionSalud.ts -- el hook llama al servicio
import { verificarSalud } from '@/services/sistema.service'

// componentes o paginas -- usan el hook
import { useVerificacionSalud } from '@/hooks/useVerificacionSalud'
```

---

## Estado Asincrono -- Siempre Manejar Tres Estados

Cada componente que hace una llamada asincrona debe manejar cargando, error y datos.

### Incorrecto
```tsx
function ListaRegistros() {
  const { registros } = useRegistros()
  return <ul>{registros.map(r => <li key={r.id}>{r.nombre}</li>)}</ul>
}
```

### Correcto
```tsx
function ListaRegistros() {
  const { registros, cargando, error } = useRegistros()

  if (cargando) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!registros || registros.length === 0) return <EmptyState />

  return <ul>{registros.map(r => <li key={r.id}>{r.nombre}</li>)}</ul>
}
```

---

## Gestion de Estado

Usar Zustand para estado compartido entre componentes.
No usar useState para datos que multiples componentes necesitan.
No usar stores globales para estado local efimero de una sola pantalla.

---

## Antiespageti

Un archivo de pagina o componente no debe crecer como punto de acumulacion de
todo el flujo. Distribuye responsabilidades asi:

- pagina: composicion y layout de ruta
- componente: presentacion o interaccion concreta
- hook: estado y coordinacion de efectos
- service: acceso a datos o integracion
- store: estado compartido de larga vida

Si una pagina necesita multiples bloques de UI, crea componentes hijos.
Si una accion requiere pasos asincronos y manejo de estado, crea un hook.
Si hay adaptacion de datos remotos, crea un servicio o mapper.

```tsx
// store/app.store.ts
import { create } from 'zustand'

interface AppStore {
  estadoSistema: string | null
  setEstadoSistema: (estado: string) => void
}

export const useAppStore = create<AppStore>((set) => ({
  estadoSistema: null,
  setEstadoSistema: (estado) => set({ estadoSistema: estado }),
}))
```

---

## Nomenclatura de Archivos

| Tipo                     | Convencion        | Ejemplo                         |
|--------------------------|-------------------|---------------------------------|
| Componente               | PascalCase        | TarjetaRegistro.tsx             |
| Hook                     | camelCase         | useVerificacionSalud.ts         |
| Servicio                 | camelCase         | sistema.service.ts              |
| Store                    | camelCase         | app.store.ts                    |
| Pagina (Pages Router)    | camelCase/index   | pages/dashboard/index.tsx       |
| Archivo de tipos         | camelCase         | registro.types.ts               |

---

## NextJS Pages Router

Usar Pages Router unicamente. Nunca usar App Router (app/).

Estructura de archivos especiales:
- `pages/_app.tsx`      -- layout global, providers y estilos globales
- `pages/_document.tsx` -- personalizacion del documento HTML (opcional)
- `pages/404.tsx`       -- pagina de error 404
- `pages/500.tsx`       -- pagina de error 500

Estructura de paginas:
```
pages/
  _app.tsx              <- layout global
  index.tsx             <- pagina principal (/)
  dashboard/
    index.tsx           <- /dashboard
  usuarios/
    index.tsx           <- /usuarios (lista)
    [id].tsx            <- /usuarios/:id (detalle, ruta dinamica)
  solicitudes/
    index.tsx           <- /solicitudes
    nueva.tsx           <- /solicitudes/nueva
    [id].tsx            <- /solicitudes/:id
```

Data fetching del lado del servidor:
- Usar `getServerSideProps` para datos dinamicos (cada solicitud)
- Usar `getStaticProps` para datos estaticos (build time)
- Todos los componentes en pages/ son componentes cliente por defecto
- No usar React Server Components -- no aplica en Pages Router
