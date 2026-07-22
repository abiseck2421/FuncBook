import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CreditCard, IndianRupee, CalendarDays, ArrowRight,
  Receipt, ChevronRight, CheckCircle2, Clock, XCircle,
  AlertTriangle,
} from 'lucide-react'

type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'

interface Payment {
  id: string
  serviceName: string
  category: string
  date: string
  amount: number
  method: string
  status: PaymentStatus
  bookingRef: string
}

const samplePayments: Payment[] = [
  {
    id: 'PAY-2026-001',
    serviceName: 'The Grand Ballroom',
    category: 'Function Halls',
    date: '2026-08-01',
    amount: 50000,
    method: 'UPI',
    status: 'paid',
    bookingRef: 'BK-2026-001',
  },
  {
    id: 'PAY-2026-002',
    serviceName: 'Spice Symphony Catering',
    category: 'Catering',
    date: '2026-08-01',
    amount: 12000,
    method: 'Credit Card',
    status: 'paid',
    bookingRef: 'BK-2026-002',
  },
  {
    id: 'PAY-2026-003',
    serviceName: 'Elegance Decor Studio',
    category: 'Decoration Setups',
    date: '2026-06-15',
    amount: 25000,
    method: 'UPI',
    status: 'paid',
    bookingRef: 'BK-2026-003',
  },
  {
    id: 'PAY-2026-004',
    serviceName: 'Captured Moments',
    category: 'Photographers',
    date: '2026-05-05',
    amount: 15000,
    method: 'Debit Card',
    status: 'paid',
    bookingRef: 'BK-2026-004',
  },
  {
    id: 'PAY-2026-005',
    serviceName: 'Starlight Productions',
    category: 'Lighting & Sound',
    date: '2026-04-01',
    amount: 22000,
    method: 'UPI',
    status: 'refunded',
    bookingRef: 'BK-2026-005',
  },
  {
    id: 'PAY-2026-006',
    serviceName: 'Glam Studio by Priya',
    category: 'Makeup Artists',
    date: '2026-03-12',
    amount: 8000,
    method: 'Net Banking',
    status: 'paid',
    bookingRef: 'BK-2026-006',
  },
]

const statusConfig: Record<PaymentStatus, { label: string; style: string; icon: typeof CheckCircle2 }> = {
  paid: { label: 'Paid', style: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  pending: { label: 'Pending', style: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
  failed: { label: 'Failed', style: 'bg-red-50 text-red-600 border-red-200', icon: XCircle },
  refunded: { label: 'Refunded', style: 'bg-blue-50 text-blue-700 border-blue-200', icon: AlertTriangle },
}

const filterTabs: Array<{ key: 'all' | PaymentStatus; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'paid', label: 'Paid' },
  { key: 'pending', label: 'Pending' },
  { key: 'failed', label: 'Failed' },
  { key: 'refunded', label: 'Refunded' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function PaymentsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | PaymentStatus>('all')

  const filteredPayments = activeFilter === 'all'
    ? samplePayments
    : samplePayments.filter((p) => p.status === activeFilter)

  const counts = {
    all: samplePayments.length,
    paid: samplePayments.filter((p) => p.status === 'paid').length,
    pending: samplePayments.filter((p) => p.status === 'pending').length,
    failed: samplePayments.filter((p) => p.status === 'failed').length,
    refunded: samplePayments.filter((p) => p.status === 'refunded').length,
  }

  const totalPaid = samplePayments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-12 sm:pb-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          Billing
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
          Payment History
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
          View all your transactions and billing records
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <div className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <IndianRupee size={18} className="text-gold-deep" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
              Total Paid
            </span>
          </div>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">
            ₹{totalPaid.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Receipt size={18} className="text-gold-deep" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
              Transactions
            </span>
          </div>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">
            {samplePayments.length}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <CreditCard size={18} className="text-gold-deep" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
              Refunded
            </span>
          </div>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">
            {counts.refunded}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-royal text-white shadow-[0_4px_16px_rgba(17,17,17,0.15)]'
                  : 'bg-white text-charcoal border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5'
              }`}
            >
              {tab.label}
              <span className={`inline-flex items-center justify-center min-w-[18px] sm:min-w-[22px] h-[18px] sm:h-[22px] px-1 sm:px-1.5 rounded-full text-[10px] sm:text-xs font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-gold/10 text-gold-deep'
              }`}>
                {counts[tab.key]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Payment Cards */}
      {filteredPayments.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {filteredPayments.map((payment) => {
            const status = statusConfig[payment.status]
            const StatusIcon = status.icon
            return (
              <div
                key={payment.id}
                className="group bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-gold-deep/25 hover:shadow-[0_8px_32px_rgba(184,134,11,0.08)] transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Receipt size={18} className="text-gold-deep sm:hidden" />
                      <Receipt size={22} className="text-gold-deep hidden sm:block" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-royal leading-tight">
                          {payment.serviceName}
                        </h3>
                        <span className={`inline-flex items-center self-start sm:self-auto gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${status.style}`}>
                          <StatusIcon size={10} />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-gold-deep mb-1.5">
                        {payment.category}
                      </p>
                      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-1 text-xs sm:text-sm text-secondary-text">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-charcoal/40">ID:</span>
                          <span className="font-mono text-[11px] sm:text-xs text-charcoal/70">{payment.id}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-charcoal/40">Booking:</span>
                          <span className="font-mono text-[11px] sm:text-xs text-charcoal/70">{payment.bookingRef}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={12} className="text-gold-deep" />
                          {formatDate(payment.date)}
                        </span>
                        <span className="text-xs text-secondary-text">
                          via {payment.method}
                        </span>
                      </div>
                    </div>

                    {/* Amount + Action */}
                    <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-black/5">
                      <span className="flex items-center gap-1 text-base sm:text-lg font-bold text-royal">
                        <IndianRupee size={14} />
                        {payment.amount.toLocaleString('en-IN')}
                      </span>
                      <Link
                        to={`/checkout/${payment.bookingRef}`}
                        className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300"
                      >
                        View Details
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-8 sm:p-10 md:p-16 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/10 border border-gold/20 mb-4 sm:mb-5">
            <CreditCard size={24} className="text-gold-deep sm:hidden" />
            <CreditCard size={28} className="text-gold-deep hidden sm:block" />
          </div>
          <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-royal">
            No payments found
          </h3>
          <p className="text-secondary-text text-xs sm:text-sm mt-2 max-w-sm mx-auto">
            {activeFilter === 'all'
              ? "You haven't made any payments yet. Browse our services and book your first event."
              : `No ${activeFilter} payments to show. Try a different filter.`}
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-xs sm:text-sm mt-5 sm:mt-6 shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
          >
            Browse Services
            <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </div>
  )
}
