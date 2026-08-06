import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import {
  IndianRupee, Clock, CheckCircle2, Receipt, TrendingUp,
  X, XCircle, AlertTriangle, CalendarDays,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PaymentSummaryCard from '../../components/payments/PaymentSummaryCard'
import RecentTransactionList from '../../components/payments/RecentTransactionList'
import PaymentFilters from '../../components/payments/PaymentFilters'
import TransactionHistoryTable from '../../components/payments/TransactionHistoryTable'
import type { PaymentStatus } from '../../components/payments/StatusBadge'

interface Transaction {
  id: string
  customerName: string
  customerInitials: string
  serviceName: string
  bookingDate: string
  amount: number
  method: string
  status: PaymentStatus
}

const transactions: Transaction[] = [
  { id: 'TXN-2026-001', customerName: 'Priya Sharma', customerInitials: 'PS', serviceName: 'Royal Palace Banquet Hall', bookingDate: '2026-07-20', amount: 50000, method: 'UPI', status: 'paid' },
  { id: 'TXN-2026-002', customerName: 'Rahul Verma', customerInitials: 'RV', serviceName: 'Spice Route Catering', bookingDate: '2026-07-18', amount: 12000, method: 'Credit Card', status: 'paid' },
  { id: 'TXN-2026-003', customerName: 'Ananya Gupta', customerInitials: 'AG', serviceName: 'Bloom & Bliss Decor', bookingDate: '2026-07-15', amount: 25000, method: 'UPI', status: 'paid' },
  { id: 'TXN-2026-004', customerName: 'Vikram Patel', customerInitials: 'VP', serviceName: 'Royal Palace Banquet Hall', bookingDate: '2026-07-10', amount: 45000, method: 'Debit Card', status: 'paid' },
  { id: 'TXN-2026-005', customerName: 'Sneha Iyer', customerInitials: 'SI', serviceName: 'Lens & Light Photography', bookingDate: '2026-07-08', amount: 18000, method: 'UPI', status: 'pending' },
  { id: 'TXN-2026-006', customerName: 'Arjun Nair', customerInitials: 'AN', serviceName: 'Spice Route Catering', bookingDate: '2026-06-28', amount: 22000, method: 'Bank Transfer', status: 'paid' },
  { id: 'TXN-2026-007', customerName: 'Meera Reddy', customerInitials: 'MR', serviceName: 'Spice Route Catering', bookingDate: '2026-06-15', amount: 18000, method: 'UPI', status: 'refunded' },
  { id: 'TXN-2026-008', customerName: 'Deepa Krishnan', customerInitials: 'DK', serviceName: 'Lens & Light Photography', bookingDate: '2026-06-10', amount: 32000, method: 'Credit Card', status: 'paid' },
  { id: 'TXN-2026-009', customerName: 'Mohammed Farhan', customerInitials: 'MF', serviceName: 'Grand Terrace Lounge', bookingDate: '2026-05-22', amount: 35000, method: 'Bank Transfer', status: 'paid' },
  { id: 'TXN-2026-010', customerName: 'Nisha Agarwal', customerInitials: 'NA', serviceName: 'Royal Palace Banquet Hall', bookingDate: '2026-05-10', amount: 55000, method: 'UPI', status: 'paid' },
]

const monthlyEarnings = [
  { month: 'Aug', value: 95000 }, { month: 'Sep', value: 120000 },
  { month: 'Oct', value: 108000 }, { month: 'Nov', value: 155000 },
  { month: 'Dec', value: 142000 }, { month: 'Jan', value: 178000 },
  { month: 'Feb', value: 132000 }, { month: 'Mar', value: 195000 },
  { month: 'Apr', value: 168000 }, { month: 'May', value: 190000 },
  { month: 'Jun', value: 210000 }, { month: 'Jul', value: 225000 },
]

const serviceRevenue = [
  { name: 'Venues', value: 425000, color: '#C89B2D' },
  { name: 'Catering', value: 310000, color: '#10B981' },
  { name: 'Photography', value: 195000, color: '#0EA5E9' },
  { name: 'Decoration', value: 165000, color: '#F59E0B' },
  { name: 'Entertainment', value: 85000, color: '#8B5CF6' },
]

const maxEarning = Math.max(...monthlyEarnings.map((d) => d.value))
const maxServiceRevenue = Math.max(...serviceRevenue.map((d) => d.value))

const totalRevenue = transactions.filter((t) => t.status === 'paid').reduce((s, t) => s + t.amount, 0)
const pendingPayout = transactions.filter((t) => t.status === 'pending').reduce((s, t) => s + t.amount, 0)

const dateRangeOptions = ['All Time', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months'] as const
const paymentMethodOptions = ['All Methods', 'UPI', 'Credit Card', 'Debit Card', 'Bank Transfer'] as const
const statusOptions = ['All Status', 'Paid', 'Pending', 'Refunded'] as const

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

type ModalType = 'revenue' | 'pending' | 'payout' | 'transactions'

type StatusKey = 'completed' | 'pending' | 'failed' | 'refunded'

interface Payout {
  payoutId: string
  txnId: string
  serviceName: string
  payoutDate: string
  amount: number
  method: string
}

const payouts: Payout[] = transactions
  .filter((t) => t.status === 'paid')
  .map((t, i) => ({
    payoutId: `PO-2026-${String(i + 1).padStart(3, '0')}`,
    txnId: t.id,
    serviceName: t.serviceName,
    payoutDate: t.bookingDate,
    amount: t.amount,
    method: t.method,
  }))

const statusLabel: Record<StatusKey, string> = {
  completed: 'Completed',
  pending: 'Pending',
  failed: 'Failed',
  refunded: 'Refunded',
}

const statusStyles: Record<StatusKey, { classes: string; icon: typeof CheckCircle2 }> = {
  completed: { classes: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  pending: { classes: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
  failed: { classes: 'bg-red-50 text-red-600 border-red-200', icon: XCircle },
  refunded: { classes: 'bg-blue-50 text-blue-700 border-blue-200', icon: AlertTriangle },
}

const statusDotColors: Record<StatusKey, string> = {
  completed: 'bg-emerald-500',
  pending: 'bg-amber-500',
  failed: 'bg-red-500',
  refunded: 'bg-blue-500',
}

const statusKeyMap: Record<PaymentStatus, StatusKey> = {
  paid: 'completed',
  pending: 'pending',
  refunded: 'refunded',
}

function addDays(dateStr: string, days: number) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function bookingRef(txnId: string) {
  return `BK-${txnId.replace('TXN-', '')}`
}

function StatusPill({ status }: { status: StatusKey }) {
  const c = statusStyles[status]
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${c.classes}`}>
      <Icon size={10} />
      {statusLabel[status]}
    </span>
  )
}

interface ModalShellProps {
  icon: LucideIcon
  iconClass: string
  title: string
  subtitle: string
  onClose: () => void
  tall?: boolean
  children: ReactNode
}

function ModalShell({ icon: Icon, iconClass, title, subtitle, onClose, tall = false, children }: ModalShellProps) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const closeTimerRef = useRef<number | null>(null)

  const requestClose = () => {
    if (closing) return
    setClosing(true)
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(onClose, 220)
  }

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('keydown', handleEscape)
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const backdropClass = `absolute inset-0 bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-300 ${
    closing || !visible ? 'opacity-0' : 'opacity-100'
  }`

  const panelClass = `relative w-full max-w-[620px] ${
    tall ? 'min-h-[560px] max-h-[90vh]' : 'min-h-[440px] max-h-[82vh]'
  } bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden transition-all duration-300 ease-out ${
    closing || !visible ? 'opacity-0 scale-[0.96] -translate-y-3' : 'opacity-100 scale-100 translate-y-0'
  }`

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className={backdropClass} onClick={requestClose} />
      <div className={panelClass}>
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2 rounded-xl text-charcoal/40 hover:text-royal hover:bg-ivory transition-colors"
        >
          <X size={18} />
        </button>
        <div className="px-6 sm:px-7 pt-7 pb-5 border-b border-black/5 shrink-0">
          <div className="flex items-center gap-3 mb-1 pr-8">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconClass}`}>
              <Icon size={18} />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">{title}</h2>
          </div>
          <p className="text-sm text-secondary-text mt-2 pl-12">{subtitle}</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 sm:px-7 py-5">{children}</div>
      </div>
    </div>
  )
}

function RevenueDetailsModal({ onClose }: { onClose: () => void }) {
  const completed = transactions.filter((t) => t.status === 'paid')
  const total = completed.reduce((s, t) => s + t.amount, 0)
  const recentMonths = monthlyEarnings.slice(-6)
  const maxRecent = Math.max(...recentMonths.map((m) => m.value))
  const topService = serviceRevenue.reduce((a, b) => (b.value > a.value ? b : a))
  return (
    <ModalShell
      icon={IndianRupee}
      iconClass="bg-gold/10 text-gold-deep"
      title="Revenue Details"
      subtitle="Your completed earnings from paid bookings."
      onClose={onClose}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold-deep/15 bg-gold/5 px-4 py-3.5 mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text">Total Revenue</p>
          <p className="text-xs text-secondary-text mt-0.5">{completed.length} completed bookings</p>
        </div>
        <p className="font-heading text-2xl sm:text-3xl font-bold text-royal">₹{total.toLocaleString('en-IN')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl border border-gold-deep/15 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Revenue by Recent Month</p>
          <div className="flex items-end gap-2 h-[76px]">
            {recentMonths.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1 justify-end">
                <span className="text-[9px] font-semibold text-royal">₹{(m.value / 1000).toFixed(0)}K</span>
                <div
                  className="w-full max-w-[30px] rounded-t-sm"
                  style={{ height: `${(m.value / maxRecent) * 44}px`, backgroundColor: '#C89B2D' }}
                />
                <span className="text-[9px] font-medium text-secondary-text">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-gold-deep/15 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Most Profitable Service</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
              <TrendingUp size={18} className="text-gold-deep" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-royal truncate">{topService.name}</p>
              <p className="text-xs text-secondary-text mt-0.5">₹{topService.value.toLocaleString('en-IN')} earned</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Completed Earnings</p>
      <div className="space-y-2">
        {completed.map((t) => (
          <div key={t.id} className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-black/5 hover:border-gold-deep/25 transition-colors">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-royal truncate">{t.serviceName}</p>
              <p className="text-xs text-secondary-text truncate mt-0.5">{t.customerName} · {formatDate(t.bookingDate)}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-royal">₹{t.amount.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-secondary-text mt-0.5">{t.method}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-2xl bg-ivory border border-gold-deep/15">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">Total</span>
        <span className="font-heading text-lg font-bold text-gold-deep">₹{total.toLocaleString('en-IN')}</span>
      </div>
    </ModalShell>
  )
}

function PendingPayoutModal({ onClose }: { onClose: () => void }) {
  const pendings = transactions.filter((t) => t.status === 'pending')
  const total = pendings.reduce((s, t) => s + t.amount, 0)
  const feeRate = 0.15
  const first = pendings[0]
  const detailGridClass = 'flex items-center justify-between gap-2 rounded-2xl border border-black/5 px-3.5 py-2.5'
  return (
    <ModalShell
      icon={Clock}
      iconClass="bg-amber-50 text-amber-600"
      title="Pending Payout Details"
      subtitle="Amounts awaiting release to your account."
      onClose={onClose}
      tall
    >
      {pendings.length === 0 ? (
        <div className="text-center py-10 text-sm text-secondary-text">No pending payouts. All earnings have been settled.</div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/60 px-4 py-3.5 mb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text">Total Pending Payout</p>
              <p className="text-xs text-secondary-text mt-0.5">{pendings.length} payout{pendings.length > 1 ? 's' : ''} awaiting release</p>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-royal">₹{total.toLocaleString('en-IN')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            <div className={detailGridClass}>
              <span className="text-xs text-secondary-text">Payout Processing Status</span>
              <StatusPill status="pending" />
            </div>
            <div className={detailGridClass}>
              <span className="text-xs text-secondary-text">Expected Payout Date</span>
              <span className="text-xs font-semibold text-royal flex items-center gap-1"><CalendarDays size={12} className="text-gold-deep" />{formatDate(addDays(first.bookingDate, 7))}</span>
            </div>
            <div className={detailGridClass}>
              <span className="text-xs text-secondary-text">Payout Method</span>
              <span className="text-xs font-semibold text-royal">{first.method}</span>
            </div>
            <div className={detailGridClass}>
              <span className="text-xs text-secondary-text">Number of Pending Payouts</span>
              <span className="text-xs font-semibold text-royal">{pendings.length}</span>
            </div>
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Payout Breakdown</p>
          <div className="rounded-2xl border border-gold-deep/15 divide-y divide-black/5 mb-4">
            {pendings.map((p) => {
              const fee = Math.round(p.amount * feeRate)
              const net = p.amount - fee
              return (
                <div key={p.id} className="p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-royal truncate">{p.serviceName}</p>
                      <p className="text-[11px] text-secondary-text truncate mt-0.5">{p.customerName} · Booking {bookingRef(p.id)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-heading text-lg font-bold text-royal">₹{p.amount.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-secondary-text mt-0.5">{p.method}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-text">Booking ID</span>
                      <span className="font-mono text-xs font-semibold text-charcoal/70">{bookingRef(p.id)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-text">Booking Date</span>
                      <span className="font-medium text-royal">{formatDate(p.bookingDate)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-text">Customer / Event</span>
                      <span className="font-medium text-royal text-right">{p.customerName}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-text">Service Name</span>
                      <span className="font-medium text-royal text-right">{p.serviceName}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-text">Earnings Amount</span>
                      <span className="font-medium text-royal">₹{p.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-secondary-text">Platform / Service Fee</span>
                      <span className="font-medium text-charcoal">- ₹{fee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 sm:col-span-2 rounded-xl bg-ivory border border-gold-deep/15 px-3 py-2.5">
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text">Net Payout</span>
                      <span className="font-heading text-lg font-bold text-gold-deep">₹{net.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Recent Pending Payout Records</p>
          <div className="rounded-2xl border border-gold-deep/15 overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_124px_92px_112px] gap-x-3 px-3.5 py-2.5 border-b border-black/5 text-[10px] font-semibold uppercase tracking-[0.15em] text-secondary-text">
              <span>Service / Booking</span>
              <span className="text-right">Expected</span>
              <span className="text-center">Status</span>
              <span className="text-right">Amount</span>
            </div>
            <div className="p-1.5 space-y-1.5">
              {pendings.map((p) => {
                const expectedDate = addDays(p.bookingDate, 7)
                return (
                  <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-y-1.5 sm:gap-x-3 px-3 py-2.5 rounded-xl border border-black/5 hover:border-gold-deep/25 hover:bg-gold/5 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-royal truncate">{p.serviceName}</p>
                      <p className="text-[11px] text-secondary-text truncate mt-0.5">{p.customerName} · {bookingRef(p.id)}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:w-[124px] shrink-0">
                      <span className="sm:hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-secondary-text">Expected</span>
                      <span className="text-xs font-medium text-royal flex items-center gap-1"><CalendarDays size={12} className="text-gold-deep" />{formatDate(expectedDate)}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-center gap-2 sm:w-[92px] shrink-0">
                      <span className="sm:hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-secondary-text">Status</span>
                      <StatusPill status="pending" />
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:w-[112px] shrink-0">
                      <span className="sm:hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-secondary-text">Amount</span>
                      <span className="font-heading text-base font-bold text-gold-deep">₹{p.amount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </ModalShell>
  )
}

function PayoutHistoryModal({ onClose }: { onClose: () => void }) {
  const total = payouts.reduce((s, p) => s + p.amount, 0)
  const latest = [...payouts].sort((a, b) => new Date(b.payoutDate).getTime() - new Date(a.payoutDate).getTime())[0]
  return (
    <ModalShell
      icon={CheckCircle2}
      iconClass="bg-emerald-50 text-emerald-600"
      title="Completed Payout Details"
      subtitle="Completed payouts transferred to your account."
      onClose={onClose}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-3.5 mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text">Total Paid Out</p>
          <p className="text-xs text-secondary-text mt-0.5">{payouts.length} completed payouts</p>
        </div>
        <p className="font-heading text-2xl sm:text-3xl font-bold text-royal">₹{total.toLocaleString('en-IN')}</p>
      </div>

      {latest && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Latest Payout</p>
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-royal truncate">{latest.serviceName}</p>
              <p className="text-[11px] text-secondary-text mt-0.5 flex items-center gap-1"><CalendarDays size={11} className="text-gold-deep" />{formatDate(latest.payoutDate)}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-heading text-xl font-bold text-royal">₹{latest.amount.toLocaleString('en-IN')}</p>
              <div className="mt-1"><StatusPill status="completed" /></div>
            </div>
          </div>
          <div className="pt-3 border-t border-black/5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-secondary-text">
            <span><span className="text-charcoal/40 font-semibold">Booking:</span> <span className="font-mono text-charcoal/70">{bookingRef(latest.txnId)}</span></span>
            <span><span className="text-charcoal/40 font-semibold">Txn:</span> <span className="font-mono text-charcoal/70">{latest.txnId}</span></span>
            <span><span className="text-charcoal/40 font-semibold">Payout:</span> <span className="font-mono text-charcoal/70">{latest.payoutId}</span></span>
          </div>
        </div>
      )}

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Payouts</p>
      <div className="space-y-2">
        {payouts.map((p) => (
          <div key={p.payoutId} className="rounded-2xl border border-black/5 p-4 hover:border-gold-deep/25 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-royal truncate">{p.serviceName}</p>
                <p className="text-[11px] text-secondary-text mt-0.5 flex items-center gap-1"><CalendarDays size={11} className="text-gold-deep" />{formatDate(p.payoutDate)}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-royal">₹{p.amount.toLocaleString('en-IN')}</p>
                <div className="mt-1"><StatusPill status="completed" /></div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-black/5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-secondary-text">
              <span><span className="text-charcoal/40 font-semibold">Payout:</span> <span className="font-mono text-charcoal/70">{p.payoutId}</span></span>
              <span><span className="text-charcoal/40 font-semibold">Txn:</span> <span className="font-mono text-charcoal/70">{p.txnId}</span></span>
              <span>via {p.method}</span>
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  )
}

function TransactionHistoryModal({ onClose }: { onClose: () => void }) {
  const counts: Record<StatusKey, number> = {
    completed: transactions.filter((t) => t.status === 'paid').length,
    pending: transactions.filter((t) => t.status === 'pending').length,
    failed: 0,
    refunded: transactions.filter((t) => t.status === 'refunded').length,
  }
  const breakdown: StatusKey[] = ['completed', 'pending', 'failed', 'refunded']
  const recent = [...transactions].sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
  return (
    <ModalShell
      icon={Receipt}
      iconClass="bg-gold/10 text-gold-deep"
      title="Transaction Details"
      subtitle={`All ${transactions.length} transactions across your account.`}
      onClose={onClose}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold-deep/15 bg-gold/5 px-4 py-3.5 mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text">Total Transactions</p>
          <p className="text-xs text-secondary-text mt-0.5">Across all bookings and services</p>
        </div>
        <p className="font-heading text-2xl sm:text-3xl font-bold text-royal">{transactions.length}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {breakdown.map((key) => (
          <span key={key} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-deep/15 bg-white text-xs font-semibold text-royal">
            <span className={`w-2 h-2 rounded-full ${statusDotColors[key]}`} />
            {statusLabel[key]}
            <span className="text-gold-deep">{counts[key]}</span>
          </span>
        ))}
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Recent Transactions</p>
      <div className="space-y-2">
        {recent.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-black/5 hover:border-gold-deep/25 transition-colors">
            <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
              <span className="font-heading text-[11px] font-bold text-gold-deep">{t.customerInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-royal truncate">{t.customerName}</p>
              <p className="text-[11px] text-secondary-text truncate mt-0.5">{t.serviceName} · {formatDate(t.bookingDate)} · {t.method}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-royal">₹{t.amount.toLocaleString('en-IN')}</p>
            </div>
            <StatusPill status={statusKeyMap[t.status]} />
          </div>
        ))}
      </div>
    </ModalShell>
  )
}

export default function HostPaymentsPage() {
  const [dateRange, setDateRange] = useState('All Time')
  const [methodFilter, setMethodFilter] = useState('All Methods')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [activeModal, setActiveModal] = useState<ModalType | null>(null)

  const filteredTransactions = transactions.filter((t) => {
    if (methodFilter !== 'All Methods' && t.method !== methodFilter) return false
    if (statusFilter !== 'All Status' && t.status !== statusFilter.toLowerCase()) return false
    return true
  })

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
    .slice(0, 5)

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-12 sm:pb-10">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #C89B3C #F8F5EE }
        .custom-scrollbar::-webkit-scrollbar { width: 6px }
        .custom-scrollbar::-webkit-scrollbar-track { background: #F8F5EE; border-radius: 3px }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #C89B3C; border-radius: 3px }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #B8860B }
        .custom-scrollbar::-webkit-scrollbar-button { display: none; width: 0; height: 0 }
      `}</style>

      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          Billing
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
          Payments
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
          Track earnings, payouts, and transaction history.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        <PaymentSummaryCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={IndianRupee} index={0} onClick={() => setActiveModal('revenue')} />
        <PaymentSummaryCard label="Pending Payout" value={`₹${pendingPayout.toLocaleString('en-IN')}`} icon={Clock} index={1} onClick={() => setActiveModal('pending')} />
        <PaymentSummaryCard label="Completed Payout" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={CheckCircle2} index={2} onClick={() => setActiveModal('payout')} />
        <PaymentSummaryCard label="Total Transactions" value={transactions.length} icon={Receipt} index={3} onClick={() => setActiveModal('transactions')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8" style={{ height: 320 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Monthly Earnings</h2>
            <div className="flex items-center gap-1.5 text-xs text-secondary-text">
              <TrendingUp size={14} className="text-emerald-600" />
              <span className="font-semibold text-emerald-600">+12%</span>
            </div>
          </div>
          <div className="relative h-[calc(100%-60px)]">
            <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C89B2D" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#C89B2D" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${monthlyEarnings.map((d, i) => {
                  const x = (i / (monthlyEarnings.length - 1)) * 660 + 20
                  const y = 190 - (d.value / maxEarning) * 170
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                }).join(' ')} L 680 190 L 20 190 Z`}
                fill="url(#earnGrad)"
              />
              <polyline
                points={monthlyEarnings.map((d, i) => {
                  const x = (i / (monthlyEarnings.length - 1)) * 660 + 20
                  const y = 190 - (d.value / maxEarning) * 170
                  return `${x},${y}`
                }).join(' ')}
                fill="none" stroke="#C89B2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              />
              {monthlyEarnings.map((d, i) => {
                const x = (i / (monthlyEarnings.length - 1)) * 660 + 20
                const y = 190 - (d.value / maxEarning) * 170
                return <circle key={i} cx={x} cy={y} r="3.5" fill="white" stroke="#C89B2D" strokeWidth="2" />
              })}
            </svg>
            <div className="absolute bottom-0 inset-x-0 flex justify-between px-4">
              {monthlyEarnings.map((d) => (
                <span key={d.month} className="text-[9px] font-medium text-secondary-text">{d.month}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8" style={{ height: 320 }}>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Revenue by Service</h2>
          <div className="flex items-end gap-3 h-[calc(100%-60px)]">
            {serviceRevenue.map((svc) => (
              <div key={svc.name} className="flex-1 flex flex-col items-center gap-1.5 justify-end">
                <span className="text-[10px] font-semibold text-royal">₹{(svc.value / 1000).toFixed(0)}K</span>
                <div className="w-full flex justify-center">
                  <div
                    className="w-full max-w-[36px] rounded-t-md transition-all duration-500"
                    style={{ height: `${(svc.value / maxServiceRevenue) * 150}px`, backgroundColor: svc.color }}
                  />
                </div>
                <span className="text-[9px] font-medium text-secondary-text text-center leading-tight">{svc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <RecentTransactionList transactions={recentTransactions} formatDate={formatDate} />
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="mb-4">
          <PaymentFilters
            dateRange={dateRange}
            methodFilter={methodFilter}
            statusFilter={statusFilter}
            dateRangeOptions={dateRangeOptions}
            paymentMethodOptions={paymentMethodOptions}
            statusOptions={statusOptions}
            onDateRangeChange={setDateRange}
            onMethodFilterChange={setMethodFilter}
            onStatusFilterChange={setStatusFilter}
            onExport={() => {}}
          />
        </div>
        <TransactionHistoryTable transactions={filteredTransactions} formatDate={formatDate} />
      </div>

      {activeModal === 'revenue' && <RevenueDetailsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'pending' && <PendingPayoutModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'payout' && <PayoutHistoryModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'transactions' && <TransactionHistoryModal onClose={() => setActiveModal(null)} />}
    </div>
  )
}
