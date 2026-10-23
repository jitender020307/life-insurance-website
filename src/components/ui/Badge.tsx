import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = 'primary', size = 'md', className, dot = false }: BadgeProps) {
  const variants = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    secondary: 'bg-secondary-100 text-secondary-700',
    outline: 'bg-transparent border border-secondary-300 text-secondary-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', variant === 'success' && 'bg-green-500', variant === 'warning' && 'bg-yellow-500', variant === 'danger' && 'bg-red-500', variant === 'primary' && 'bg-primary-500', variant === 'secondary' && 'bg-secondary-500')} />}
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: string;
  type?: 'policy' | 'payment' | 'application';
}

export function StatusBadge({ status, type = 'policy' }: StatusBadgeProps) {
  const statusConfig: Record<string, { label: string; variant: BadgeProps['variant']; dot: boolean }> = {
    // Policy statuses
    active: { label: 'Active', variant: 'success', dot: true },
    pending: { label: 'Pending Review', variant: 'warning', dot: false },
    lapsed: { label: 'Lapsed', variant: 'danger', dot: false },
    cancelled: { label: 'Cancelled', variant: 'secondary', dot: false },
    expired: { label: 'Expired', variant: 'secondary', dot: false },
    pending_review: { label: 'Pending Review', variant: 'warning', dot: false },
    // Payment statuses
    completed: { label: 'Completed', variant: 'success', dot: true },
    failed: { label: 'Failed', variant: 'danger', dot: false },
    refunded: { label: 'Refunded', variant: 'secondary', dot: false },
    // Application statuses
    new: { label: 'New', variant: 'secondary', dot: false },
    contacted: { label: 'Contacted', variant: 'primary', dot: false },
    quoted: { label: 'Quoted', variant: 'warning', dot: false },
    applied: { label: 'Applied', variant: 'primary', dot: false },
    approved: { label: 'Approved', variant: 'success', dot: true },
    declined: { label: 'Declined', variant: 'danger', dot: false },
  };

  const config = statusConfig[status] || { label: status, variant: 'secondary', dot: false };

  return <Badge variant={config.variant} dot={config.dot}>{config.label}</Badge>;
}
