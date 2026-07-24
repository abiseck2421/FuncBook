import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus, Eye, IndianRupee, Star, Package,
  Building2, UtensilsCrossed, Palette, Music, Sparkles, Camera,
  Armchair, MoreHorizontal, Pencil, Trash2,
} from 'lucide-react'
import { getHostServices, deleteHostService } from '../../data/hostServices'
import type { Service } from '../../data/categories'

const categoryMeta: Record<string, { icon: typeof Building2; bg: string; color: string; label: string }> = {
  'function-halls': { icon: Building2, bg: 'bg-amber-50', color: 'text-amber-600', label: 'Function Hall' },
  catering: { icon: UtensilsCrossed, bg: 'bg-orange-50', color: 'text-orange-600', label: 'Catering' },
  decoration: { icon: Palette, bg: 'bg-rose-50', color: 'text-rose-600', label: 'Decoration' },
  'lighting-sound': { icon: Music, bg: 'bg-violet-50', color: 'text-violet-600', label: 'Lighting & Sound' },
  makeup: { icon: Sparkles, bg: 'bg-pink-50', color: 'text-pink-600', label: 'Makeup Artist' },
  photographers: { icon: Camera, bg: 'bg-sky-50', color: 'text-sky-600', label: 'Photographer' },
  'chairs-furniture': { icon: Armchair, bg: 'bg-stone-50', color: 'text-stone-600', label: 'Chairs & Rentals' },
  'event-planners': { icon: Package, bg: 'bg-indigo-50', color: 'text-indigo-600', label: 'Event Planning' },
}

function getCategoryInfo(categoryId?: string) {
  if (!categoryId) return categoryMeta['event-planners']
  return categoryMeta[categoryId] || categoryMeta['event-planners']
}

export default function HostServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(getHostServices())
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const handleDelete = (id: string) => {
    deleteHostService(id)
    setServices(prev => prev.filter(s => s.id !== id))
    setDeleteId(null)
    setMenuOpen(null)
  }

  const totalServices = services.length
  const totalValue = services.reduce((sum, s) => sum + (s.price || 0), 0)

  if (loading) {
    return (
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
        <div className="mb-8">
          <div className="h-4 w-24 rounded-full bg-gold/15 mb-3" />
          <div className="h-10 w-64 rounded-2xl bg-charcoal/5 mb-3" />
          <div className="h-4 w-80 rounded-full bg-charcoal/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-3xl border border-gold-deep/10 overflow-hidden animate-pulse">
              <div className="h-44 bg-charcoal/5" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded-full bg-charcoal/5" />
                <div className="h-3 w-1/2 rounded-full bg-charcoal/5" />
                <div className="h-3 w-full rounded-full bg-charcoal/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          Manage
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
              My Services
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
              View, edit, and manage all your listed services in one place.
            </p>
          </div>
          <Link
            to="/host/add-service"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-500 shrink-0"
          >
            <Plus size={18} />
            Add New Service
          </Link>
        </div>
      </div>

      {/* Stats */}
      {totalServices > 0 && (
        <section className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              { label: 'Total Services', value: totalServices.toString(), icon: Package },
              { label: 'Active Listings', value: totalServices.toString(), icon: Eye },
              { label: 'Total Value', value: `₹${totalValue.toLocaleString('en-IN')}`, icon: IndianRupee },
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
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">{stat.value}</span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Service Cards */}
      {totalServices > 0 ? (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {services.map((service) => {
              const cat = getCategoryInfo(service.categoryId)
              const Icon = cat.icon
              return (
                <div
                  key={service.id}
                  className="group relative w-full overflow-hidden rounded-[18px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] transition-all duration-500"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Menu Button */}
                    <button
                      type="button"
                      onClick={() => setMenuOpen(menuOpen === service.id ? null : service.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <MoreHorizontal size={14} className="text-charcoal" />
                    </button>
                    {menuOpen === service.id && (
                      <div className="absolute right-2 mt-1 w-40 rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 py-1.5 z-20">
                        <Link
                          to={`/host/add-service`}
                          onClick={() => setMenuOpen(null)}
                          className="flex items-center gap-2 px-3.5 py-2 text-xs text-charcoal hover:bg-ivory/70 transition-colors"
                        >
                          <Pencil size={12} className="text-secondary-text" />
                          Edit Service
                        </Link>
                        <button
                          type="button"
                          onClick={() => { setDeleteId(service.id); setMenuOpen(null) }}
                          className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-red-600 hover:bg-red-50/60 transition-colors"
                        >
                          <Trash2 size={12} />
                          Delete Service
                        </button>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute bottom-2 left-2">
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${cat.bg} ${cat.color} text-[10px] font-semibold backdrop-blur-sm`}>
                        <Icon size={10} />
                        {cat.label}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2.5">
                    <h3 className="font-heading text-[13px] font-bold text-royal truncate">
                      {service.name}
                    </h3>

                    <p className="mt-0.5 text-[11px] leading-4 text-secondary-text truncate">
                      {service.location}
                    </p>

                    {service.tags && service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-px rounded-full bg-ivory border border-gold-deep/10 text-[9px] font-medium text-charcoal"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="fill-gold text-gold" />
                        <span className="text-[12px] font-semibold text-royal">
                          {service.rating > 0 ? service.rating : '—'}
                        </span>
                        {service.reviewCount > 0 && (
                          <span className="text-[10px] text-secondary-text">
                            ({service.reviewCount})
                          </span>
                        )}
                      </div>
                      <span className="text-[12px] font-bold text-royal">
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ) : (
        /* Empty State */
        <section>
          <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Package size={32} className="text-gold-deep" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-royal">
              No services yet
            </h3>
            <p className="mt-3 text-secondary-text text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Start by adding your first service to receive bookings from thousands of customers on FuncBook.
            </p>
            <Link
              to="/host/add-service"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-500 mt-8"
            >
              <Plus size={18} />
              Add Your First Service
            </Link>
          </div>
        </section>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.15)] p-6 sm:p-8 max-w-md w-full animate-slide-in">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-200/60 mb-5">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal">
              Delete Service?
            </h3>
            <p className="mt-2 text-sm text-secondary-text leading-relaxed">
              This action cannot be undone. The service will be permanently removed from your listings.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 px-5 py-3 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-5 py-3 rounded-2xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
