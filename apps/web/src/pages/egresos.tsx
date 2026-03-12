import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@siatec-egresos/ui';

export default function EgresosPage() {
  return (
    <>
      <Head>
        <title>Egresos | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Egresos</h1>
          <Link className="text-sm underline" href="/login">
            Ir a login
          </Link>
        </header>

        <p className="mt-4 text-gray-600">Placeholder: pantalla principal de egresos.</p>

        <div className="mt-6">
          <Button onClick={() => alert('TODO: acción de egreso')}>Acción</Button>
        </div>
      </main>
    </>
  );
}
