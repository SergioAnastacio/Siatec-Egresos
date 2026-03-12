import Head from 'next/head';
import Link from 'next/link';

import { Button } from '@siatec-egresos/ui';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="mt-1 text-sm text-gray-600">Placeholder: pantalla de inicio de sesión.</p>
          </div>

          <nav className="flex items-center gap-4">
            <Link className="text-sm underline" href="/egresos">
              Ir a egresos
            </Link>
          </nav>
        </header>

        <section className="mt-6 max-w-md rounded-md border bg-white p-4">
          <p className="text-sm text-gray-700">TODO: formulario real (usuario/contraseña).</p>

          <div className="mt-4 flex gap-3">
            <Button onClick={() => alert('TODO: login')}>Entrar</Button>
            <Link href="/">
              <Button variant="secondary">Volver</Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
