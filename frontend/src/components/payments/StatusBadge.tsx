import { Clock, CheckCircle2, AlertTriangle } from 'lucide-react'

export type PaymentStatus = 'paid' | 'pending' | 'refunded'

const config: Record<PaymentStatus, { label: string; classes: string; icon: typeof CheckCircle2 }> = {
  paid: { label: 'Paid', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  pending: { label: 'Pending', classes: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
  refunded: { label: 'Refunded', classes: 'bg-blue-50 text-blue-700 border-blue-200', icon: AlertTriangle },
}

export default function StatusBadge({ status }: { status: PaymentStatus }) {
  const c = config[status]
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${c.classes}`}>
      <Icon size={10} />
      {c.label}
    </span>
  )
}
