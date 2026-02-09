// components/ui/Badge.tsx
import { PalletStatus, EnvioStatus } from '@/types';

type BadgeVariant = PalletStatus | EnvioStatus | 'info' | 'warning' | 'success' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const variantStyles: Record<string, string> = {
  // Pallet Status
  'Disponível': 'bg-green-50 text-green-700 border-green-200',
  'Em Uso': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Avariado': 'bg-red-50 text-red-700 border-red-200',
  
  // Envio Status
  'RASCUNHO': 'bg-gray-50 text-gray-700 border-gray-200',
  'AGUARDANDO': 'bg-blue-50 text-blue-700 border-blue-200',
  'EM_TRANSITO': 'bg-purple-50 text-purple-700 border-purple-200',
  'ENTREGUE': 'bg-green-50 text-green-700 border-green-200',
  'CANCELADO': 'bg-red-50 text-red-700 border-red-200',
  
  // Generic
  'info': 'bg-blue-50 text-blue-700 border-blue-200',
  'warning': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'success': 'bg-green-50 text-green-700 border-green-200',
  'error': 'bg-red-50 text-red-700 border-red-200',
};

export default function Badge({ 
  children, 
  variant = 'info',
  size = 'md',
  dot = false 
}: BadgeProps) {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`
      inline-flex
      items-center
      gap-1.5
      rounded-full
      border
      font-medium
      ${variantStyles[variant]}
      ${sizeStyles[size]}
    `}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      )}
      {typeof children === 'string' ? children.replace('_', ' ') : children}
    </span>
  );
}