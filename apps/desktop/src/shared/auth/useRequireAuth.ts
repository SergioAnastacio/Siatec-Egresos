import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { getDevToken } from '@/shared/auth/token';

export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = getDevToken();
    if (!token) {
      void router.replace(`/login?next=${encodeURIComponent(router.asPath)}`);
    }
  }, [router]);
}
