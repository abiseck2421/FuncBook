import { useState } from 'react'
import {
  Eye, CalendarDays, IndianRupee, Star, Clock,
  XCircle, ArrowUpRight, TrendingUp, Package, Users, UserPlus,
  Repeat, AlertTriangle, Sparkles, ChevronDown,
  Building2, UtensilsCrossed, Camera, Music, Palette,
} from 'lucide-react'
import HostBookingStatusCard from '../../components/HostBookingStatusCard'
import HostTopServiceCard from '../../components/HostTopServiceCard'

const monthlyBookingsData = [
  { month: 'Aug', value: 18 },
  { month: 'Sep', value: 24 },
  { month: 'Oct', value: 20 },
  { month: 'Nov', value: 30 },
  { month: 'Dec', value: 28 },
  { month: 'Jan', value: 35 },
  { month: 'Feb', value: 22 },
  { month: 'Mar', value: 40 },
  { month: 'Apr', value: 32 },
  { month: 'May', value: 38 },
  { month: 'Jun', value: 42 },
  { month: 'Jul', value: 45 },
]

const monthlyRevenueData = [
  { month: 'Aug', value: 95000 },
  { month: 'Sep', value: 120000 },
  { month: 'Oct', value: 108000 },
  { month: 'Nov', value: 155000 },
  { month: 'Dec', value: 142000 },
  { month: 'Jan', value: 178000 },
  { month: 'Feb', value: 132000 },
  { month: 'Mar', value: 195000 },
  { month: 'Apr', value: 168000 },
  { month: 'May', value: 190000 },
  { month: 'Jun', value: 210000 },
  { month: 'Jul', value: 225000 },
]

const categoryPerformance = [
  { label: 'Venues', value: 35, color: '#C89B2D', icon: Building2 },
  { label: 'Photography', value: 20, color: '#0EA5E9', icon: Camera },
  { label: 'Catering', value: 25, color: '#10B981', icon: UtensilsCrossed },
  { label: 'Decoration', value: 12, color: '#F59E0B', icon: Palette },
  { label: 'Entertainment', value: 8, color: '#8B5CF6', icon: Music },
]

const bookingStatusData = [
  { label: 'Completed', count: 48, color: 'bg-emerald-500' },
  { label: 'Upcoming', count: 22, color: 'bg-sky-500' },
  { label: 'Pending', count: 8, color: 'bg-amber-500' },
  { label: 'Cancelled', count: 5, color: 'bg-red-500' },
]

const servicePerformance = [
  { name: 'Royal Palace Banquet Hall', category: 'Venue', views: 1240, bookings: 18, revenue: 1350000, rating: 4.8, conversion: '1.45%' },
  { name: 'Spice Route Catering', category: 'Catering', views: 890, bookings: 32, revenue: 960000, rating: 4.9, conversion: '3.60%' },
  { name: 'Bloom & Bliss Decor', category: 'Decoration', views: 645, bookings: 14, revenue: 350000, rating: 4.7, conversion: '2.17%' },
  { name: 'Grand Terrace Lounge', category: 'Venue', views: 520, bookings: 9, revenue: 675000, rating: 4.6, conversion: '1.73%' },
  { name: 'Saffron Kitchen Catering', category: 'Catering', views: 380, bookings: 21, revenue: 525000, rating: 4.8, conversion: '5.53%' },
  { name: 'Lens & Light Photography', category: 'Photography', views: 720, bookings: 15, revenue: 450000, rating: 4.9, conversion: '2.08%' },
]

const topServiceData = { name: 'Spice Route Catering', bookings: 32, revenue: 960000, rating: 4.9 }

