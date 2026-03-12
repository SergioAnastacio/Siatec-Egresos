import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Button } from '@siatec-egresos/ui';

import type { HttpError } from '@/services/http';
import { getSolicitudes } from '@/services/solicitudes';
import { useRequireAuth } from '@/shared/auth/useRequireAuth';
import { env } from '@/shared/config/env';

type State =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: unknown }
  | { status: 'error'; error: HttpError | Error };

function tryExtractIds(data: unknown): string[] {
  const maybeArray = Array.isArray(data) ? data : (data as any)?.items;
  if (!Array.isArray(maybeArray)) return [];

  const ids: string[] = [];
  for (const item of maybeArray) {
    if (!item || typeof item !== 'object') continue;
    const id = (item as any).id ?? (item as any).solicitudId ?? (item as any).folio;
    if (typeof id === 'string' || typeof id === 'number') {
      ids.push(String(id));
    }
  }

  return Array.from(new Set(ids)).slice(0, 20);
}

export default function SolicitudesPage() {
  useRequireAuth();

  const [state, setState] = useState<State>({ status: 'idle' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const data = await getSolicitudes();
      setState({ status: 'success', data });
    } catch (error) {
      setState({ status: 'error', error: error as Error });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const ids = useMemo(() => {
    if (state.status !== 'success') return [];
    return tryExtractIds((state as any).data);
  }, [state]);

  return (
    <>
      <Head>
        <title>Solicitudes | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Solicitudes</h1>
            <p className="mt-1 text-sm text-gray-600">
              API base: <span className="font-mono">{env.apiBaseUrl}</span>
            </p>
          </div>

          <nav className="flex items-center gap-4">
            <Link className="text-sm underline" href="/">
              Inicio
            </Link>
            <Link className="text-sm underline" href="/egresos">
              Egresos
            </Link>
            <Link className="text-sm underline" href="/usuarios">
              Usuarios
            </Link>
            <Link className="text-sm underline" href="/login">
              Login
            </Link>
          </nav>
        </header>

        <p className="mt-4 text-gray-600">
          MVP: listado de solicitudes. Debajo se hace una llamada real a{' '}
          <span className="font-mono">GET /api/v1/solicitudes</span>.
        </p>

        <div className="mt-6 flex gap-3">
          <Button onClick={load} disabled={state.status === 'loading'}>
            {state.status === 'loading' ? 'Cargando…' : 'Recargar'}
          </Button>
          <Link href="/solicitudes/1">
            <Button variant="secondary">Abrir detalle ejemplo</Button>
          </Link>
        </div>

        {ids.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-lg font-semibold">Detalles rápidos</h2>
            <p className="mt-1 text-sm text-gray-600">
              IDs detectados en la respuesta (best-effort). Selecciona uno para abrir el detalle.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ids.map((id) => (
                <Link key={id} href={`/solicitudes/${encodeURIComponent(id)}`}>
                  <Button variant="secondary">#{id}</Button>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Respuesta</h2>

          {state.status === 'idle' || state.status === 'loading' ? (
            <p className="mt-2 text-sm text-gray-600">Cargando…</p>
          ) : state.status === 'error' ? (
            <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <p className="font-medium">Error al consultar solicitudes</p>
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
