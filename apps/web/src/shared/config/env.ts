export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:3001',
  // Opcional: token dev-mode (Bearer) para endpoints protegidos.
  apiDevToken: process.env.NEXT_PUBLIC_API_DEV_TOKEN ?? '',
} as const;
