import { useState, useMemo, useRef } from 'react'
import { useParams, useNavigate, Link, useOutletContext } from 'react-router-dom'
import {
  ArrowLeft, Star, BadgeCheck, CalendarCheck, Calendar, MapPin, IndianRupee, Users,
  X, ChevronLeft, ChevronRight, Heart, Clock, Wifi, Car, Snowflake,
  Sun, LampDesk, Monitor, UtensilsCrossed,
  Building2, Shield, MessageCircle, ChevronDown, Check,
  Phone, Globe,
} from 'lucide-react'
import ServiceCard from '../../components/ServiceCard'
import { servicesByCategory, categoryGalleries } from '../../data/categories'
import type { Service, Review } from '../../data/categories'
import { getHostServices, mergeServices } from '../../data/hostServices'
import { useWishlist } from '../../contexts/WishlistContext'

function findService(serviceId: string) {
  for (const cid in servicesByCategory) {
    const found = servicesByCategory[cid].find((s) => s.id === serviceId)
    if (found) return { ...found, categoryId: cid }
  }
  const hostServices = getHostServices()
  const hostFound = hostServices.find((s) => s.id === serviceId)
  if (hostFound) return { ...hostFound, categoryId: hostFound.categoryId || 'event-planners' }
  return null
}

const categoryNames: Record<string, string> = {
  'function-halls': 'Function Halls',
  catering: 'Catering',
  decoration: 'Decoration Setups',
  'lighting-sound': 'Lighting & Sound',
  makeup: 'Makeup Artists',
  photographers: 'Photographers',
  'chairs-furniture': 'Chairs & Furniture',
  'event-planners': 'Event Planners',
  djs: 'DJs',
  'flower-decorators': 'Flower Decorators',
}

