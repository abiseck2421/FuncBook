import { Star, MapPin, Users, Eye } from 'lucide-react'

const halls = [
  {
    name: 'Royal Grand Palace',
    location: 'Chennai',
    capacity: '500 Guests',
    rating: 5.0,
    price: 150000,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=500&fit=crop',
    reviews: 128,
  },
  {
    name: 'Crystal Convention Centre',
    location: 'Bangalore',
    capacity: '800 Guests',
    rating: 4.9,
    price: 200000,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=500&fit=crop',
    reviews: 215,
  },
  {
    name: 'The Golden Pearl Hall',
    location: 'Hyderabad',
    capacity: '350 Guests',
    rating: 4.8,
    price: 120000,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=500&fit=crop',
    reviews: 96,
  },
  {
    name: 'Emerald Garden Estate',
    location: 'Mumbai',
    capacity: '600 Guests',
    rating: 4.9,
    price: 250000,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=500&fit=crop',
    reviews: 183,
  },
]

export default function FeaturedHalls() {
  return (
    <section id="featured-halls" className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-12 sm:py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-4">
            Featured Venues
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-royal">
            Premium Function Halls
          </h2>
        </div>
        <a href="#" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-deep transition-colors group">
          View All
          <Eye size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {halls.map((hall) => (
          <a
            key={hall.name}
            href="#"
            className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)]"
          >
            <div className="relative sm:w-[280px] shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden">
              <img
                src={hall.image}
                alt={hall.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent sm:bg-gradient-to-t" />
            </div>

            <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-royal">{hall.name}</h3>

                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(hall.rating) ? 'fill-gold text-gold' : 'text-black/10'}
                    />
                  ))}
                  <span className="text-sm font-semibold text-royal ml-1">{hall.rating}</span>
                  <span className="text-xs text-secondary-text ml-1">({hall.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-sm text-secondary-text">
                    <MapPin size={14} className="text-gold" />
                    {hall.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-secondary-text">
                    <Users size={14} className="text-gold" />
                    {hall.capacity}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5">
                <div>
                  <p className="text-xs text-secondary-text">Starting from</p>
                  <p className="text-lg font-bold text-royal">₹{hall.price.toLocaleString()}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gold-deep text-white text-xs font-semibold hover:bg-royal transition-colors duration-300">
                  View Details
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
