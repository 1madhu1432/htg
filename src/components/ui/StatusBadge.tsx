import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeStyle = (st: string) => {
    switch (st.toLowerCase()) {
      case 'confirmed':
      case 'approved':
      case 'accepted':
      case 'active':
      case 'delivered':
      case 'in stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold';
      
      case 'pending':
      case 'pending review':
      case 'under review':
      case 'requested':
      case 'bulk order available':
        return 'bg-amber-50 text-amber-700 border-amber-200 font-semibold';

      case 'quoted':
      case 'sent':
      case 'processing':
      case 'packed':
      case 'dispatched':
      case 'reviewed':
        return 'bg-sky-50 text-sky-700 border-sky-200 font-semibold';

      case 'rejected':
      case 'cancelled':
      case 'out of stock':
      case 'paused':
        return 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';

      case 'revision requested':
        return 'bg-purple-50 text-purple-700 border-purple-200 font-semibold';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const sizeClass = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  }[size];

  return (
    <span className={`inline-flex items-center rounded-full border ${sizeClass} ${getBadgeStyle(status)} shadow-xs`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
      {status}
    </span>
  );
};
