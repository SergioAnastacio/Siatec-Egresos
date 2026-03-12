import Head from 'next/head';
import { Button } from '@siatec-egresos/ui';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-gray-600">Placeholder: pantalla de inicio de sesión.</p>

        <div className="mt-6">
          <Button onClick={() => alert('TODO: implementar login')}>Entrar</Button>
        </div>
      </main>
    </>
  );
}
