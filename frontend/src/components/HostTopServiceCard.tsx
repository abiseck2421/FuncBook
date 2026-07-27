import { Star, TrendingUp } from 'lucide-react'

interface TopServiceCardProps {
  name: string
  bookings: number
  revenue: number
  rating: number
}

function formatRevenue(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`
  return `₹${value}`
}

export default function HostTopServiceCard({ name, bookings, revenue, rating }: TopServiceCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
      <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Top Performing Service</h2>

      <div className="bg-ivory/60 rounded-2xl border border-gold-deep/10 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
            <TrendingUp size={20} className="text-gold-deep" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg font-bold text-royal">{name}</h3>
            <p className="text-xs text-secondary-text mt-0.5">Best performing service this month</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-gold-deep/10">
          <div>
            <p className="text-xs text-secondary-text uppercase tracking-wider mb-1">Bookings</p>
            <p className="font-heading text-xl font-bold text-royal">{bookings}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-text uppercase tracking-wider mb-1">Revenue</p>
            <p className="font-heading text-xl font-bold text-royal">{formatRevenue(revenue)}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-text uppercase tracking-wider mb-1">Rating</p>
            <div className="flex items-center gap-1.5">
              <Star size={16} className="fill-gold text-gold" />
              <p className="font-heading text-xl font-bold text-royal">{rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
