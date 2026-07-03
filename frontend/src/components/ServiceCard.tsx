import { useState } from 'react'
import { Heart, MapPin, Star, BadgeCheck } from 'lucide-react'
import type { Service } from '../data/categories'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [wishlisted, setWishlisted] = useState(false)

  return (
    <div className="group relative w-full bg-white rounded-[16px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-gold text-gold' : 'text-charcoal'}
          />
        </button>

        {service.verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-royal">
            <BadgeCheck size={12} className="text-gold" />
            Verified
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-heading text-base font-bold text-royal truncate">{service.name}</h3>

        <div className="mt-1 flex items-center gap-1 text-xs text-secondary-text">
          <MapPin size={12} />
          <span className="truncate">{service.location}</span>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <Star size={14} className="fill-gold text-gold" />
          <span className="text-sm font-semibold text-royal">{service.rating}</span>
          <span className="text-xs text-secondary-text">({service.reviewCount})</span>
        </div>

        <div className="mt-2">
          <span className="text-sm font-bold text-royal">From ₹{service.price.toLocaleString()}</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-medium text-charcoal bg-ivory rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
