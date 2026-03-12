export function toErrorMessage(err: unknown, fallback = 'Ocurrió un error') {
  if (!err) return fallback;
  if (typeof err === 'string') return err;
  if (typeof err === 'object' && 'message' in err) {
    const msg = (err as { message?: unknown }).message;
    if (typeof msg === 'string' && msg.trim().length) return msg;
  }
  return fallback;
}
