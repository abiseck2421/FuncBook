import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Star, BadgeCheck } from 'lucide-react'
import type { Service } from '../data/categories'
import { useWishlist } from '../contexts/WishlistContext'
import WishlistModal from './WishlistModal'
import WishlistManageModal from './WishlistManageModal'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(service.id)
  const navigate = useNavigate()
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [manageModalOpen, setManageModalOpen] = useState(false)

  function handleHeartClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (wishlisted) {
      setManageModalOpen(true)
    } else {
      setSaveModalOpen(true)
    }
  }

  return (
    <>
      <div
        onClick={() => navigate(`/booking/${service.id}`)}
        className="group relative w-full overflow-hidden rounded-[18px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] cursor-pointer"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <button
            onClick={handleHeartClick}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart
              size={14}
              className={wishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal'}
            />
          </button>

          {service.verified && (
            <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-royal">
              <BadgeCheck size={10} className="text-gold" />
              Verified
            </div>
          )}
        </div>

        <div className="p-2.5">
          <h3 className="font-heading text-[13px] font-bold text-royal truncate">{service.name}</h3>

          <p className="mt-0.5 text-[11px] leading-4 text-secondary-text truncate">
            {service.description ?? service.location}
          </p>

          <div className="mt-1 flex items-center gap-1">
            <Star size={11} className="fill-gold text-gold" />
            <span className="text-[12px] font-semibold text-royal">{service.rating}</span>
            <span className="text-[10px] text-secondary-text">({service.reviewCount})</span>
          </div>

          <div className="mt-1">
            <span className="text-[12px] font-bold text-royal">From ₹{service.price.toLocaleString()}</span>
          </div>

        </div>
      </div>

      <WishlistModal
        service={service}
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
      />
      <WishlistManageModal
        service={service}
        isOpen={manageModalOpen}
        onClose={() => setManageModalOpen(false)}
      />
    </>
  )
}
