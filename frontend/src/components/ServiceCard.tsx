import { useNavigate } from 'react-router-dom'
import { Heart, Star, BadgeCheck } from 'lucide-react'
import type { Service } from '../data/categories'
import { useWishlist } from '../contexts/WishlistContext'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(service.id)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/booking/${service.id}`)}
      className="group relative w-full overflow-hidden rounded-[18px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(service) }}
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

      <div className="p-3.5">
        <h3 className="font-heading text-[15px] font-bold text-royal truncate">{service.name}</h3>

        <p className="mt-1 text-[12px] leading-4.5 text-secondary-text truncate">
          {service.description ?? service.location}
        </p>

        <div className="mt-1.5 flex items-center gap-1">
          <Star size={13} className="fill-gold text-gold" />
          <span className="text-[13px] font-semibold text-royal">{service.rating}</span>
          <span className="text-[11px] text-secondary-text">({service.reviewCount})</span>
        </div>

        <div className="mt-1.5">
          <span className="text-[13px] font-bold text-royal">From ₹{service.price.toLocaleString()}</span>
        </div>

      </div>
    </div>
  )
}