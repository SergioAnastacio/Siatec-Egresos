import { httpGetJson } from '@/services/http';

import type { UserDto } from '@/features/auth/auth.types';
import type { UsersListResponse } from './users.types';

export const usersApi = {
  list() {
    return httpGetJson<UsersListResponse>('/api/v1/users');
  },
  detail(id: string) {
    return httpGetJson<UserDto>(`/api/v1/users/${encodeURIComponent(id)}`);
  },
};
