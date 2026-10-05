import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays, MapPin, IndianRupee, ChevronRight,
  CalendarCheck, CheckCircle2, XCircle, ArrowRight,
} from 'lucide-react'
import { cancelBooking, getBookings } from '../../data/bookings'
import type { Booking, BookingStatus } from '../../data/bookings'

const statusConfig: Record<BookingStatus, { label: string; style: string; icon: typeof CalendarDays }> = {
  upcoming: { label: 'Upcoming', style: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CalendarDays },
  completed: { label: 'Completed', style: 'bg-blue-50 text-blue-700 border-blue-200', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', style: 'bg-charcoal/10 text-charcoal/60 border-black/10', icon: XCircle },
}

const filterTabs: Array<{ key: 'all' | BookingStatus; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export function MyBookingsContent() {
  const [activeFilter, setActiveFilter] = useState<'all' | BookingStatus>('all')
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    setBookings(getBookings())
  }, [])

  const filteredBookings = activeFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === activeFilter)

  const counts = {
    all: bookings.length,
    upcoming: bookings.filter((b) => b.status === 'upcoming').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  }

  function handleCancel(id: string) {
    cancelBooking(id)
    setBookings(getBookings())
  }

  return (
    <div>
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-royal text-white shadow-[0_4px_16px_rgba(17,17,17,0.15)]'
                    : 'bg-white text-charcoal border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5'
                }`}
              >
                {tab.label}
                <span className={`inline-flex items-center justify-center min-w-[18px] sm:min-w-[22px] h-[18px] sm:h-[22px] px-1 sm:px-1.5 rounded-full text-[10px] sm:text-xs font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gold/10 text-gold-deep'
                }`}>
                  {counts[tab.key]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Booking Cards */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {filteredBookings.map((booking) => {
              const status = statusConfig[booking.status]
              const StatusIcon = status.icon
              const isUpcoming = booking.status === 'upcoming'

              return (
                <div
                  key={booking.id}
                  className="group bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-gold-deep/25 hover:shadow-[0_8px_32px_rgba(184,134,11,0.08)] transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative w-full sm:w-56 md:w-64 h-44 sm:h-auto shrink-0">
                      <img
                        src={booking.image}
                        alt={booking.serviceName}
                        className="w-full h-full object-cover"
                      />
                      {/* Mobile status badge on image */}
                      <span className={`absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border sm:hidden ${status.style}`}>
                        <StatusIcon size={10} />
                        {status.label}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        {/* Top row: name + status */}
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-royal leading-tight">
                            {booking.serviceName}
                          </h3>
                          <span className={`hidden sm:inline-flex items-center self-start gap-1 px-3 py-1 rounded-full text-xs font-semibold border shrink-0 ${status.style}`}>
                            <StatusIcon size={12} />
                            {status.label}
                          </span>
                        </div>

                        {/* Category */}
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-gold-deep mb-2 sm:mb-3">
                          {booking.category}
                        </p>

                        {/* Details — stacked on mobile, row on desktop */}
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 text-xs sm:text-sm text-secondary-text">
                          <span className="flex items-center gap-1.5">
                            <span className="text-[10px] sm:text-[11px] font-semibold text-charcoal/40">ID:</span>
                            <span className="font-mono text-[11px] sm:text-xs text-charcoal/70">{booking.id}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={12} className="text-gold-deep" />
                            {formatDate(booking.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-gold-deep" />
                            {booking.location}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-royal">
                            <IndianRupee size={12} />
                            {booking.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2.5 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-black/5">
                        <Link
                          to={`/service-details/${booking.serviceId}`}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gold-deep text-white font-semibold text-xs sm:text-sm shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
                        >
                          View Details
                          <ChevronRight size={14} />
                        </Link>

                        {isUpcoming && (
                          <button
                            type="button"
                            onClick={() => handleCancel(booking.id)}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-red-500 bg-red-50/80 border border-red-200/60 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
                          >
                            <XCircle size={14} />
                            <span className="hidden xs:inline">Cancel Booking</span>
                            <span className="xs:hidden">Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-8 sm:p-10 md:p-16 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/10 border border-gold/20 mb-4 sm:mb-5">
              <CalendarCheck size={24} className="text-gold-deep sm:hidden" />
              <CalendarCheck size={28} className="text-gold-deep hidden sm:block" />
            </div>
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-royal">
              No bookings found
            </h3>
            <p className="text-secondary-text text-xs sm:text-sm mt-2 max-w-sm mx-auto">
              {activeFilter === 'all'
                ? "You haven't made any bookings yet. Browse our services and book your first event."
                : `No ${activeFilter} bookings to show. Try a different filter.`}
            </p>
            <Link
              to="/all-services"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-xs sm:text-sm mt-5 sm:mt-6 shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
            >
              Browse Services
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
  )
}

export default function MyBookingsPage() {
  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-12 sm:pb-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
            My Bookings
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
            My Bookings
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
            View and manage all your service bookings
          </p>
        </div>

        <MyBookingsContent />
    </div>
  )
}