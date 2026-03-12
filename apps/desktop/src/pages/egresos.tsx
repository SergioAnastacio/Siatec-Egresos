import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Button } from '@siatec-egresos/ui';

import type { HttpError } from '@/services/http';
import { getEgresos } from '@/services/egresos';
import { useRequireAuth } from '@/shared/auth/useRequireAuth';
import { env } from '@/shared/config/env';

type State =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: unknown }
  | { status: 'error'; error: HttpError | Error };

export default function EgresosPage() {
  useRequireAuth();

  const [state, setState] = useState<State>({ status: 'idle' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const data = await getEgresos();
      setState({ status: 'success', data });
    } catch (error) {
      setState({ status: 'error', error: error as Error });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <>
      <Head>
        <title>Egresos | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Egresos</h1>
            <p className="mt-1 text-sm text-gray-600">
              API base: <span className="font-mono">{env.apiBaseUrl}</span>
            </p>
          </div>

          <nav className="flex items-center gap-4">
            <Link className="text-sm underline" href="/login">
              Login
            </Link>
            <Link className="text-sm underline" href="/usuarios">
              Usuarios
            </Link>
          </nav>
        </header>

        <p className="mt-4 text-gray-600">
          Placeholder: pantalla principal de egresos. Debajo se hace una llamada real a{' '}
          <span className="font-mono">GET /api/v1/egresos</span>.
        </p>

        <div className="mt-6 flex gap-3">
          <Button onClick={load} disabled={state.status === 'loading'}>
            {state.status === 'loading' ? 'Cargando…' : 'Recargar'}
          </Button>
          <Button variant="secondary" onClick={() => alert('TODO: acción de egreso')}>
            Acción
          </Button>
        </div>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Respuesta</h2>

          {state.status === 'idle' || state.status === 'loading' ? (
            <p className="mt-2 text-sm text-gray-600">Cargando…</p>
          ) : state.status === 'error' ? (
            <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <p className="font-medium">Error al consultar egresos</p>
              <pre className="mt-2 overflow-auto whitespace-pre-wrap break-words font-mono">
                {String((state as any).error?.message ?? 'Error')}
              </pre>
            </div>
          ) : state.status === 'success' ? (
            <pre className="mt-2 overflow-auto rounded-md border bg-white p-3 text-sm">
              {JSON.stringify((state as any).data, null, 2)}
            </pre>
          ) : null}
        </section>
      </main>
    </>
  );
}
