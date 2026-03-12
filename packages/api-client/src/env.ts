/**
 * Intenta resolver el dev token desde variables de entorno.
 *
 * En web (Next.js) solo funcionarán las `NEXT_PUBLIC_*`.
 * En desktop/node pueden existir `API_DEV_TOKEN`/`DEV_TOKEN`.
 */
export function getDevTokenFromEnv(): string | undefined {
  const candidates = [
    process.env.NEXT_PUBLIC_API_DEV_TOKEN,
    process.env.NEXT_PUBLIC_DEV_TOKEN,
    process.env.API_DEV_TOKEN,
    process.env.DEV_TOKEN,
  ];

  for (const c of candidates) {
    const t = c?.trim();
    if (t) return t;
  }

  return undefined;
}
