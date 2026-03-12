import { httpGetJson, httpPostJson } from '@/services/http';

import type { LoginRequest, LoginResponse, MeResponse } from './auth.types';

export const authApi = {
  login(req: LoginRequest) {
    return httpPostJson<LoginResponse, LoginRequest>('/api/v1/auth/login', req);
  },
  me() {
    return httpGetJson<MeResponse>('/api/v1/auth/me');
  },
};
