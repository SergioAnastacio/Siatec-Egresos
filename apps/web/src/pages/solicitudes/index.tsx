import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@siatec-egresos/ui';

import { solicitudesApi } from '@/features/solicitudes/solicitudes.api';
import type { SolicitudDto } from '@/features/solicitudes/solicitudes.types';
import { toErrorMessage } from '@/shared/errors/toErrorMessage';

type State =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: SolicitudDto[] }
  | { status: 'error'; error: string };

function pickDisplayId(s: SolicitudDto) {
  return s.folio ?? s.id;
}

export default function SolicitudesIndexPage() {
  const router = useRouter();

  const [state, setState] = useState<State>({ status: 'idle' });
  const [isCreating, setIsCreating] = useState(false);
  const [isCancellingId, setIsCancellingId] = useState<string | null>(null);

  const rows = useMemo(() => (state.status === 'success' ? state.data : []), [state]);

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const data = await solicitudesApi.list();
      setState({ status: 'success', data });
    } catch (e) {
      setState({ status: 'error', error: toErrorMessage(e, 'No se pudo cargar solicitudes') });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onCreate(tipo: 'bienes' | 'prestamo') {
    setIsCreating(true);
    try {
      const created = await solicitudesApi.create({ tipo });
      await router.push(`/solicitudes/${encodeURIComponent(created.id)}`);
    } catch (e) {
      setState({ status: 'error', error: toErrorMessage(e, 'No se pudo crear la solicitud') });
    } finally {
      setIsCreating(false);
    }
  }

  async function onCancel(id: string) {
    const ok = window.confirm('¿Cancelar esta solicitud?');
    if (!ok) return;

    setIsCancellingId(id);
    try {
      await solicitudesApi.patchStatus(id, { status: 'cancelada' });
      await load();
    } catch (e) {
      setState({ status: 'error', error: toErrorMessage(e, 'No se pudo cancelar la solicitud') });
    } finally {
      setIsCancellingId(null);
    }
  }

  return (
    <>
      <Head>
        <title>Solicitudes | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Solicitudes</h1>
            <p className="mt-1 text-sm text-gray-600">
              MVP: catálogo + alta (normal/préstamo) + cancelar.
            </p>
          </div>

          <nav className="flex items-center gap-3">
            <Link className="text-sm underline" href="/usuarios">
              Usuarios
            </Link>
            <Link className="text-sm underline" href="/login">
              Login
            </Link>
          </nav>
        </header>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => void onCreate('bienes')} disabled={isCreating}>
            {isCreating ? 'Creando…' : 'Nueva solicitud'}
          </Button>
          <Button variant="secondary" onClick={() => void onCreate('prestamo')} disabled={isCreating}>
            {isCreating ? 'Creando…' : 'Nuevo préstamo'}
          </Button>
          <Button variant="secondary" onClick={() => void load()} disabled={state.status === 'loading'}>
            {state.status === 'loading' ? 'Cargando…' : 'Recargar'}
          </Button>
        </div>

        {state.status === 'error' ? (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <p className="font-medium">Error</p>
            <pre className="mt-2 overflow-auto whitespace-pre-wrap break-words font-mono">
              {state.error}
            </pre>
          </div>
        ) : null}

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Catálogo</h2>

          {state.status === 'idle' || state.status === 'loading' ? (
            <p className="mt-2 text-sm text-gray-600">Cargando…</p>
          ) : (
            <div className="mt-3 overflow-auto rounded-md border bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Tipo</th>
                    <th className="px-3 py-2">Estado</th>
                    <th className="px-3 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length ? (
                    rows.map((s) => (
                      <tr key={s.id} className="border-t">
                        <td className="px-3 py-2 font-mono">{pickDisplayId(s)}</td>
                        <td className="px-3 py-2">{String(s.tipo ?? '—')}</td>
                        <td className="px-3 py-2">{String(s.status ?? '—')}</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-2">
                            <Link className="underline" href={`/solicitudes/${encodeURIComponent(s.id)}`}>
                              Ver / Editar
                            </Link>
                            <button
                              className="text-red-700 underline disabled:text-gray-400"
                              onClick={() => void onCancel(s.id)}
                              disabled={isCancellingId === s.id}
                              type="button"
                            >
                              {isCancellingId === s.id ? 'Cancelando…' : 'Cancelar'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-3 py-3 text-gray-600" colSpan={4}>
                        Sin registros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
