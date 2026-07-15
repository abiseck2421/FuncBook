import { Link } from 'react-router-dom'
import {
  CalendarDays, CheckCircle2, Heart, IndianRupee,
  MapPin, Clock, ArrowRight, ChevronRight,
} from 'lucide-react'
import ServiceCard from '../../components/ServiceCard'
import { servicesByCategory } from '../../data/categories'
import { useWishlist } from '../../contexts/WishlistContext'

const customerName = 'Priya'

const upcomingBooking = {
  id: 'bk-1',
  serviceName: 'The Grand Ballroom',
  image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop',
  date: '2026-08-15',
  time: '6:00 PM',
  location: 'Downtown, City Center',
  status: 'confirmed' as const,
  price: 50000,
}

const recentBookings = [
  { id: 'bk-2', serviceName: 'Spice Route Catering', date: '2026-06-20', price: 17000, status: 'completed' as const },
  { id: 'bk-3', serviceName: 'Bloom & Bliss Decor', date: '2026-05-10', price: 25000, status: 'completed' as const },
  { id: 'bk-4', serviceName: 'StarLight Sound Systems', date: '2026-04-05', price: 12000, status: 'cancelled' as const },
]

const bookingStatusStyles: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  completed: 'bg-blue-50 text-blue-700 border-blue-200',
  cancelled: 'bg-charcoal/10 text-charcoal/60 border-black/10',
}

const defaultSavedServices = [
  servicesByCategory['function-halls'][3],
  servicesByCategory['catering'][0],
  servicesByCategory['photographers'][1],
  servicesByCategory['decoration'][2],
]

const recommendedServices = [
  servicesByCategory['djs'][0],
  servicesByCategory['makeup'][0],
  servicesByCategory['event-planners'][1],
  servicesByCategory['flower-decorators'][0],
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function CustomerDashboardPage() {
  const { wishlist } = useWishlist()
  const savedServices = wishlist.length > 0 ? wishlist : defaultSavedServices
  const savedCount = wishlist.length || 4
  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-8 sm:py-10">
      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          Dashboard
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
          Welcome back, {customerName}
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
          Manage your bookings and discover services for your next event.
        </p>
      </div>

      {/* Overview Cards */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-6 mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            { label: 'Upcoming Bookings', value: '2', icon: CalendarDays, to: '/customer/bookings' },
            { label: 'Completed Bookings', value: '8', icon: CheckCircle2, to: '/customer/bookings' },
            { label: 'Saved Services', value: String(savedCount), icon: Heart, to: '/customer/wishlist' },
            { label: 'Total Spent', value: '₹1.24L', icon: IndianRupee, to: '/customer/payment-history' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <Link
                key={stat.label}
                to={stat.to}
                className="group bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(184,134,11,0.1)] hover:border-gold-deep/25 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                    <Icon size={18} className="text-gold-deep" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
                    {stat.label}
                  </span>
                </div>
                <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">
                  {stat.value}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Upcoming Booking */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-6 mt-10">
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal mb-6">
            Upcoming Booking
          </h2>

          {upcomingBooking ? (
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
              <div className="w-full sm:w-56 h-40 sm:h-auto shrink-0 rounded-2xl overflow-hidden">
                <img
                  src={upcomingBooking.image}
                  alt={upcomingBooking.serviceName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-royal">
                      {upcomingBooking.serviceName}
                    </h3>
                    <span className={`inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-semibold border ${bookingStatusStyles[upcomingBooking.status]}`}>
                      {upcomingBooking.status.charAt(0).toUpperCase() + upcomingBooking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-text mt-1">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} className="text-gold-deep" />
                      {formatDate(upcomingBooking.date)} &middot; {upcomingBooking.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-gold-deep" />
                      {upcomingBooking.location}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-royal">
                      <IndianRupee size={14} />
                      {upcomingBooking.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <Link
                    to={`/checkout/${upcomingBooking.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-500"
                  >
                    View Details
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/20 mb-4">
                <CalendarDays size={28} className="text-gold-deep" />
              </div>
              <h3 className="font-heading text-xl font-bold text-royal">No upcoming bookings</h3>
              <p className="text-secondary-text text-sm mt-2 max-w-sm mx-auto">
                Browse our services and book your next event.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold-deep text-white font-semibold text-sm mt-6 hover:bg-royal transition-colors"
              >
                Browse Services
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Recent Bookings */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-6 mt-8">
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">
              Recent Bookings
            </h2>
            <Link
              to="/customer/bookings"
              className="text-sm font-semibold text-gold-deep hover:text-royal transition-colors flex items-center gap-1"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-ivory/60 border border-gold-deep/10 hover:border-gold-deep/30 hover:bg-gold/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <CalendarDays size={16} className="text-gold-deep" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-royal truncate">
                    {booking.serviceName}
                  </h4>
                  <p className="text-xs text-secondary-text mt-0.5 flex items-center gap-1.5">
                    <Clock size={12} />
                    {formatDate(booking.date)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-royal whitespace-nowrap">
                  ₹{booking.price.toLocaleString('en-IN')}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${bookingStatusStyles[booking.status]}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Saved Services */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-6 mt-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">
            Saved Services
          </h2>
          <Link
            to="/customer/wishlist"
            className="text-sm font-semibold text-gold-deep hover:text-royal transition-colors flex items-center gap-1"
          >
            View Wishlist
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {savedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Recommended for You */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-6 mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">
            Recommended for You
          </h2>
          <Link
            to="/services"
            className="text-sm font-semibold text-gold-deep hover:text-royal transition-colors flex items-center gap-1"
          >
            Explore All
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  )
}
