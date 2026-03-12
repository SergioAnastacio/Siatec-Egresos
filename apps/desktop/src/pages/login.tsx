import { FormEvent, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@siatec-egresos/ui';

import { clearDevToken, getDevToken, setDevToken } from '@/shared/auth/token';

export default function LoginPage() {
  const router = useRouter();
  const next = useMemo(() => {
    const queryNext = router.query.next;
    return typeof queryNext === 'string' && queryNext.length > 0 ? queryNext : '/egresos';
  }, [router.query.next]);

  const [token, setToken] = useState('');
  const [savedToken, setSavedTokenState] = useState<string | null>(null);

  useEffect(() => {
    const existing = getDevToken();
    setSavedTokenState(existing);
    setToken(existing ?? '');
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDevToken(token);
    setSavedTokenState(getDevToken());
    void router.replace(next);
  };

  const onLogout = () => {
    clearDevToken();
    setSavedTokenState(null);
    setToken('');
  };

  return (
    <>
      <Head>
        <title>Login | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="mt-1 text-sm text-gray-600">
              MVP: se guarda un <span className="font-mono">Dev Token</span> local y se manda como{' '}
              <span className="font-mono">Authorization: Bearer ...</span> a la API.
            </p>
          </div>

          <nav className="flex items-center gap-4">
            <Link className="text-sm underline" href="/">
              Home
            </Link>
            <Link className="text-sm underline" href="/egresos">
              Egresos
            </Link>
            <Link className="text-sm underline" href="/usuarios">
              Usuarios
            </Link>
          </nav>
        </header>

        <section className="mt-6 max-w-xl rounded-md border bg-white p-4">
          {savedToken ? (
            <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
              Token guardado. Puedes navegar a las pantallas protegidas.
            </div>
          ) : (
            <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              No hay token guardado. Si la API está configurada con <span className="font-mono">DEV_TOKEN</span>,
              las llamadas devolverán 401 hasta que captures uno.
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Dev Token</label>
            <input
              className="w-full rounded-md border px-3 py-2 font-mono text-sm"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="pega aquí el token (o deja vacío si auth está deshabilitado)"
            />

            <div className="flex gap-3">
              <Button type="submit">Guardar y continuar</Button>
              <Button type="button" variant="secondary" onClick={onLogout}>
                Limpiar token
              </Button>
            </div>

            <p className="text-xs text-gray-500">
              Redirección post-login: <span className="font-mono">{next}</span>
            </p>
          </form>
        </section>
      </main>
    </>
  );
}
