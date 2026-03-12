import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { HttpError } from '@/services/http';
import { authApi } from './auth.api';

export function useRequireAuth() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        await authApi.me();
      } catch (e) {
        const err = e as HttpError;
        if (!cancelled && err?.status === 401) {
          await router.replace('/login');
        }
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return { isChecking };
}
