import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Button } from '@siatec-egresos/ui';

import { authApi } from '@/features/auth/auth.api';
import { setAuthToken } from '@/shared/auth/tokenStorage';
import { toErrorMessage } from '@/shared/errors/toErrorMessage';

export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState('dev');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await authApi.login({ login, password });

      if (res.token) {
        setAuthToken(res.token);
      }

      await router.push('/usuarios');
    } catch (e) {
      setError(toErrorMessage(e, 'No se pudo iniciar sesión'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login | Siatec Egresos</title>
      </Head>

      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="mt-2 text-gray-600">
            MVP: login dev-mode. Si la API tiene <code>API_DEV_TOKEN</code> configurado, la
            respuesta puede incluir un token para usar como Bearer.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm text-gray-700">Usuario</span>
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                autoComplete="username"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Password</span>
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>

            {error ? (
              <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Entrando…' : 'Entrar'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