function generateMockData(service: Service & { categoryId?: string }) {
  const city = service.location.split(',')[0] || service.location

  return {
    capacity: service.tags.includes('500 Guests') ? '500 Guests' : '100–500 Guests',
    serviceArea: `${city} & surrounding areas`,
    workingHours: 'Mon–Sun: 9:00 AM – 10:00 PM',
    contactAvailable: '24/7 via phone & email',
    languages: ['English', 'Hindi', service.location.includes('Chennai') ? 'Tamil' : service.location.includes('Bangalore') ? 'Kannada' : service.location.includes('Hyderabad') ? 'Telugu' : 'English'],
    amenities: ['Parking', 'AC', 'Generator Backup', 'Dining Hall', 'Bridal Room', 'WiFi', 'CCTV', 'Stage', 'Lighting', 'Wheelchair Accessible'],
    availableDates: ['2026-07-15', '2026-07-20', '2026-07-25', '2026-08-01', '2026-08-10', '2026-08-18', '2026-09-05', '2026-09-12'],
    bookedDates: ['2026-07-10', '2026-07-18', '2026-07-28', '2026-08-05', '2026-08-22'],
    reviews: [
      { id: 'r1', name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', rating: 5, date: '2 weeks ago', comment: 'Absolutely stunning venue! Everything was perfect from the decor to the service. Highly recommend for any special occasion.', photos: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=150&fit=crop'] },
      { id: 'r2', name: 'Rahul Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', rating: 5, date: '1 month ago', comment: 'We booked our annual corporate gala here. The team was incredibly professional and the setup was magnificent.' },
      { id: 'r3', name: 'Ananya Patel', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', rating: 4, date: '2 months ago', comment: 'Beautiful location and great service. The staff was very accommodating to our needs. Would definitely book again.', photos: ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200&h=150&fit=crop', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=150&fit=crop'] },
      { id: 'r4', name: 'Vikram Singh', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face', rating: 5, date: '3 months ago', comment: 'Exceptional venue! The transparency in pricing and quality of service truly sets this place apart.' },
      { id: 'r5', name: 'Neha Gupta', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face', rating: 4, date: '3 months ago', comment: 'Great experience overall. The venue was well-maintained and the food was delicious.' },
    ] as Review[],
    vendor: {
      name: `${service.name} Management`,
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
      verified: service.verified,
      experience: '8+ years',
      completedBookings: 350,
      responseTime: 'Within 1 hour',
    },
    address: `${service.location}, ${city}`,
    landmarks: ['City Metro Station (0.5 km)', 'Central Mall (1.2 km)', 'Grand Hotel (2 km)'],
    faqs: [
      { q: 'What is the booking process?', a: 'Simply select your preferred package, choose an available date, and confirm your booking with a 25% advance payment. Our team will handle the rest.' },
      { q: 'Can I visit the venue before booking?', a: 'Absolutely! We encourage site visits. Contact us to schedule a free walkthrough at your convenience.' },
      { q: 'What is the cancellation policy?', a: 'Free cancellation up to 15 days before the event. 50% refund for cancellations between 7–15 days. No refund within 7 days.' },
      { q: 'Do you provide in-house catering?', a: 'Yes, we offer in-house catering with customizable menus. Outside vendors are also allowed with a nominal fee.' },
      { q: 'Is parking available for guests?', a: 'Yes, complimentary valet parking is available for up to 100 vehicles.' },
    ],
    experience: `With over 8 years of experience in the event industry, ${service.name} has hosted hundreds of successful events ranging from intimate gatherings to grand celebrations.`,
    whyChoose: ['Prime location with easy access', 'Experienced and dedicated team', 'Premium quality and attention to detail', 'Flexible packages to suit your budget', '24/7 customer support'],
  }
}

const amenityKeyIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Parking: Car,
  AC: Snowflake,
  'Generator Backup': Sun,
  'Dining Hall': UtensilsCrossed,
  'Bridal Room': Heart,
  WiFi: Wifi,
  CCTV: Monitor,
  Stage: Building2,
  Lighting: LampDesk,
  'Wheelchair Accessible': Users,
}

export default function BookingPage() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()
  const { setAuthModalOpen, setAuthRedirectPath } = useOutletContext<{
    authModalOpen: boolean
    setAuthModalOpen: (open: boolean) => void
    handleAuthSuccess: (email: string) => void
    setAuthRedirectPath: (path: string | null) => void
  }>()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [guestCount, setGuestCount] = useState(100)
  const dateInputRef = useRef<HTMLInputElement>(null)
  const { toggleWishlist, isWishlisted } = useWishlist()

  const service = useMemo(() => {
    if (!serviceId) return null
    return findService(serviceId)
  }, [serviceId])

  const mock = useMemo(() => service ? generateMockData(service) : null, [service])

  const gallery = useMemo(() => {
    if (!service) return []
    const catGallery = categoryGalleries[service.categoryId || ''] || []
    const all = [service.image, ...catGallery.filter((img) => img !== service.image)]
    return all.slice(0, 8)
  }, [service])

  const similarServices = useMemo(() => {
    if (!service || !service.categoryId) return []
    const merged = mergeServices(servicesByCategory)
    return merged[service.categoryId]
      ?.filter((s) => s.id !== service.id)
      ?.slice(0, 4) ?? []
  }, [service])

  if (!service || !mock) {
    return (
      <div className="pt-28 text-center">
        <h1 className="text-2xl font-bold text-royal">Service not found</h1>
        <Link to="/services" className="mt-4 inline-block text-gold-deep hover:underline">Back to Services</Link>
      </div>
    )
  }

  return (
    <div className="pb-16">
      <div className="pt-28 pb-6 px-6">
        <div className="w-full max-w-[min(95%,1400px)] mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ivory border border-gold-deep/10 text-charcoal text-sm font-semibold hover:bg-gold-deep/10 transition-all duration-300 mb-6"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold-deep text-[11px] font-semibold uppercase tracking-wide">
              {categoryNames[service.categoryId || ''] || 'Service'}
            </span>
            {service.verified && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gold-deep/10 text-gold-deep text-[11px] font-semibold">
                <BadgeCheck size={12} />
                Verified
              </span>
            )}
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-royal leading-tight">
            {service.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-secondary-text text-sm">
            <div className="flex items-center gap-1.5">
              <Star size={15} className="fill-gold text-gold" />
              <span className="font-semibold text-royal">{service.rating}</span>
              <span>({service.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              {service.location}
            </div>
            <div className="flex items-center gap-1.5">
              <IndianRupee size={14} />
              <span className="font-semibold text-royal">₹{service.price.toLocaleString()}</span>
              <span className="text-secondary-text">starting</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6">
        <div className="w-full max-w-[min(95%,1400px)] mx-auto">
          <div className="rounded-2xl overflow-hidden bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-3">
            <div className="flex flex-col lg:flex-row gap-3">
              <div
                className="relative rounded-[18px] overflow-hidden cursor-pointer group lg:w-[65%] h-[300px] sm:h-[400px] lg:h-[500px]"
                onClick={() => setLightboxIndex(0)}
              >
                <img
                  src={gallery[0]}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="lg:w-[35%] grid grid-cols-2 gap-3">
                {gallery.slice(1, 5).map((img, i) => {
                  const imageIndex = i + 1
                  const isLastSmallImage = i === 3
                  const hasMoreImages = gallery.length > 5
                  return (
                    <div
                      key={imageIndex}
                      className="relative rounded-[18px] overflow-hidden cursor-pointer group aspect-square"
                      onClick={() => setLightboxIndex(imageIndex)}
                    >
                      <img
                        src={img}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      {isLastSmallImage && hasMoreImages && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-1 transition-colors duration-300 hover:bg-black/60">
                          <span className="text-white text-2xl sm:text-3xl font-bold">
                            +{gallery.length - 5}
                          </span>
                          <span className="text-white/90 text-[11px] sm:text-xs font-medium tracking-wide">
                            View All Photos
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 mt-8">
        <div className="w-full max-w-[min(95%,1400px)] mx-auto space-y-8">
          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">About This Service</h2>
            <p className="mt-4 text-sm text-charcoal leading-relaxed">{service.description}</p>
            <p className="mt-3 text-sm text-charcoal leading-relaxed">{mock.experience}</p>
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-royal">Why Choose {service.name}</h3>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {mock.whyChoose.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
                    <Check size={15} className="text-gold-deep mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">Service Information</h2>
            <div className="mt-5 space-y-3">
              {[
                { label: 'Category', value: categoryNames[service.categoryId || ''] || 'Service', icon: Building2 },
                { label: 'Capacity', value: mock.capacity, icon: Users },
                { label: 'Service Area', value: mock.serviceArea, icon: MapPin },
                { label: 'Working Hours', value: mock.workingHours, icon: Clock },
                { label: 'Contact', value: mock.contactAvailable, icon: Phone },
                { label: 'Languages', value: mock.languages.join(', '), icon: Globe },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-ivory/60 border border-gold-deep/10">
                    <Icon size={20} className="text-gold-deep shrink-0" />
                    <div>
                      <p className="text-[10px] font-semibold text-royal uppercase tracking-wide">{item.label}</p>
                      <p className="mt-0.5 text-sm text-charcoal">{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">Amenities & Features</h2>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {mock.amenities.map((amenity) => {
                const Icon = amenityKeyIcons[amenity] || Shield
                return (
                  <div key={amenity} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-ivory/60 border border-gold-deep/10 hover:border-gold-deep/30 transition-colors duration-300">
                    <Icon size={22} className="text-gold-deep" />
                    <span className="text-[11px] font-medium text-charcoal text-center">{amenity}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">Availability</h2>
            <div className="mt-5 flex flex-col sm:flex-row gap-8 sm:gap-16 items-start">
              <div className="w-full sm:w-[220px] flex-shrink-0">
                <p className="text-sm text-secondary-text mb-2">Select your preferred event date</p>
                <div className="relative w-full">
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border border-gold-deep/15 bg-ivory/50 pl-4 pr-10 py-3 text-base text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (dateInputRef.current) {
                        ;(dateInputRef.current as any).showPicker?.() || dateInputRef.current.focus()
                      }
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-deep hover:text-gold transition-colors cursor-pointer"
                  >
                    <Calendar size={18} />
                  </button>
                </div>
              </div>
              <div className="hidden sm:block w-px bg-gold-deep/10 min-h-[120px]"></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-royal mb-3">Upcoming Available Dates</h3>
                <div className="flex flex-wrap gap-4">
                  {mock.availableDates.map((d) => {
                    const booked = mock.bookedDates.includes(d)
                    const selected = d === selectedDate
                    return (
                      <button
                        key={d}
                        onClick={() => !booked && setSelectedDate(d)}
                        disabled={booked}
                        className={`min-w-[100px] px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 ${selected ? 'bg-gold-deep text-white shadow-[0_4px_12px_rgba(184,134,11,0.2)]' : booked ? 'bg-red-50 text-red-400 line-through cursor-not-allowed border border-red-200' : 'bg-ivory text-gray-500 hover:border-gold-deep/30 border border-gold-deep/10 cursor-pointer'}`}
                      >
                        {new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {booked && <span className="ml-1 text-xs">Booked</span>}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-secondary-text">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-ivory border border-gold-deep/10" /> Available</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-50 border border-red-200" /> Booked</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gold-deep" /> Selected</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">Customer Reviews</h2>
            <div className="mt-5 flex flex-wrap items-start gap-6 p-5 rounded-xl bg-ivory/60 border border-gold-deep/10">
              <div className="text-center">
                <div className="text-4xl font-bold text-royal">{service.rating}</div>
                <div className="mt-1 flex items-center justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className={s <= Math.round(service.rating) ? 'fill-gold text-gold' : 'text-gray-300'} />
                  ))}
                </div>
                <div className="mt-1 text-xs text-secondary-text">{service.reviewCount} reviews</div>
              </div>
              <div className="flex-1 space-y-1.5 min-w-[200px]">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = mock.reviews.filter((r) => Math.round(r.rating) === star).length
                  const pct = (count / mock.reviews.length) * 100
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-8 text-secondary-text">{star} star</span>
                      <div className="flex-1 h-2 rounded-full bg-ivory border border-gold-deep/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-6 text-secondary-text text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {mock.reviews.map((review) => (
                <div key={review.id} className="p-5 rounded-xl border border-gold-deep/10 hover:border-gold-deep/20 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <img src={review.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-royal">{review.name}</h4>
                        <span className="text-[10px] text-secondary-text shrink-0">{review.date}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={11} className={s <= review.rating ? 'fill-gold text-gold' : 'text-gray-300'} />
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-charcoal leading-relaxed">{review.comment}</p>
                      {review.photos && review.photos.length > 0 && (
                        <div className="mt-2 flex gap-1.5">
                          {review.photos.map((p, j) => (
                            <img key={j} src={p} alt="" className="w-16 h-12 rounded-lg object-cover" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">Vendor Profile</h2>
            <div className="mt-5 flex flex-col sm:flex-row items-start gap-5 p-5 rounded-xl bg-ivory/60 border border-gold-deep/10">
              <img src={mock.vendor.photo} alt="" className="w-16 h-16 rounded-2xl object-cover shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-lg font-bold text-royal">{mock.vendor.name}</h3>
                  {mock.vendor.verified && <BadgeCheck size={16} className="text-gold" />}
                </div>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div><p className="text-[10px] font-semibold text-royal uppercase">Experience</p><p className="text-sm text-charcoal">{mock.vendor.experience}</p></div>
                  <div><p className="text-[10px] font-semibold text-royal uppercase">Bookings</p><p className="text-sm text-charcoal">{mock.vendor.completedBookings}+</p></div>
                  <div><p className="text-[10px] font-semibold text-royal uppercase">Response</p><p className="text-sm text-charcoal">{mock.vendor.responseTime}</p></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-deep text-white text-xs font-semibold hover:bg-royal transition-colors duration-300">
                    <Phone size={13} />
                    Contact Vendor
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gold-deep/15 text-charcoal text-xs font-semibold hover:bg-ivory transition-colors duration-300">
                    <MessageCircle size={13} />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">Location</h2>
            <div className="mt-4 rounded-xl overflow-hidden border border-gold-deep/10 h-[250px] bg-ivory/60 flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin size={32} className="text-gold-deep mx-auto" />
                <p className="mt-2 text-sm font-semibold text-royal">{mock.address}</p>
                <p className="mt-1 text-xs text-secondary-text">Map integration placeholder</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-royal mb-2">Nearby Landmarks</h3>
              <div className="flex flex-wrap gap-2">
                {mock.landmarks.map((lm, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-ivory/60 border border-gold-deep/10 text-xs text-charcoal">{lm}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">Frequently Asked Questions</h2>
            <div className="mt-5 space-y-2">
              {mock.faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-gold-deep/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left text-sm font-semibold text-royal hover:bg-ivory/50 transition-colors duration-200"
                  >
                    {faq.q}
                    <ChevronDown size={16} className={`text-gold-deep transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-60' : 'max-h-0'}`}>
                    <p className="px-4 pb-4 text-xs text-charcoal leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.08)] overflow-hidden">
            <div className="p-5 border-b border-gold-deep/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-royal">₹{service.price.toLocaleString()}</span>
                    <span className="text-xs text-secondary-text">/event</span>
                  </div>
                  <p className="text-[10px] text-secondary-text mt-0.5">Starting price</p>
                </div>
                <button
                  onClick={() => toggleWishlist(service)}
                  className="w-9 h-9 rounded-xl bg-ivory/60 border border-gold-deep/10 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Heart size={16} className={isWishlisted(service.id) ? 'fill-gold text-gold' : 'text-charcoal'} />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-royal uppercase tracking-wide">Event Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-royal uppercase tracking-wide">Guest Count</label>
                <input
                  type="number"
                  min={1}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>
              <button onClick={() => {
                setAuthRedirectPath(`/checkout/${service.id}`)
                setAuthModalOpen(true)
              }} className="w-full py-3 rounded-xl bg-gold-deep text-white text-sm font-semibold shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-500 flex items-center justify-center gap-2">
                <CalendarCheck size={18} />
                Book Now
              </button>
              <p className="text-[10px] text-secondary-text text-center">No upfront payment required</p>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-ivory/60 border border-gold-deep/10">
                <Shield size={14} className="text-gold-deep shrink-0" />
                <p className="text-[10px] text-charcoal">Your booking is protected by FuncBook's secure payment system.</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">Similar Services</h2>
            <p className="mt-1 text-sm text-secondary-text">Explore other premium options in the same category</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
              {similarServices.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <X size={20} className="text-white" />
          </button>
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
          )}
          {lightboxIndex < gallery.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          )}
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[lightboxIndex]} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-6 text-white/60 text-sm">
            {lightboxIndex + 1} / {gallery.length}
          </div>
        </div>
      )}
    </div>
  )
}
