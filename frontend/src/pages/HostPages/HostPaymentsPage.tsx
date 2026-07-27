import { useState } from 'react'
import {
  IndianRupee, CalendarDays, Receipt, Clock, Download,
  CheckCircle2, ChevronDown, CreditCard, Building2, Wallet,
  TrendingUp, ArrowRight, AlertTriangle,
} from 'lucide-react'

type PaymentStatus = 'paid' | 'pending' | 'refunded'

interface Transaction {
  id: string
  customerName: string
  customerInitials: string
  serviceName: string
  bookingDate: string
  amount: number
  method: string
  status: PaymentStatus
  payoutDate: string
}

const transactions: Transaction[] = [
  { id: 'TXN-2026-001', customerName: 'Priya Sharma', customerInitials: 'PS', serviceName: 'Royal Palace Banquet Hall', bookingDate: '2026-07-20', amount: 50000, method: 'UPI', status: 'paid', payoutDate: '2026-07-25' },
  { id: 'TXN-2026-002', customerName: 'Rahul Verma', customerInitials: 'RV', serviceName: 'Spice Route Catering', bookingDate: '2026-07-18', amount: 12000, method: 'Credit Card', status: 'paid', payoutDate: '2026-07-23' },
  { id: 'TXN-2026-003', customerName: 'Ananya Gupta', customerInitials: 'AG', serviceName: 'Bloom & Bliss Decor', bookingDate: '2026-07-15', amount: 25000, method: 'UPI', status: 'paid', payoutDate: '2026-07-20' },
  { id: 'TXN-2026-004', customerName: 'Vikram Patel', customerInitials: 'VP', serviceName: 'Royal Palace Banquet Hall', bookingDate: '2026-07-10', amount: 45000, method: 'Debit Card', status: 'paid', payoutDate: '2026-07-15' },
  { id: 'TXN-2026-005', customerName: 'Sneha Iyer', customerInitials: 'SI', serviceName: 'Lens & Light Photography', bookingDate: '2026-07-08', amount: 18000, method: 'UPI', status: 'pending', payoutDate: '—' },
  { id: 'TXN-2026-006', customerName: 'Arjun Nair', customerInitials: 'AN', serviceName: 'Spice Route Catering', bookingDate: '2026-06-28', amount: 22000, method: 'Bank Transfer', status: 'paid', payoutDate: '2026-07-03' },
  { id: 'TXN-2026-007', customerName: 'Meera Reddy', customerInitials: 'MR', serviceName: 'Spice Route Catering', bookingDate: '2026-06-15', amount: 18000, method: 'UPI', status: 'refunded', payoutDate: '—' },
  { id: 'TXN-2026-008', customerName: 'Deepa Krishnan', customerInitials: 'DK', serviceName: 'Lens & Light Photography', bookingDate: '2026-06-10', amount: 32000, method: 'Credit Card', status: 'paid', payoutDate: '2026-06-15' },
  { id: 'TXN-2026-009', customerName: 'Mohammed Farhan', customerInitials: 'MF', serviceName: 'Grand Terrace Lounge', bookingDate: '2026-05-22', amount: 35000, method: 'Bank Transfer', status: 'paid', payoutDate: '2026-05-27' },
  { id: 'TXN-2026-010', customerName: 'Nisha Agarwal', customerInitials: 'NA', serviceName: 'Royal Palace Banquet Hall', bookingDate: '2026-05-10', amount: 55000, method: 'UPI', status: 'paid', payoutDate: '2026-05-15' },
]

