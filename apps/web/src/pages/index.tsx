import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Default route for now.
    void router.replace('/egresos');
  }, [router]);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-xl font-semibold">Siatec Egresos</h1>
      <p className="mt-2 text-sm text-gray-600">Redirigiendo…</p>
    </main>
  );
}
