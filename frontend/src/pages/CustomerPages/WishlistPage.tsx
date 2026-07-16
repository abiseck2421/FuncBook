import { Link } from 'react-router-dom'
import { Heart, Search } from 'lucide-react'
import { useWishlist } from '../../contexts/WishlistContext'
import ServiceCard from '../../components/ServiceCard'

export default function WishlistPage() {
  const { wishlist } = useWishlist()

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-6 pb-8 sm:pb-10">
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          My Wishlist
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
          My Wishlist
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
          Your saved services, all in one place
        </p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlist.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-8 sm:p-10 md:p-16 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/10 border border-gold/20 mb-4 sm:mb-5">
            <Heart size={24} className="text-gold-deep sm:hidden" />
            <Heart size={28} className="text-gold-deep hidden sm:block" />
          </div>
          <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-royal">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-secondary-text text-xs sm:text-sm max-w-sm mx-auto">
            Tap the heart icon on any service card to save it here for later.
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
