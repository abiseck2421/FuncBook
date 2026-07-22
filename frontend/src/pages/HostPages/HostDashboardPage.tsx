import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus, ArrowRight, Eye, CalendarDays, IndianRupee,
  Star, Package, Clock, MapPin,
  Building2, UtensilsCrossed, Palette, BarChart3, Settings,
} from 'lucide-react'

const mockServices = [
  {
    id: 'svc-1',
    title: 'Royal Palace Banquet Hall',
    category: 'Function Hall',
    icon: Building2,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    city: 'Bangalore',
    price: 75000,
    status: 'active' as const,
    views: 1240,
    bookings: 18,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
  },
  {
    id: 'svc-2',
    title: 'Spice Route Catering',
    category: 'Catering',
    icon: UtensilsCrossed,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    city: 'Mumbai',
    price: 850,
    status: 'active' as const,
    views: 890,
    bookings: 32,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
  },
  {
    id: 'svc-3',
    title: 'Bloom & Bliss Decor',
    category: 'Decoration',
    icon: Palette,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    city: 'Delhi',
    price: 25000,
    status: 'draft' as const,
    views: 0,
    bookings: 0,
    rating: 0,
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop',
  },
]

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  draft: 'bg-amber-50 text-amber-700 border-amber-200',
  paused: 'bg-charcoal/10 text-charcoal/60 border-black/10',
}

export default function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'services'>('overview')

  const totalViews = mockServices.reduce((s, v) => s + v.views, 0)
  const totalBookings = mockServices.reduce((s, v) => s + v.bookings, 0)
  const activeServices = mockServices.filter(s => s.status === 'active').length

  return (
    <div className="min-h-screen bg-ivory pb-12">
      {/* Header */}
      <section className="">
        <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-royal leading-[1.08] tracking-tight">
                Host Dashboard
              </h1>
              <p className="mt-2 text-secondary-text text-base sm:text-lg">
                Manage your services, track bookings, and grow your business.
              </p>
            </div>
            <Link
              to="/host/add-service"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-500 shrink-0"
            >
              <Plus size={18} />
              Add New Service
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, change: '+12%', up: true },
            { label: 'Total Bookings', value: totalBookings.toString(), icon: CalendarDays, change: '+8%', up: true },
            { label: 'Active Services', value: activeServices.toString(), icon: Package, change: '', up: true },
            { label: 'Avg. Rating', value: '4.85', icon: Star, change: '+0.1', up: true },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Icon size={18} className="text-gold-deep" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">{stat.label}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">{stat.value}</span>
                  {stat.change && (
                    <span className={`text-xs font-semibold mb-1 ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-10">
        <div className="flex items-center gap-1 border-b border-black/10">
          {([
            { key: 'overview' as const, label: 'Overview' },
            { key: 'services' as const, label: 'My Services' },
          ]).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
                activeTab === tab.key ? 'text-royal' : 'text-secondary-text hover:text-charcoal'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-deep rounded-full" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  to="/host/add-service"
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-ivory/60 border border-gold-deep/10 hover:border-gold-deep/30 hover:bg-gold/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Plus size={22} className="text-gold-deep" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-royal">Add New Service</h3>
                    <p className="text-xs text-secondary-text mt-0.5">List a new service on FuncBook</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-secondary-text group-hover:text-gold-deep transition-colors" />
                </Link>
                <Link
                  to="/host/services"
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-ivory/60 border border-gold-deep/10 hover:border-gold-deep/30 hover:bg-gold/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <BarChart3 size={22} className="text-gold-deep" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-royal">View Analytics</h3>
                    <p className="text-xs text-secondary-text mt-0.5">Track views, bookings, and revenue</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-secondary-text group-hover:text-gold-deep transition-colors" />
                </Link>
                <div className="group flex items-center gap-4 p-5 rounded-2xl bg-ivory/60 border border-gold-deep/10 hover:border-gold-deep/30 hover:bg-gold/5 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Settings size={22} className="text-gold-deep" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-royal">Account Settings</h3>
                    <p className="text-xs text-secondary-text mt-0.5">Update your profile and preferences</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-secondary-text group-hover:text-gold-deep transition-colors" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { text: 'New booking request for Royal Palace Banquet Hall', time: '2 hours ago', icon: CalendarDays },
                  { text: 'Spice Route Catering received a 5-star review', time: '5 hours ago', icon: Star },
                  { text: 'Bloom & Bliss Decor was viewed 45 times today', time: '1 day ago', icon: Eye },
                ].map((activity, i) => {
                  const Icon = activity.icon
                  return (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-gold-deep" />
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
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-5">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">My Services</h2>
              <Link
                to="/host/add-service"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-deep text-white font-semibold text-sm hover:bg-royal transition-colors duration-300"
              >
                <Plus size={16} /> Add Service
              </Link>
            </div>

            {/* Service Cards */}
            {mockServices.map((svc) => {
              const Icon = svc.icon
              return (
                <div
                  key={svc.id}
                  className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden">
                      <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${svc.iconBg}`}>
                              <Icon size={14} className={svc.iconColor} />
                            </div>
                            <span className="text-xs font-semibold text-secondary-text">{svc.category}</span>
                          </div>
                          <h3 className="font-heading text-lg font-bold text-royal">{svc.title}</h3>
                          <p className="text-xs text-secondary-text mt-1 flex items-center gap-1">
                            <MapPin size={12} />
                            {svc.city}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[svc.status]}`}>
                          {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-5 mt-4 pt-4 border-t border-black/5 text-sm">
                        <div className="flex items-center gap-1.5 text-secondary-text">
                          <IndianRupee size={14} />
                          <span className="font-semibold text-royal">{svc.price.toLocaleString('en-IN')}</span>
                          <span>{svc.category === 'Catering' ? '/ plate' : '/ event'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-secondary-text">
                          <Eye size={14} />
                          <span>{svc.views} views</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-secondary-text">
                          <CalendarDays size={14} />
                          <span>{svc.bookings} bookings</span>
                        </div>
                        {svc.rating > 0 && (
                          <div className="flex items-center gap-1.5 text-secondary-text">
                            <Star size={14} className="fill-gold text-gold" />
                            <span className="font-semibold text-royal">{svc.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Empty-state hint */}
            {mockServices.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/20 mb-4">
                  <Package size={28} className="text-gold-deep" />
                </div>
                <h3 className="font-heading text-xl font-bold text-royal">No services yet</h3>
                <p className="text-secondary-text text-sm mt-2 max-w-sm mx-auto">
                  Start by adding your first service to receive bookings from customers.
                </p>
                <Link
                  to="/host/add-service"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold-deep text-white font-semibold text-sm mt-6 hover:bg-royal transition-colors"
                >
                  <Plus size={16} /> Add Your First Service
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
