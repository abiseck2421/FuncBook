import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Search, ChevronDown, Trash2 } from 'lucide-react'
import { useWishlist } from '../../contexts/WishlistContext'
import ServiceCard from '../../components/ServiceCard'

export default function WishlistPage() {
  const { collections, totalSaved, removeFromCollection } = useWishlist()
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    collections.forEach((col) => { initial[col.id] = true })
    return initial
  })

  const nonEmpty = collections.filter((col) => col.services.length > 0)
  const isEmpty = totalSaved === 0

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-12 sm:pb-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          My Wishlist
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
          My Wishlist
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
          Your saved services, organized in collections
        </p>
      </div>

      {!isEmpty ? (
        <div className="space-y-6">
          {nonEmpty.map((col) => {
            const isOpen = expanded[col.id] !== false
            return (
              <div
                key={col.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] overflow-hidden"
              >
                {/* Collection header */}
                <button
                  type="button"
                  onClick={() => toggle(col.id)}
                  className="w-full flex items-center gap-3 px-5 sm:px-6 py-4 sm:py-5 hover:bg-ivory/40 transition-colors"
                >
                  <span className="text-xl shrink-0">{col.icon}</span>
                  <div className="flex-1 min-w-0 text-left">
                    <h2 className="font-heading text-lg sm:text-xl font-bold text-royal truncate">
                      {col.name}
                    </h2>
                    <p className="text-xs text-secondary-text mt-0.5">
                      {col.services.length} {col.services.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-charcoal/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Collection items */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-black/5 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {col.services.map((service) => (
                        <div key={service.id} className="relative group/card">
                          <ServiceCard service={service} />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFromCollection(service.id, col.id)
                            }}
                            className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/card:opacity-100 hover:bg-red-50 transition-all"
                            title="Remove from collection"
                          >
                            <Trash2 size={11} className="text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-8 sm:p-10 md:p-16 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/10 border border-gold/20 mb-4 sm:mb-5">
            <Heart size={24} className="text-gold-deep sm:hidden" />
            <Heart size={28} className="text-gold-deep hidden sm:block" />
          </div>
          <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-royal">
            Your Wishlist is Empty
          </h2>
          <p className="mt-2 text-secondary-text text-xs sm:text-sm max-w-sm mx-auto">
            Save your favorite services to access them quickly later.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-xs sm:text-sm mt-5 sm:mt-6 shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
          >
            <Search size={15} />
            Browse Services
          </Link>
        </div>
      )}
    </div>
  )
}
