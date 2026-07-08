import { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, IndianRupee, X } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import { categories, servicesByCategory } from '../data/categories'

const priceRanges = [
  { label: 'Any', min: 0, max: Infinity },
  { label: 'Under ₹10,000', min: 0, max: 10000 },
  { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
  { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { label: '₹50,000+', min: 50000, max: Infinity },
]

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const category = categories.find((c) => c.id === categoryId)
  const allServices = categoryId ? servicesByCategory[categoryId] ?? [] : []

  const [location, setLocation] = useState('')
  const [budgetIndex, setBudgetIndex] = useState(0)

  const locations = useMemo(() => {
    const set = new Set(allServices.map((s) => s.location))
    return Array.from(set).sort()
  }, [allServices])

  const filtered = useMemo(() => {
    return allServices.filter((s) => {
      if (location && s.location !== location) return false
      const range = priceRanges[budgetIndex]
      if (s.price < range.min || s.price > range.max) return false
      return true
    })
  }, [allServices, location, budgetIndex])

  const hasFilters = location || budgetIndex > 0

  if (!category) {
    return (
      <div className="pt-28 text-center">
        <h1 className="text-2xl font-bold text-royal">Category not found</h1>
        <Link to="/services" className="mt-4 inline-block text-gold-deep hover:underline">Back to Services</Link>
      </div>
    )
  }

  return (
    <div className="pt-22 sm:pt-28 pb-16">
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2">
              {category.name}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-royal">
              {category.name}
            </h1>
            <p className="mt-2 text-secondary-text max-w-lg">
              Browse all {category.name.toLowerCase()} — find the perfect match for your event.
            </p>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-deep text-white text-sm font-semibold shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-500 shrink-0"
          >
            <ArrowLeft size={16} />
            All Services
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 p-4 rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="relative flex-1 min-w-[200px]">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-black/10 text-sm text-royal bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 appearance-none cursor-pointer"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 min-w-[180px]">
            <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text" />
            <select
              value={budgetIndex}
              onChange={(e) => setBudgetIndex(Number(e.target.value))}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-black/10 text-sm text-royal bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 appearance-none cursor-pointer"
            >
              {priceRanges.map((r, i) => (
                <option key={i} value={i}>{r.label}</option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              onClick={() => { setLocation(''); setBudgetIndex(0) }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-black/10 text-sm text-secondary-text hover:text-royal hover:border-gold/40 transition-colors"
            >
              <X size={14} />
              Clear
            </button>
          )}

          <div className="flex items-center text-sm text-secondary-text">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-secondary-text text-lg">No services match your filters.</p>
            <button
              onClick={() => { setLocation(''); setBudgetIndex(0) }}
              className="mt-3 text-sm text-gold-deep hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
