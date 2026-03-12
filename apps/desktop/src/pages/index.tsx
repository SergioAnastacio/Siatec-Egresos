import Head from 'next/head';
import Link from 'next/link';

import { Button } from '@siatec-egresos/ui';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Desktop | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <h1 className="text-2xl font-semibold">Siatec Egresos (Desktop)</h1>
        <p className="mt-2 text-sm text-gray-600">
          Scaffold Tauri 2 + Next.js (Pages Router). Navega a las pantallas placeholder:
        </p>

        <div className="mt-6 flex gap-3">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/egresos">
            <Button variant="secondary">Egresos</Button>
          </Link>
          <Link href="/usuarios">
            <Button variant="secondary">Usuarios</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
