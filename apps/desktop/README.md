# Desktop (placeholder)

Este paquete todavía no está scaffold (Tauri/Next).

Cuando se agregue el frontend, el cliente HTTP compartido puede reutilizarse desde:

- `@siatec-egresos/api-client`
- `@siatec-egresos/contracts`

Ejemplo:

```ts
import { createEgresosApi, getDevTokenFromEnv } from '@siatec-egresos/api-client';

const api = createEgresosApi({
  baseUrl: process.env.API_BASE_URL ?? 'http://127.0.0.1:3001',
  devToken: getDevTokenFromEnv(),
});

await api.getEgresos();
```
