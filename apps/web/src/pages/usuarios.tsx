import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@siatec-egresos/ui';

import { useRequireAuth } from '@/features/auth/useRequireAuth';
import type { UserDto } from '@/features/auth/auth.types';
import { usersApi } from '@/features/users/users.api';
import { toErrorMessage } from '@/shared/errors/toErrorMessage';

export default function UsuariosPage() {
  const { isChecking } = useRequireAuth();

  const [items, setItems] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    setIsLoading(true);
    try {
      const res = await usersApi.list();
      setItems(res.items);
    } catch (e) {
      setError(toErrorMessage(e, 'No se pudo cargar usuarios'));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isChecking) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecking]);

  return (
    <>
      <Head>
        <title>Usuarios | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Usuarios</h1>
            <Button onClick={load} disabled={isLoading || isChecking}>
              {isLoading ? 'Cargando…' : 'Recargar'}
            </Button>
          </div>

          {error ? (
            <div className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-6 overflow-x-auto rounded border">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-3 py-2">Login</th>
                  <th className="px-3 py-2">Nombre</th>
                  <th className="px-3 py-2">Roles</th>
                </tr>
              </thead>
              <tbody>
                {items.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="px-3 py-2">
                      <Link className="text-blue-700 underline" href={`/usuarios/${u.id}`}>
                        {u.login}
                      </Link>
                    </td>
                    <td className="px-3 py-2">{u.nombre ?? '—'}</td>
                    <td className="px-3 py-2">{u.roles?.join(', ') ?? '—'}</td>
                  </tr>
                ))}

                {!isLoading && !items.length ? (
                  <tr>
                    <td className="px-3 py-4 text-gray-600" colSpan={3}>
                      Sin usuarios.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
