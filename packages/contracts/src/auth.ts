// DTOs compartidos para MVP Login/Usuarios.
// Nota: alineados a `services/api` (Rust axum).

export type UserDto = {
  id: string;
  login: string;
  nombre?: string | null;
  roles?: string[] | null;
};

export type LoginRequest = {
  login: string;
  password: string;
};

export type LoginResponse = {
  token?: string | null;
  user: UserDto;
};

export type MeResponse = {
  user: UserDto;
};
