import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@siatec-egresos/ui';

import { useRequireAuth } from '@/features/auth/useRequireAuth';
import type { UserDto } from '@/features/auth/auth.types';
import { usersApi } from '@/features/users/users.api';
import { toErrorMessage } from '@/shared/errors/toErrorMessage';

export default function UsuarioDetailPage() {
  const router = useRouter();
  const { isChecking } = useRequireAuth();

  const id = useMemo(() => {
    const v = router.query.id;
    return typeof v === 'string' ? v : null;
  }, [router.query.id]);

  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!id) return;

    setError(null);
    setIsLoading(true);
    try {
      const res = await usersApi.detail(id);
      setUser(res);
    } catch (e) {
      setError(toErrorMessage(e, 'No se pudo cargar el usuario'));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isChecking) return;
    if (!id) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecking, id]);

  return (
    <>
      <Head>
        <title>Usuario | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Detalle de usuario</h1>
            <Button onClick={load} disabled={isLoading || isChecking || !id}>
              {isLoading ? 'Cargando…' : 'Recargar'}
            </Button>
          </div>

          <div className="mt-2 text-sm">
            <Link className="text-blue-700 underline" href="/usuarios">
              ← Volver a usuarios
            </Link>
          </div>

          {error ? (
            <div className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-6 rounded border p-4">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase text-gray-500">ID</dt>
                <dd className="mt-1 break-all text-sm">{user?.id ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Login</dt>
                <dd className="mt-1 text-sm">{user?.login ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Nombre</dt>
                <dd className="mt-1 text-sm">{user?.nombre ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Roles</dt>
                <dd className="mt-1 text-sm">{user?.roles?.join(', ') ?? '—'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </>
  );
}
