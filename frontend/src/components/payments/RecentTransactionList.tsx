import { Receipt } from 'lucide-react'
import StatusBadge from './StatusBadge'
import type { PaymentStatus } from './StatusBadge'

export interface RecentTxn {
  id: string
  customerInitials: string
  customerName: string
  serviceName: string
  bookingDate: string
  amount: number
  method: string
  status: PaymentStatus
}

interface Props {
  transactions: RecentTxn[]
  formatDate: (d: string) => string
}

export default function RecentTransactionList({ transactions, formatDate }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6">
        <div className="flex flex-col items-center justify-center h-[350px] text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
            <Receipt size={28} className="text-gold-deep" />
          </div>
          <h3 className="font-heading text-lg font-bold text-royal">No Transactions Yet</h3>
          <p className="text-secondary-text text-sm mt-2 max-w-xs">
            Payments will appear here once bookings are completed.
          </p>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-deep text-white text-sm font-semibold hover:bg-royal transition-all duration-250"
          >
            View Bookings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Recent Transactions</h2>
        <span className="text-xs text-secondary-text font-semibold">Last 5 payments</span>
      </div>
      <div className="overflow-y-auto overflow-x-hidden custom-scrollbar" style={{ height: 348 }}>
        {transactions.map((txn, i) => (
          <div
            key={txn.id}
            className="flex items-center gap-4 px-4 rounded-xl transition-all duration-250 hover:bg-[#FAF7F1] hover:translate-x-[4px] h-[72px]"
            style={{ animation: `fadeIn 0.3s ${i * 0.04}s both` }}
          >
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
              <span className="font-heading text-sm font-bold text-gold-deep">{txn.customerInitials}</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <p className="text-sm font-semibold text-royal truncate leading-tight">{txn.customerName}</p>
              <p className="text-xs text-secondary-text truncate leading-tight mt-0.5">
                {txn.serviceName} · {formatDate(txn.bookingDate)}
              </p>
            </div>
            <div className="text-right shrink-0 flex flex-col items-end justify-center ml-auto">
              <p className="text-sm font-bold text-royal leading-tight">₹{txn.amount.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-secondary-text leading-tight mt-0.5">{txn.method}</p>
            </div>
            <StatusBadge status={txn.status} />
          </div>
        ))}
      </div>
    </div>
  )
}
