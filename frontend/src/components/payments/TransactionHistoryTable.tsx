import { Receipt } from 'lucide-react'
import StatusBadge from './StatusBadge'
import type { PaymentStatus } from './StatusBadge'

export interface HistoryTxn {
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
  transactions: HistoryTxn[]
  formatDate: (d: string) => string
}

const thClass = 'text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-4 py-4 whitespace-nowrap'

export default function TransactionHistoryTable({ transactions, formatDate }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6">
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-black/5">
        <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Transaction History</h2>
        <span className="text-xs text-secondary-text">{transactions.length} transactions</span>
      </div>

      {transactions.length > 0 ? (
        <div className="overflow-y-auto overflow-x-hidden custom-scrollbar" style={{ height: 420 }}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5 sticky top-0 bg-white z-10">
                <th className={thClass}>Customer</th>
                <th className={thClass}>Service</th>
                <th className={thClass}>Booking Date</th>
                <th className={`${thClass} text-right`}>Amount</th>
                <th className={thClass}>Method</th>
                <th className={`${thClass} text-center`}>Status</th>
                <th className={`${thClass} w-12`} />
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, i) => (
                <tr
                  key={txn.id}
                  className={`transition-colors duration-150 h-[68px] ${i % 2 === 1 ? 'bg-[#FCFAF5]' : 'bg-white'} hover:bg-[#F8F5EE]`}
                >
                  <td className="px-4 py-0 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                        <span className="font-heading text-[10px] font-bold text-gold-deep">{txn.customerInitials}</span>
                      </div>
                      <span className="text-sm font-semibold text-royal">{txn.customerName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-0 align-middle whitespace-nowrap text-sm text-charcoal">{txn.serviceName}</td>
                  <td className="px-4 py-0 align-middle whitespace-nowrap text-sm text-charcoal">{formatDate(txn.bookingDate)}</td>
                  <td className="px-4 py-0 align-middle text-right whitespace-nowrap text-sm font-semibold text-royal">₹{txn.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-0 align-middle whitespace-nowrap text-sm text-charcoal">{txn.method}</td>
                  <td className="px-4 py-0 align-middle text-center whitespace-nowrap"><StatusBadge status={txn.status} /></td>
                  <td className="px-4 py-0 align-middle text-center whitespace-nowrap w-12" />
                </tr>
              ))}
              <tr><td colSpan={7} className="h-4" /></tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
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
      )}
    </div>
  )
}
