import type { UserDto } from '@/features/auth/auth.types';

export type UsersListResponse = {
  items: UserDto[];
};