const statusConfig: Record<PaymentStatus, { label: string; style: string; icon: typeof CheckCircle2 }> = {
  paid: { label: 'Paid', style: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  pending: { label: 'Pending', style: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
  refunded: { label: 'Refunded', style: 'bg-blue-50 text-blue-700 border-blue-200', icon: AlertTriangle },
}

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
const completedPayout = totalRevenue

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const statusTabs: Array<{ key: 'all' | PaymentStatus; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'paid', label: 'Paid' },
  { key: 'pending', label: 'Pending' },
  { key: 'refunded', label: 'Refunded' },
]

const dateRangeOptions = ['All Time', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months'] as const
const paymentMethodOptions = ['All Methods', 'UPI', 'Credit Card', 'Debit Card', 'Bank Transfer'] as const

export default function HostPaymentsPage() {
  const [activeStatus, setActiveStatus] = useState<'all' | PaymentStatus>('all')
  const [dateRange, setDateRange] = useState<string>('All Time')
  const [methodFilter, setMethodFilter] = useState<string>('All Methods')

  const filteredTransactions = transactions.filter((t) => {
    if (activeStatus !== 'all' && t.status !== activeStatus) return false
    if (methodFilter !== 'All Methods' && t.method !== methodFilter) return false
    return true
  })

  const statusCounts = {
    all: transactions.length,
    paid: transactions.filter((t) => t.status === 'paid').length,
    pending: transactions.filter((t) => t.status === 'pending').length,
    refunded: transactions.filter((t) => t.status === 'refunded').length,
  }

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
    .slice(0, 5)

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-12 sm:pb-10">
      {/* Header */}
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

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {[
          { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee },
          { label: 'Pending Payout', value: `₹${pendingPayout.toLocaleString('en-IN')}`, icon: Clock },
          { label: 'Completed Payout', value: `₹${completedPayout.toLocaleString('en-IN')}`, icon: CheckCircle2 },
          { label: 'Total Transactions', value: transactions.length, icon: Receipt },
        ].map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Icon size={18} className="text-gold-deep" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
                  {card.label}
                </span>
              </div>
              <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">{card.value}</span>
            </div>
          )
        })}
      </div>

      {/* Earnings Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
        {/* Line Chart — Monthly Earnings */}
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Monthly Earnings</h2>
            <div className="flex items-center gap-1.5 text-xs text-secondary-text">
              <TrendingUp size={14} className="text-emerald-600" />
              <span className="font-semibold text-emerald-600">+12%</span>
            </div>
          </div>
          <div className="relative h-[200px]">
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
                fill="none"
                stroke="#C89B2D"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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

        {/* Bar Chart — Revenue by Service */}
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Revenue by Service</h2>
          <div className="flex items-end gap-3 h-[200px]">
            {serviceRevenue.map((svc) => (
              <div key={svc.name} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold text-royal">
                  ₹{(svc.value / 1000).toFixed(0)}K
                </span>
                <div className="w-full flex justify-center">
                  <div
                    className="w-full max-w-[36px] rounded-t-md transition-all duration-500"
                    style={{
                      height: `${(svc.value / maxServiceRevenue) * 150}px`,
                      backgroundColor: svc.color,
                    }}
                  />
                </div>
                <span className="text-[9px] font-medium text-secondary-text text-center leading-tight">{svc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] overflow-hidden mb-6 sm:mb-8">
        <div className="px-6 sm:px-8 py-5 border-b border-black/5">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5">
                <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 sm:px-8 py-3.5 whitespace-nowrap">Transaction ID</th>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Customer</th>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Service</th>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Booking Date</th>
                <th className="text-right text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Amount</th>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Payment Method</th>
                <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Status</th>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 sm:pr-8 py-3.5 whitespace-nowrap">Payout Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => {
                const status = statusConfig[txn.status]
                const StatusIcon = status.icon
                return (
                  <tr key={txn.id} className="border-b border-black/5 last:border-0 hover:bg-ivory/30 transition-colors">
                    <td className="px-6 sm:px-8 py-3.5 align-middle whitespace-nowrap">
                      <span className="font-mono text-xs text-charcoal/70">{txn.id}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                          <span className="font-heading text-[10px] font-bold text-gold-deep">{txn.customerInitials}</span>
                        </div>
                        <span className="text-sm font-semibold text-royal">{txn.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 align-middle whitespace-nowrap">
                      <span className="text-sm text-charcoal">{txn.serviceName}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle whitespace-nowrap">
                      <span className="text-sm text-charcoal">{formatDate(txn.bookingDate)}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle text-right whitespace-nowrap">
                      <span className="text-sm font-semibold text-royal">₹{txn.amount.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle whitespace-nowrap">
                      <span className="text-sm text-charcoal">{txn.method}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${status.style}`}>
                        <StatusIcon size={10} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 sm:pr-8 py-3.5 align-middle whitespace-nowrap">
                      <span className="text-sm text-charcoal">{txn.payoutDate === '—' ? '—' : formatDate(txn.payoutDate)}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Recent Transactions</h2>
          <span className="text-xs text-secondary-text font-semibold">Last 5 payments</span>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((txn) => {
            const status = statusConfig[txn.status]
            const StatusIcon = status.icon
            return (
              <div key={txn.id} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="font-heading text-sm font-bold text-gold-deep">{txn.customerInitials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-semibold text-royal truncate">{txn.customerName}</h4>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${status.style}`}>
                      <StatusIcon size={8} />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-text truncate">{txn.serviceName}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-royal">₹{txn.amount.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-secondary-text">{formatDate(txn.bookingDate)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Payout Summary + Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
        {/* Payout Summary */}
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Payout Summary</h2>
          <div className="space-y-4">
            {[
              { label: 'Next Payout Date', value: 'Aug 01, 2026', icon: CalendarDays },
              { label: 'Amount Scheduled', value: `₹${pendingPayout.toLocaleString('en-IN')}`, icon: IndianRupee },
              { label: 'Last Payout', value: 'Jul 25, 2026', icon: CheckCircle2 },
              { label: 'Lifetime Earnings', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: TrendingUp },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-black/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Icon size={16} className="text-gold-deep" />
                    </div>
                    <span className="text-sm text-secondary-text">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-royal">{item.value}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Payment Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Bank Transfer', icon: Building2, desc: 'NEFT / RTGS' },
              { label: 'UPI', icon: Wallet, desc: 'GPay, PhonePe, Paytm' },
              { label: 'Debit/Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
            ].map((method) => {
              const Icon = method.icon
              return (
                <div key={method.label} className="bg-ivory/60 rounded-2xl border border-gold-deep/10 p-5 text-center hover:border-gold-deep/25 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-gold-deep" />
                  </div>
                  <h3 className="text-sm font-bold text-royal mb-1">{method.label}</h3>
                  <p className="text-[10px] text-secondary-text">{method.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Filters</h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="relative">
            <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-1.5 block">Date Range</label>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none w-full px-4 py-2.5 pr-9 rounded-xl border border-gold-deep/15 bg-white text-sm text-royal font-semibold focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors cursor-pointer"
              >
                {dateRangeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-1.5 block">Payment Method</label>
            <div className="relative">
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="appearance-none w-full px-4 py-2.5 pr-9 rounded-xl border border-gold-deep/15 bg-white text-sm text-royal font-semibold focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors cursor-pointer"
              >
                {paymentMethodOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-1.5 block">Status</label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {statusTabs.map((tab) => {
                const isActive = activeStatus === tab.key
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveStatus(tab.key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'bg-royal text-white shadow-[0_4px_16px_rgba(17,17,17,0.15)]'
                        : 'bg-white text-charcoal border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5'
                    }`}
                  >
                    {tab.label}
                    <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gold/10 text-gold-deep'
                    }`}>
                      {statusCounts[tab.key]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {filteredTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredTransactions.map((txn) => {
              const status = statusConfig[txn.status]
              const StatusIcon = status.icon
              return (
                <div key={txn.id} className="flex items-center gap-4 p-4 rounded-xl bg-ivory/40 border border-gold-deep/5 hover:border-gold-deep/15 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <span className="font-heading text-sm font-bold text-gold-deep">{txn.customerInitials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-semibold text-royal truncate">{txn.customerName}</h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${status.style}`}>
                        <StatusIcon size={8} />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-secondary-text truncate">{txn.serviceName} · {formatDate(txn.bookingDate)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-royal">₹{txn.amount.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-secondary-text">{txn.method}</p>
                  </div>
                  <ArrowRight size={14} className="text-secondary-text shrink-0 hidden sm:block" />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/20 mb-4">
              <Receipt size={24} className="text-gold-deep" />
            </div>
            <h3 className="font-heading text-lg font-bold text-royal">No transactions found</h3>
            <p className="text-secondary-text text-xs sm:text-sm mt-2 max-w-sm mx-auto">
              No transactions match your filter criteria. Try adjusting the filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
