import { useState } from 'react'
import { IndianRupee, Clock, CheckCircle2, Receipt, TrendingUp } from 'lucide-react'
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

export default function HostPaymentsPage() {
  const [dateRange, setDateRange] = useState('All Time')
  const [methodFilter, setMethodFilter] = useState('All Methods')
  const [statusFilter, setStatusFilter] = useState('All Status')

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
        <PaymentSummaryCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={IndianRupee} index={0} />
        <PaymentSummaryCard label="Pending Payout" value={`₹${pendingPayout.toLocaleString('en-IN')}`} icon={Clock} index={1} />
        <PaymentSummaryCard label="Completed Payout" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={CheckCircle2} index={2} />
        <PaymentSummaryCard label="Total Transactions" value={transactions.length} icon={Receipt} index={3} />
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
    </div>
  )
}
