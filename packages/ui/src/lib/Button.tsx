import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-black text-white hover:bg-gray-800'
      : 'bg-gray-200 text-black hover:bg-gray-300';

  return <button className={[base, styles, className].filter(Boolean).join(' ')} {...props} />;
}