const recentActivity = [
  { text: 'New booking received for Royal Palace Banquet Hall', time: '12 min ago', icon: CalendarDays, color: 'text-gold-deep', bg: 'bg-gold/10' },
  { text: 'Service "Bloom & Bliss Decor" was updated', time: '1 hour ago', icon: ArrowUpRight, color: 'text-sky-600', bg: 'bg-sky-50' },
  { text: 'New 5-star review added for Spice Route Catering', time: '3 hours ago', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
  { text: 'Booking #BK-1019 was cancelled by customer', time: '5 hours ago', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  { text: 'Payment of ₹75,000 received for BK-1024', time: '1 day ago', icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

const quickInsights = [
  { label: 'Best performing service', value: 'Spice Route Catering', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Peak booking day', value: 'Saturday', icon: CalendarDays, color: 'text-gold-deep', bg: 'bg-gold/10' },
  { label: 'Highest revenue category', value: 'Venues (₹20.25L)', icon: IndianRupee, color: 'text-sky-600', bg: 'bg-sky-50' },
  { label: 'Lowest performing category', value: 'Entertainment', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Suggested improvement', value: 'Add weekend pricing', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' },
]

const dateRangeOptions = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last Year'] as const

const maxBookings = Math.max(...monthlyBookingsData.map(d => d.value))
const maxRevenue = Math.max(...monthlyRevenueData.map(d => d.value))
const totalCategory = categoryPerformance.reduce((s, v) => s + v.value, 0)

export default function HostAnalyticsPage() {
  const [dateRange, setDateRange] = useState<string>('Last 30 Days')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const overviewStats = [
    { label: 'Total Views', value: '5,860', icon: Eye, change: '+14%', bg: 'bg-gold/10' },
    { label: 'Total Bookings', value: '147', icon: CalendarDays, change: '+9%', bg: 'bg-emerald-50' },
    { label: 'Active Listings', value: '12', icon: Package, change: '+2', bg: 'bg-sky-50' },
    { label: 'Total Revenue', value: '₹42.8L', icon: IndianRupee, change: '+18%', bg: 'bg-amber-50' },
    { label: 'Average Rating', value: '4.76', icon: Star, change: '+0.12', bg: 'bg-gold/10' },
    { label: 'Conversion Rate', value: '2.85%', icon: TrendingUp, change: '+0.4%', bg: 'bg-emerald-50' },
  ]

  const customerInsights = [
    { label: 'New Customers', value: '89', icon: UserPlus, change: '+22%', bg: 'bg-sky-50', color: 'text-sky-600' },
    { label: 'Returning Customers', value: '58', icon: Users, change: '+15%', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { label: 'Repeat Booking Rate', value: '39.5%', icon: Repeat, change: '+3.2%', bg: 'bg-amber-50', color: 'text-amber-600' },
  ]

  return (
    <div className="min-h-screen bg-ivory pb-12">
      {/* Header */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
              Insights
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-royal leading-[1.08] tracking-tight">
              Analytics
            </h1>
            <p className="mt-2 text-secondary-text text-base sm:text-lg">
              Monitor your service performance, bookings, and earnings at a glance.
            </p>
          </div>
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gold-deep/15 bg-white text-sm font-semibold text-royal hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors"
            >
              {dateRange}
              <ChevronDown size={14} className={`text-secondary-text transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 py-1.5 z-20">
                {dateRangeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { setDateRange(option); setDropdownOpen(false) }}
                    className={`flex w-full items-center px-3.5 py-2 text-xs transition-colors ${
                      dateRange === option ? 'text-gold-deep font-semibold bg-gold/5' : 'text-charcoal hover:bg-ivory/70'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {overviewStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon size={16} className="text-gold-deep" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-secondary-text leading-tight">{stat.label}</span>
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-royal">{stat.value}</span>
                  <span className="text-[10px] font-semibold mb-0.5 text-emerald-600">{stat.change}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Charts Row */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Bookings Bar Chart */}
          <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Monthly Bookings</h2>
              <div className="flex items-center gap-1.5 text-xs text-secondary-text">
                <TrendingUp size={14} className="text-emerald-600" />
                <span className="font-semibold text-emerald-600">+12%</span>
                <span>vs last year</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-[200px]">
              {monthlyBookingsData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-royal">{d.value}</span>
                  <div className="w-full flex justify-center">
                    <div
                      className="w-full max-w-[28px] rounded-t-md bg-gold-deep/80"
                      style={{ height: `${(d.value / maxBookings) * 150}px` }}
                    />
                  </div>
                  <span className="text-[9px] font-medium text-secondary-text">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Trend Line Chart */}
          <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Revenue Trend</h2>
              <div className="flex items-center gap-1.5 text-xs text-secondary-text">
                <TrendingUp size={14} className="text-emerald-600" />
                <span className="font-semibold text-emerald-600">+18%</span>
                <span>vs last year</span>
              </div>
            </div>
            <div className="relative h-[200px]">
              <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C89B2D" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#C89B2D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${monthlyRevenueData.map((d, i) => {
                    const x = (i / (monthlyRevenueData.length - 1)) * 660 + 20
                    const y = 190 - (d.value / maxRevenue) * 170
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                  }).join(' ')} L 680 190 L 20 190 Z`}
                  fill="url(#revGrad)"
                />
                <polyline
                  points={monthlyRevenueData.map((d, i) => {
                    const x = (i / (monthlyRevenueData.length - 1)) * 660 + 20
                    const y = 190 - (d.value / maxRevenue) * 170
                    return `${x},${y}`
                  }).join(' ')}
                  fill="none"
                  stroke="#C89B2D"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {monthlyRevenueData.map((d, i) => {
                  const x = (i / (monthlyRevenueData.length - 1)) * 660 + 20
                  const y = 190 - (d.value / maxRevenue) * 170
                  return <circle key={i} cx={x} cy={y} r="3.5" fill="white" stroke="#C89B2D" strokeWidth="2" />
                })}
              </svg>
              <div className="absolute bottom-0 inset-x-0 flex justify-between px-4">
                {monthlyRevenueData.map((d) => (
                  <span key={d.month} className="text-[9px] font-medium text-secondary-text">{d.month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Performance + Booking Status */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-stretch">
          {/* Category Donut */}
          <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 flex flex-col">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Category Performance</h2>
            <div className="flex-1 flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  {categoryPerformance.reduce<{ offset: number; segments: { dash: number; stroke: string }[] }>((acc, cat) => {
                    const pct = (cat.value / totalCategory) * 100
                    acc.segments.push({ dash: pct, stroke: cat.color })
                    acc.offset += pct
                    return acc
                  }, { offset: 0, segments: [] }).segments.reduce<{ offset: number; result: { offset: number; dash: number; stroke: string }[] }>((acc, seg) => {
                    acc.result.push({ ...seg, offset: acc.offset })
                    acc.offset += seg.dash
                    return acc
                  }, { offset: 0, result: [] }).result.map((seg, i) => (
                    <circle key={i} cx="18" cy="18" r="15.9155" fill="none" stroke={seg.stroke} strokeWidth="3.5"
                      strokeDasharray={`${seg.dash} ${100 - seg.dash}`} strokeDashoffset={`${-seg.offset}`} />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-royal">{totalCategory}%</span>
                  <span className="text-[10px] text-secondary-text uppercase tracking-wider">Split</span>
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              {categoryPerformance.map((cat) => {
                const Icon = cat.icon
                return (
                  <div key={cat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <Icon size={13} className="text-secondary-text" />
                      <span className="text-sm text-charcoal">{cat.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-royal">{cat.value}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Booking Status */}
          <div className="flex">
            <HostBookingStatusCard data={bookingStatusData} className="flex-1" />
          </div>
        </div>
      </section>

      {/* Service Performance Table */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-black/5">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Top Performing Services</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 sm:px-8 py-3.5 whitespace-nowrap">Service</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Category</th>
                  <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Views</th>
                  <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Bookings</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Revenue</th>
                  <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 py-3.5 whitespace-nowrap">Rating</th>
                  <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-6 sm:pr-8 py-3.5 whitespace-nowrap">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {servicePerformance.map((svc, i) => (
                  <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-ivory/30 transition-colors">
                    <td className="px-6 sm:px-8 py-3.5 align-middle whitespace-nowrap">
                      <span className="text-sm font-semibold text-royal">{svc.name}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle whitespace-nowrap">
                      <span className="text-sm text-charcoal">{svc.category}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                      <span className="text-sm text-charcoal">{svc.views.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                      <span className="text-sm font-semibold text-royal">{svc.bookings}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle text-right whitespace-nowrap">
                      <span className="text-sm font-semibold text-royal">₹{svc.revenue.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <Star size={13} className="fill-gold text-gold" />
                        <span className="text-sm font-semibold text-royal">{svc.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 sm:pr-8 py-3.5 align-middle text-center whitespace-nowrap">
                      <span className="text-sm font-semibold text-emerald-600">{svc.conversion}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Customer Insights */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Customer Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {customerInsights.map((insight) => {
              const Icon = insight.icon
              return (
                <div key={insight.label} className="bg-ivory/60 rounded-2xl border border-gold-deep/10 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl ${insight.bg} flex items-center justify-center`}>
                      <Icon size={16} className={insight.color} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text">{insight.label}</span>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className="font-heading text-2xl font-bold text-royal">{insight.value}</span>
                    <span className="text-[11px] font-semibold mb-0.5 text-emerald-600">{insight.change}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Top Service + Quick Insights */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <HostTopServiceCard {...topServiceData} />
          </div>

          {/* Quick Insights */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-gold-deep" />
              <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Quick Insights</h2>
            </div>
            <div className="space-y-4">
              {quickInsights.map((insight, i) => {
                const Icon = insight.icon
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${insight.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon size={14} className={insight.color} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-secondary-text uppercase tracking-wider">{insight.label}</p>
                      <p className="text-sm font-semibold text-royal mt-0.5">{insight.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon
              return (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
                  <div className={`w-10 h-10 rounded-xl ${activity.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={16} className={activity.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-charcoal truncate">{activity.text}</p>
                    <p className="text-xs text-secondary-text mt-0.5 flex items-center gap-1.5">
                      <Clock size={12} />
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer Summary */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <div className="text-center">
              <p className="text-xs text-secondary-text uppercase tracking-wider mb-1">Total Revenue</p>
              <p className="font-heading text-xl sm:text-2xl font-bold text-royal">₹42.8L</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">+18% growth</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-secondary-text uppercase tracking-wider mb-1">Total Bookings</p>
              <p className="font-heading text-xl sm:text-2xl font-bold text-royal">147</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">+9% growth</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-secondary-text uppercase tracking-wider mb-1">Average Rating</p>
              <div className="flex items-center justify-center gap-1.5">
                <Star size={18} className="fill-gold text-gold" />
                <p className="font-heading text-xl sm:text-2xl font-bold text-royal">4.76</p>
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">+0.12 this month</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-secondary-text uppercase tracking-wider mb-1">Overall Growth</p>
              <div className="flex items-center justify-center gap-1.5">
                <TrendingUp size={18} className="text-emerald-600" />
                <p className="font-heading text-xl sm:text-2xl font-bold text-royal">+15.2%</p>
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">Strong performance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
