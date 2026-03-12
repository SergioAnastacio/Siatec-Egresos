import { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@siatec-egresos/ui';

import { useRequireAuth } from '@/shared/auth/useRequireAuth';

export default function UsuarioDetailPage() {
  useRequireAuth();

  const router = useRouter();
  const id = useMemo(() => {
    const q = router.query.id;
    return typeof q === 'string' ? q : Array.isArray(q) ? q[0] : '';
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>Usuario {id || ''} | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Usuario {id}</h1>
            <p className="mt-1 text-sm text-gray-600">Placeholder: detalle de usuario.</p>
          </div>

          <nav className="flex items-center gap-4">
            <Link className="text-sm underline" href="/usuarios">
              Volver a usuarios
            </Link>
            <Link className="text-sm underline" href="/login">
              Login
            </Link>
          </nav>
        </header>

        <section className="mt-6 rounded-md border bg-white p-4">
          <p className="text-sm text-gray-700">
            Falta API para consultar usuarios. Cuando exista, este detalle debería llamar algo como{' '}
            <span className="font-mono">GET /api/v1/usuarios/{id || ':id'}</span>.
          </p>

          <div className="mt-4 flex gap-3">
            <Button variant="secondary" onClick={() => router.back()}>
              Atrás
            </Button>
            <Link href="/egresos">
              <Button variant="secondary">Ir a egresos</Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
