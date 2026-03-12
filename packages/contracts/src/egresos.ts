// DTOs compartidos para el módulo de egresos.
// Nota de convergencia:
// - Estos tipos replican los structs/enums en `modules/egresos` (Rust).
// - En el futuro podemos generar estos contratos desde OpenAPI/utoipa.

export type EgresoStatus =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'canceled';

export type Egreso = {
  id: string;
  concepto: string;
  monto: number;
  status: EgresoStatus;
  created_at?: string | null;
};

export type CreateEgresoRequest = {
  concepto: string;
  monto: number;
};
