import Head from 'next/head';
import Link from 'next/link';

import { Button } from '@siatec-egresos/ui';

import { useRequireAuth } from '@/shared/auth/useRequireAuth';

export default function UsuariosPage() {
  useRequireAuth();

  return (
    <>
      <Head>
        <title>Usuarios | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Usuarios</h1>
            <p className="mt-1 text-sm text-gray-600">
              MVP: página creada para alinear rutas con la versión web/desktop.
            </p>
          </div>

          <nav className="flex items-center gap-4">
            <Link className="text-sm underline" href="/login">
              Login
            </Link>
            <Link className="text-sm underline" href="/egresos">
              Egresos
            </Link>
          </nav>
        </header>

        <section className="mt-6 rounded-md border bg-white p-4">
          <p className="text-sm text-gray-700">
            Actualmente la API Rust (<span className="font-mono">services/api</span>) no expone endpoints de
            usuarios. Para implementar listado/detalle real falta algo como:
          </p>

          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
            <li>
              <span className="font-mono">GET /api/v1/usuarios</span>
            </li>
            <li>
              <span className="font-mono">GET /api/v1/usuarios/:id</span>
            </li>
          </ul>

          <p className="mt-3 text-sm text-gray-700">
            Mientras tanto, esta pantalla sólo valida navegación y autenticación (Bearer token).
          </p>

          <div className="mt-4 flex gap-3">
            <Link href="/usuarios/1">
              <Button variant="secondary">Abrir usuario ejemplo</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary">Volver</Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
