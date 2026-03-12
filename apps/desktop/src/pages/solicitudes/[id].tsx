import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@siatec-egresos/ui';

import type { HttpError } from '@/services/http';
import { getSolicitudById } from '@/services/solicitudes';
import { useRequireAuth } from '@/shared/auth/useRequireAuth';

type State =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: unknown }
  | { status: 'error'; error: HttpError | Error };

export default function SolicitudDetailPage() {
  useRequireAuth();

  const router = useRouter();
  const id = useMemo(() => {
    const q = router.query.id;
    return typeof q === 'string' ? q : Array.isArray(q) ? q[0] : '';
  }, [router.query.id]);

  const [state, setState] = useState<State>({ status: 'idle' });

  const load = useCallback(async () => {
    if (!id) return;

    setState({ status: 'loading' });
    try {
      const data = await getSolicitudById(id);
      setState({ status: 'success', data });
    } catch (error) {
      setState({ status: 'error', error: error as Error });
    }
  }, [id]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!id) return;
    void load();
  }, [router.isReady, id, load]);

  return (
    <>
      <Head>
        <title>Solicitud {id || ''} | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Solicitud {id}</h1>
            <p className="mt-1 text-sm text-gray-600">
              MVP: detalle de solicitud. Llama{' '}
              <span className="font-mono">GET /api/v1/solicitudes/{id || ':id'}</span>.
            </p>
          </div>

          <nav className="flex items-center gap-4">
            <Link className="text-sm underline" href="/solicitudes">
              Volver a solicitudes
            </Link>
            <Link className="text-sm underline" href="/login">
              Login
            </Link>
          </nav>
        </header>

        <div className="mt-6 flex gap-3">
          <Button onClick={load} disabled={state.status === 'loading' || !id}>
            {state.status === 'loading' ? 'Cargando…' : 'Recargar'}
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Atrás
          </Button>
        </div>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Respuesta</h2>

          {!id ? (
            <p className="mt-2 text-sm text-gray-600">Esperando id…</p>
          ) : state.status === 'idle' || state.status === 'loading' ? (
            <p className="mt-2 text-sm text-gray-600">Cargando…</p>
          ) : state.status === 'error' ? (
            <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <p className="font-medium">Error al consultar la solicitud</p>
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
