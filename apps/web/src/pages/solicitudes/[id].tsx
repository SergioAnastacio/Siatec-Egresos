import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@siatec-egresos/ui';

import { solicitudesApi } from '@/features/solicitudes/solicitudes.api';
import type { SolicitudDto, SolicitudStatus, SolicitudTipo } from '@/features/solicitudes/solicitudes.types';
import { toErrorMessage } from '@/shared/errors/toErrorMessage';

type LoadState =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: SolicitudDto }
  | { status: 'error'; error: string };

const STATUS_OPTIONS: SolicitudStatus[] = ['borrador', 'enviada', 'autorizada', 'rechazada', 'cancelada'];
const TIPO_OPTIONS: SolicitudTipo[] = ['bienes', 'servicios', 'prestamo'];

export default function SolicitudDetailPage() {
  const router = useRouter();
  const id = useMemo(() => {
    const raw = router.query.id;
    return typeof raw === 'string' ? raw : raw?.[0];
  }, [router.query.id]);

  const [state, setState] = useState<LoadState>({ status: 'idle' });
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  // form
  const [tipo, setTipo] = useState<SolicitudTipo>('bienes');
  const [areaId, setAreaId] = useState('');
  const [notas, setNotas] = useState('');
  const [statusDraft, setStatusDraft] = useState<SolicitudStatus>('borrador');
  const [motivoCancel, setMotivoCancel] = useState('');

  const load = useCallback(async () => {
    if (!id) return;

    setState({ status: 'loading' });
    try {
      const data = await solicitudesApi.getById(id);
      setState({ status: 'success', data });

      setTipo((data.tipo as SolicitudTipo) ?? 'bienes');
      setAreaId(typeof data.areaId === 'string' ? data.areaId : '');
      setNotas(typeof data.notas === 'string' ? data.notas : '');
      setStatusDraft((data.status as SolicitudStatus) ?? 'borrador');
    } catch (e) {
      setState({ status: 'error', error: toErrorMessage(e, 'No se pudo cargar la solicitud') });
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSave() {
    if (!id) return;

    setIsSaving(true);
    try {
      const req: { tipo: SolicitudTipo; areaId?: string; notas?: string } = { tipo };
      const area = areaId.trim();
      if (area.length) req.areaId = area;
      const n = notas.trim();
      if (n.length) req.notas = n;

      const updated = await solicitudesApi.patch(id, req);

      setState({ status: 'success', data: updated });
    } catch (e) {
      setState({ status: 'error', error: toErrorMessage(e, 'No se pudo guardar la solicitud') });
    } finally {
      setIsSaving(false);
    }
  }

  async function onChangeStatus() {
    if (!id) return;

    const ok = window.confirm(`¿Cambiar estado a: ${statusDraft}?`);
    if (!ok) return;

    setIsChangingStatus(true);
    try {
      const req: { status: SolicitudStatus; motivo?: string } = { status: statusDraft };
      const motivo = motivoCancel.trim();
      if (statusDraft === 'cancelada' && motivo.length) req.motivo = motivo;

      const updated = await solicitudesApi.patchStatus(id, req);

      setState({ status: 'success', data: updated });
    } catch (e) {
      setState({ status: 'error', error: toErrorMessage(e, 'No se pudo cambiar el estado') });
    } finally {
      setIsChangingStatus(false);
    }
  }

  return (
    <>
      <Head>
        <title>Solicitud {id ?? ''} | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Solicitud</h1>
            <p className="mt-1 text-sm text-gray-600">
              ID: <span className="font-mono">{id ?? '—'}</span>
            </p>
          </div>

          <nav className="flex items-center gap-3">
            <Link className="text-sm underline" href="/solicitudes">
              Volver al catálogo
            </Link>
          </nav>
        </header>

        {state.status === 'error' ? (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <p className="font-medium">Error</p>
            <pre className="mt-2 overflow-auto whitespace-pre-wrap break-words font-mono">
              {state.error}
            </pre>
          </div>
        ) : null}

        {state.status === 'idle' || state.status === 'loading' ? (
          <p className="mt-6 text-sm text-gray-600">Cargando…</p>
        ) : state.status === 'success' ? (
          <>
            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-md border bg-white p-4">
                <h2 className="text-lg font-semibold">Edición</h2>

                <div className="mt-4 space-y-4">
                  <label className="block">
                    <span className="text-sm text-gray-700">Tipo</span>
                    <select
                      className="mt-1 w-full rounded border px-3 py-2"
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value as SolicitudTipo)}
                    >
                      {TIPO_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-700">Área ID</span>
                    <input
                      className="mt-1 w-full rounded border px-3 py-2"
                      value={areaId}
                      onChange={(e) => setAreaId(e.target.value)}
                      placeholder="areaId (opcional)"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-700">Notas</span>
                    <textarea
                      className="mt-1 w-full rounded border px-3 py-2"
                      value={notas}
                      onChange={(e) => setNotas(e.target.value)}
                      rows={4}
                      placeholder="Notas (opcional)"
                    />
                  </label>

                  <div className="flex gap-3">
                    <Button onClick={() => void onSave()} disabled={isSaving}>
                      {isSaving ? 'Guardando…' : 'Guardar'}
                    </Button>
                    <Button variant="secondary" onClick={() => void load()} disabled={false}>
                      Recargar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-md border bg-white p-4">
                <h2 className="text-lg font-semibold">Estado</h2>

                <div className="mt-4 space-y-4">
                  <label className="block">
                    <span className="text-sm text-gray-700">Estado actual</span>
                    <div className="mt-1 rounded border bg-gray-50 px-3 py-2 font-mono text-sm">
                      {String(state.data.status ?? '—')}
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-700">Cambiar a</span>
                    <select
                      className="mt-1 w-full rounded border px-3 py-2"
                      value={statusDraft}
                      onChange={(e) => setStatusDraft(e.target.value as SolicitudStatus)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>

                  {statusDraft === 'cancelada' ? (
                    <label className="block">
                      <span className="text-sm text-gray-700">Motivo (opcional)</span>
                      <input
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={motivoCancel}
                        onChange={(e) => setMotivoCancel(e.target.value)}
                        placeholder="Motivo de cancelación"
                      />
                    </label>
                  ) : null}

                  <div>
                    <Button onClick={() => void onChangeStatus()} disabled={isChangingStatus}>
                      {isChangingStatus ? 'Aplicando…' : 'Aplicar cambio de estado'}
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-lg font-semibold">Raw JSON</h2>
              <pre className="mt-2 overflow-auto rounded-md border bg-white p-3 text-sm">
                {JSON.stringify(state.data, null, 2)}
              </pre>
            </section>
          </>
        ) : null}
      </main>
    </>
  );
}
