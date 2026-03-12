const STORAGE_KEY = 'siatec-egresos:devToken';

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

export function getDevToken(): string | null {
  if (!hasWindow()) return null;
  const token = window.localStorage.getItem(STORAGE_KEY);
  return token && token.trim().length > 0 ? token : null;
}

export function setDevToken(token: string) {
  if (!hasWindow()) return;
  window.localStorage.setItem(STORAGE_KEY, token.trim());
}

export function clearDevToken() {
  if (!hasWindow()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
