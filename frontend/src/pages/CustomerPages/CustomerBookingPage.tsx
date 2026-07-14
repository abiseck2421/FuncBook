import { useState, useMemo } from 'react'
import { useParams, useNavigate, useOutletContext, Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Users, MapPin, Star,
  Check, CreditCard, Shield, Phone, Mail, User, FileText,
  CheckCircle2, Home, ChevronDown, BadgeCheck, PartyPopper,
} from 'lucide-react'
import { servicesByCategory, categories } from '../../data/categories'
import type { Service } from '../../data/categories'
import { getHostServices } from '../../data/hostServices'

const STEPS = ['Service', 'Details', 'Review', 'Payment', 'Confirmed']

const EVENT_TYPES = [
  'Wedding', 'Birthday', 'Corporate Event', 'Anniversary',
  'Engagement', 'Baby Shower', 'Conference', 'Workshop', 'Other',
]

interface BookingFormData {
  eventDate: string
  startTime: string
  endTime: string
  guestCount: number
  eventType: string
  venue: string
  specialRequirements: string
  customerName: string
  phone: string
  email: string
}

function findService(serviceId: string): (Service & { categoryId: string }) | null {
  for (const cid in servicesByCategory) {
    const found = servicesByCategory[cid].find((s) => s.id === serviceId)
    if (found) return { ...found, categoryId: cid }
  }
  const hostServices = getHostServices()
  const hostFound = hostServices.find((s) => s.id === serviceId)
  if (hostFound) return { ...hostFound, categoryId: hostFound.categoryId || 'event-planners' }
  return null
}

function generateBookingId(): string {
  const year = new Date().getFullYear()
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let id = ''
  for (let i = 0; i < 5; i++) id += chars.charAt(Math.floor(Math.random() * chars.length))
  return `FB-${year}-${id}`
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
  })
}

function formatTime(timeStr: string): string {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hr = h % 12 || 12
  return `${hr}:${m.toString().padStart(2, '0')} ${ampm}`
}

function categoryLabel(id: string): string {
  return categories.find((c) => c.id === id)?.name || 'Service'
}

export default function CustomerBookingPage() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()
  const { isAuthenticated, setAuthModalOpen } = useOutletContext<{
    isAuthenticated: boolean
    setAuthModalOpen: (open: boolean) => void
  }>()

  const service = useMemo(() => (serviceId ? findService(serviceId) : null), [serviceId])

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<BookingFormData>({
    eventDate: '',
    startTime: '',
    endTime: '',
    guestCount: 100,
    eventType: '',
    venue: '',
    specialRequirements: '',
    customerName: '',
    phone: '',
    email: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [summaryOpen, setSummaryOpen] = useState(false)

  const priceBreakdown = useMemo(() => {
    if (!service) return null
    const base = service.price
    const platformFee = Math.round(base * 0.05)
    const subtotal = base + platformFee
    const gst = Math.round(subtotal * 0.18)
    const total = subtotal + gst
    return { base, platformFee, gst, total }
  }, [service])

  if (!service || !serviceId) {
    return (
      <div className="pt-28 text-center pb-16">
        <h1 className="text-2xl font-bold text-royal">Service not found</h1>
        <Link to="/services" className="mt-4 inline-block text-gold-deep hover:underline">Back to Services</Link>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-22 sm:pt-28 pb-16 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-6 text-center animate-fade-in">
          <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-8 sm:p-10">
            <div className="w-16 h-16 rounded-full bg-gold-deep/10 flex items-center justify-center mx-auto mb-5">
              <User size={28} className="text-gold-deep" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-royal">Login Required</h1>
            <p className="mt-3 text-sm text-secondary-text">
              Please log in to your FuncBook account to continue with this booking.
            </p>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="mt-6 w-full py-3 rounded-xl bg-gold-deep text-white text-sm font-semibold shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-500"
            >
              Log In to Continue
            </button>
            <button
              onClick={() => navigate(`/booking/${serviceId}`)}
              className="mt-3 w-full py-3 rounded-xl border border-gold-deep/15 text-charcoal text-sm font-semibold hover:bg-ivory transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  function updateField(field: keyof BookingFormData, value: string | number) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function validateDetails(): boolean {
    const e: Record<string, string> = {}
    if (!formData.eventDate) e.eventDate = 'Event date is required'
    else if (new Date(formData.eventDate) < new Date(new Date().toDateString())) e.eventDate = 'Date must be in the future'
    if (!formData.startTime) e.startTime = 'Start time is required'
    if (!formData.endTime) e.endTime = 'End time is required'
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) e.endTime = 'Must be after start time'
    if (!formData.guestCount || formData.guestCount < 1) e.guestCount = 'At least 1 guest required'
    if (!formData.eventType) e.eventType = 'Event type is required'
    if (!formData.venue.trim()) e.venue = 'Venue/address is required'
    if (!formData.customerName.trim()) e.customerName = 'Name is required'
    if (!formData.phone.trim()) e.phone = 'Phone number is required'
    else if (formData.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleNext() {
    if (currentStep === 1 && !validateDetails()) return
    if (currentStep === 3) {
      setIsProcessing(true)
      setBookingId(generateBookingId())
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep(4)
      }, 2200)
      return
    }
    setCurrentStep((s) => Math.min(s + 1, 4))
  }

  function handleBack() {
    if (currentStep === 0) {
      navigate(`/booking/${serviceId}`)
    } else {
      setCurrentStep((s) => Math.max(s - 1, 0))
      setErrors({})
    }
  }

  const inputClass = 'w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors'
  const labelClass = 'text-xs font-semibold text-royal uppercase tracking-wide'
  const errorClass = 'mt-1 text-[11px] text-red-500'

  return (
    <div className="pt-22 sm:pt-28 pb-16 min-h-screen">
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-6">

        {currentStep < 4 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 mb-6 text-sm font-semibold text-charcoal hover:text-royal transition-colors"
          >
            <ArrowLeft size={16} />
            {currentStep === 0 ? 'Back to Service' : 'Back'}
          </button>
        )}

        {currentStep < 4 && (
          <div className="w-full mb-10">
            <div className="hidden sm:flex items-center">
              {STEPS.slice(0, 4).map((s, i) => {
                const done = i < currentStep
                const active = i === currentStep
                return (
                  <div key={s} className="contents">
                    <div className="flex flex-col items-center gap-1.5" style={{ flex: '1 1 0' }}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        done ? 'bg-gold-deep text-white' : active ? 'bg-royal text-white ring-4 ring-royal/15' : 'bg-charcoal/10 text-charcoal/40'
                      }`}>
                        {done ? <Check size={18} strokeWidth={3} /> : i + 1}
                      </div>
                      <span className={`text-xs font-semibold whitespace-nowrap ${active ? 'text-royal' : done ? 'text-gold-deep' : 'text-secondary-text/60'}`}>
                        {s}
                      </span>
                    </div>
                    {i < 3 && (
                      <div className={`h-0.5 rounded-full transition-colors duration-300 -mt-4 ${done ? 'bg-gold-deep' : 'bg-charcoal/10'}`} style={{ flex: '1 1 0', minWidth: 0 }} />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="sm:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-royal">Step {currentStep + 1} of 4</span>
                <span className="text-sm font-semibold text-gold-deep">{STEPS[currentStep]}</span>
              </div>
              <div className="h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-deep rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 ? (
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-8 sm:p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 animate-check-pop">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-royal">Booking Confirmed!</h1>
              <p className="mt-2 text-sm text-secondary-text">
                Your booking has been successfully confirmed. You will receive a confirmation email shortly.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ivory border border-gold-deep/10">
                <span className="text-xs text-secondary-text">Booking ID</span>
                <span className="text-sm font-bold text-gold-deep tracking-wide">{bookingId}</span>
              </div>

              <div className="mt-8 text-left space-y-4">
                <div className="rounded-xl border border-gold-deep/10 p-5">
                  <h3 className="text-xs font-semibold text-royal uppercase tracking-wide mb-3">Service Details</h3>
                  <div className="flex items-center gap-3">
                    <img src={service.image} alt={service.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-royal">{service.name}</p>
                      <p className="text-xs text-secondary-text">{categoryLabel(service.categoryId)} &bull; {service.location}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-gold-deep/10 p-5">
                    <h3 className="text-xs font-semibold text-royal uppercase tracking-wide mb-3">Event Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-secondary-text">Date</span><span className="font-medium text-royal">{formatDate(formData.eventDate)}</span></div>
                      <div className="flex justify-between"><span className="text-secondary-text">Time</span><span className="font-medium text-royal">{formatTime(formData.startTime)} – {formatTime(formData.endTime)}</span></div>
                      <div className="flex justify-between"><span className="text-secondary-text">Guests</span><span className="font-medium text-royal">{formData.guestCount}</span></div>
                      <div className="flex justify-between"><span className="text-secondary-text">Event Type</span><span className="font-medium text-royal">{formData.eventType}</span></div>
                      <div className="flex justify-between"><span className="text-secondary-text">Venue</span><span className="font-medium text-royal text-right max-w-[180px]">{formData.venue}</span></div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-gold-deep/10 p-5">
                    <h3 className="text-xs font-semibold text-royal uppercase tracking-wide mb-3">Payment Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-secondary-text">Service Price</span><span className="font-medium text-royal">₹{priceBreakdown!.base.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-secondary-text">Platform Fee</span><span className="font-medium text-royal">₹{priceBreakdown!.platformFee.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-secondary-text">GST (18%)</span><span className="font-medium text-royal">₹{priceBreakdown!.gst.toLocaleString()}</span></div>
                      <div className="border-t border-gold-deep/10 pt-2 flex justify-between">
                        <span className="font-bold text-royal">Total Paid</span>
                        <span className="font-bold text-gold-deep">₹{priceBreakdown!.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-secondary-text">Status</span>
                        <span className="flex items-center gap-1 text-green-600 font-semibold text-xs">
                          <CheckCircle2 size={13} /> Confirmed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {formData.specialRequirements && (
                  <div className="rounded-xl border border-gold-deep/10 p-5">
                    <h3 className="text-xs font-semibold text-royal uppercase tracking-wide mb-2">Special Requirements</h3>
                    <p className="text-sm text-charcoal">{formData.specialRequirements}</p>
                  </div>
                )}

                <div className="rounded-xl border border-gold-deep/10 p-5">
                  <h3 className="text-xs font-semibold text-royal uppercase tracking-wide mb-3">Contact Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div><span className="text-secondary-text text-xs">Name</span><p className="font-medium text-royal">{formData.customerName}</p></div>
                    <div><span className="text-secondary-text text-xs">Phone</span><p className="font-medium text-royal">{formData.phone}</p></div>
                    <div><span className="text-secondary-text text-xs">Email</span><p className="font-medium text-royal">{formData.email}</p></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 py-3 rounded-xl bg-gold-deep text-white text-sm font-semibold shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal transition-all duration-500 flex items-center justify-center gap-2"
                >
                  <Home size={16} />
                  Back to Home
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="flex-1 py-3 rounded-xl border border-gold-deep/15 text-charcoal text-sm font-semibold hover:bg-ivory transition-colors flex items-center justify-center gap-2"
                >
                  <PartyPopper size={16} />
                  View My Bookings
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setSummaryOpen(!summaryOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-white border border-gold-deep/10 shadow-[0_2px_12px_rgba(184,134,11,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <img src={service.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-royal truncate max-w-[180px]">{service.name}</p>
                    {priceBreakdown && (
                      <p className="text-xs font-semibold text-gold-deep">₹{priceBreakdown.total.toLocaleString()}</p>
                    )}
                  </div>
                </div>
                <ChevronDown size={18} className={`text-secondary-text transition-transform duration-300 ${summaryOpen ? 'rotate-180' : ''}`} />
              </button>
              {summaryOpen && priceBreakdown && (
                <div className="mt-2 rounded-xl bg-white border border-gold-deep/10 shadow-[0_2px_12px_rgba(184,134,11,0.06)] p-4 animate-fade-in">
                  <SummaryContent service={service} formData={formData} priceBreakdown={priceBreakdown} />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              <div className="lg:col-span-2">
                {currentStep === 0 && (
                  <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] overflow-hidden">
                    <div className="relative h-48 sm:h-64">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-royal">
                            {categoryLabel(service.categoryId)}
                          </span>
                          {service.verified && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-royal">
                              <BadgeCheck size={11} className="text-gold" />
                              Verified
                            </span>
                          )}
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">{service.name}</h2>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-4">
                        <div className="flex items-center gap-1.5">
                          <Star size={14} className="fill-gold text-gold" />
                          <span className="font-semibold text-royal">{service.rating}</span>
                          <span className="text-secondary-text">({service.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-secondary-text">
                          <MapPin size={14} />
                          {service.location}
                        </div>
                      </div>
                      {service.description && (
                        <p className="text-sm text-charcoal leading-relaxed mb-4">{service.description}</p>
                      )}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-ivory border border-gold-deep/10">
                        <div>
                          <p className="text-[10px] font-semibold text-secondary-text uppercase">Starting Price</p>
                          <p className="text-xl font-bold text-royal mt-0.5">₹{service.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-secondary-text">
                          <Shield size={14} className="text-gold-deep" />
                          Secure Booking
                        </div>
                      </div>
                      <div className="mt-5 flex justify-end">
                        <button
                          onClick={handleNext}
                          className="px-8 py-3 rounded-xl bg-gold-deep text-white text-sm font-semibold shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-500 flex items-center gap-2"
                        >
                          Continue to Details
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-5">
                        <Calendar size={18} className="text-gold-deep" />
                        <h2 className="font-heading text-lg font-bold text-royal">Event Details</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className={labelClass}>Event Date *</label>
                          <input type="date" value={formData.eventDate} onChange={(e) => updateField('eventDate', e.target.value)}
                            className={`${inputClass} mt-1.5 ${errors.eventDate ? 'border-red-400' : ''}`} />
                          {errors.eventDate && <p className={errorClass}>{errors.eventDate}</p>}
                        </div>
                        <div>
                          <label className={labelClass}>Start Time *</label>
                          <input type="time" value={formData.startTime} onChange={(e) => updateField('startTime', e.target.value)}
                            className={`${inputClass} mt-1.5 ${errors.startTime ? 'border-red-400' : ''}`} />
                          {errors.startTime && <p className={errorClass}>{errors.startTime}</p>}
                        </div>
                        <div>
                          <label className={labelClass}>End Time *</label>
                          <input type="time" value={formData.endTime} onChange={(e) => updateField('endTime', e.target.value)}
                            className={`${inputClass} mt-1.5 ${errors.endTime ? 'border-red-400' : ''}`} />
                          {errors.endTime && <p className={errorClass}>{errors.endTime}</p>}
                        </div>
                        <div>
                          <label className={labelClass}>Number of Guests *</label>
                          <input type="number" min={1} value={formData.guestCount} onChange={(e) => updateField('guestCount', Number(e.target.value))}
                            className={`${inputClass} mt-1.5 ${errors.guestCount ? 'border-red-400' : ''}`} />
                          {errors.guestCount && <p className={errorClass}>{errors.guestCount}</p>}
                        </div>
                        <div>
                          <label className={labelClass}>Event / Function Type *</label>
                          <select value={formData.eventType} onChange={(e) => updateField('eventType', e.target.value)}
                            className={`${inputClass} mt-1.5 appearance-none cursor-pointer ${errors.eventType ? 'border-red-400' : ''}`}>
                            <option value="">Select event type</option>
                            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                          {errors.eventType && <p className={errorClass}>{errors.eventType}</p>}
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelClass}>Venue / Address *</label>
                          <input type="text" placeholder="Enter venue or event address" value={formData.venue}
                            onChange={(e) => updateField('venue', e.target.value)}
                            className={`${inputClass} mt-1.5 ${errors.venue ? 'border-red-400' : ''}`} />
                          {errors.venue && <p className={errorClass}>{errors.venue}</p>}
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelClass}>Special Requirements</label>
                          <textarea rows={3} placeholder="Any special requests or requirements..." value={formData.specialRequirements}
                            onChange={(e) => updateField('specialRequirements', e.target.value)}
                            className={`${inputClass} mt-1.5 resize-none`} />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-5">
                        <User size={18} className="text-gold-deep" />
                        <h2 className="font-heading text-lg font-bold text-royal">Contact Details</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className={labelClass}>Full Name *</label>
                          <input type="text" placeholder="Enter your full name" value={formData.customerName}
                            onChange={(e) => updateField('customerName', e.target.value)}
                            className={`${inputClass} mt-1.5 ${errors.customerName ? 'border-red-400' : ''}`} />
                          {errors.customerName && <p className={errorClass}>{errors.customerName}</p>}
                        </div>
                        <div>
                          <label className={labelClass}>Phone Number *</label>
                          <input type="tel" placeholder="10-digit mobile number" value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className={`${inputClass} mt-1.5 ${errors.phone ? 'border-red-400' : ''}`} />
                          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                        </div>
                        <div>
                          <label className={labelClass}>Email Address *</label>
                          <input type="email" placeholder="you@example.com" value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className={`${inputClass} mt-1.5 ${errors.email ? 'border-red-400' : ''}`} />
                          {errors.email && <p className={errorClass}>{errors.email}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-8 py-3 rounded-xl bg-gold-deep text-white text-sm font-semibold shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-500 flex items-center gap-2"
                      >
                        Continue to Review
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-5">
                        <FileText size={18} className="text-gold-deep" />
                        <h2 className="font-heading text-lg font-bold text-royal">Review Your Booking</h2>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-xl border border-gold-deep/10 p-4">
                          <h3 className="text-xs font-semibold text-royal uppercase tracking-wide mb-3">Service</h3>
                          <div className="flex items-center gap-3">
                            <img src={service.image} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                            <div>
                              <p className="text-sm font-bold text-royal">{service.name}</p>
                              <p className="text-xs text-secondary-text">{categoryLabel(service.categoryId)} &bull; {service.location}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Star size={11} className="fill-gold text-gold" />
                                <span className="text-xs font-semibold text-royal">{service.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-gold-deep/10 p-4">
                          <h3 className="text-xs font-semibold text-royal uppercase tracking-wide mb-3">Event Details</h3>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div><span className="text-secondary-text text-xs">Date</span><p className="font-medium text-royal">{formatDate(formData.eventDate)}</p></div>
                            <div><span className="text-secondary-text text-xs">Time</span><p className="font-medium text-royal">{formatTime(formData.startTime)} – {formatTime(formData.endTime)}</p></div>
                            <div><span className="text-secondary-text text-xs">Guests</span><p className="font-medium text-royal">{formData.guestCount}</p></div>
                            <div><span className="text-secondary-text text-xs">Event Type</span><p className="font-medium text-royal">{formData.eventType}</p></div>
                            <div className="col-span-2"><span className="text-secondary-text text-xs">Venue</span><p className="font-medium text-royal">{formData.venue}</p></div>
                            {formData.specialRequirements && (
                              <div className="col-span-2"><span className="text-secondary-text text-xs">Special Requirements</span><p className="font-medium text-royal">{formData.specialRequirements}</p></div>
                            )}
                          </div>
                        </div>

                        <div className="rounded-xl border border-gold-deep/10 p-4">
                          <h3 className="text-xs font-semibold text-royal uppercase tracking-wide mb-3">Contact</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-gold-deep shrink-0" />
                              <div><span className="text-secondary-text text-xs">Name</span><p className="font-medium text-royal">{formData.customerName}</p></div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-gold-deep shrink-0" />
                              <div><span className="text-secondary-text text-xs">Phone</span><p className="font-medium text-royal">{formData.phone}</p></div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-gold-deep shrink-0" />
                              <div><span className="text-secondary-text text-xs">Email</span><p className="font-medium text-royal">{formData.email}</p></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-8 py-3 rounded-xl bg-gold-deep text-white text-sm font-semibold shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-500 flex items-center gap-2"
                      >
                        <CreditCard size={16} />
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && priceBreakdown && (
                  <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-5 sm:p-8">
                    {isProcessing ? (
                      <div className="flex flex-col items-center py-12">
                        <div className="w-14 h-14 border-4 border-gold-deep/20 border-t-gold-deep rounded-full animate-spin" />
                        <p className="mt-5 text-sm font-semibold text-royal">Processing your payment...</p>
                        <p className="mt-1 text-xs text-secondary-text">Please do not close this page</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-6">
                          <CreditCard size={18} className="text-gold-deep" />
                          <h2 className="font-heading text-lg font-bold text-royal">Payment</h2>
                        </div>

                        <div className="rounded-xl bg-ivory border border-gold-deep/10 p-5 mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <img src={service.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                              <p className="text-sm font-bold text-royal">{service.name}</p>
                              <p className="text-xs text-secondary-text">{formatDate(formData.eventDate)}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm border-t border-gold-deep/10 pt-4">
                            <div className="flex justify-between"><span className="text-secondary-text">Service Price</span><span className="font-medium text-royal">₹{priceBreakdown.base.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-secondary-text">Platform Fee (5%)</span><span className="font-medium text-royal">₹{priceBreakdown.platformFee.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-secondary-text">GST (18%)</span><span className="font-medium text-royal">₹{priceBreakdown.gst.toLocaleString()}</span></div>
                            <div className="border-t border-gold-deep/10 pt-2 mt-2 flex justify-between">
                              <span className="font-bold text-royal">Total Amount</span>
                              <span className="text-xl font-bold text-gold-deep">₹{priceBreakdown.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200 mb-6">
                          <Shield size={16} className="text-green-600 shrink-0" />
                          <p className="text-xs text-green-700">Your payment is secured with FuncBook's encrypted payment system. No card details are stored.</p>
                        </div>

                        <button
                          onClick={handleNext}
                          className="w-full py-3.5 rounded-xl bg-gold-deep text-white text-sm font-semibold shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-500 flex items-center justify-center gap-2"
                        >
                          <CreditCard size={16} />
                          Pay ₹{priceBreakdown.total.toLocaleString()}
                        </button>
                        <p className="text-[10px] text-secondary-text text-center mt-3">By confirming, you agree to FuncBook's Terms of Service and Cancellation Policy.</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-28">
                  <div className="rounded-2xl bg-white border border-gold-deep/10 shadow-[0_4px_24px_rgba(184,134,11,0.06)] p-5">
                    <SummaryContent service={service} formData={formData} priceBreakdown={priceBreakdown} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function SummaryContent({
  service,
  formData,
  priceBreakdown,
}: {
  service: Service & { categoryId: string }
  formData: BookingFormData
  priceBreakdown: { base: number; platformFee: number; gst: number; total: number } | null
}) {
  return (
    <div>
      <div className="flex items-center gap-3 pb-4 border-b border-gold-deep/10">
        <img src={service.image} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-bold text-royal truncate">{service.name}</p>
          <p className="text-xs text-secondary-text">{categoryLabel(service.categoryId)}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={11} className="fill-gold text-gold" />
            <span className="text-xs font-semibold text-royal">{service.rating}</span>
            <span className="text-[10px] text-secondary-text">({service.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="py-4 border-b border-gold-deep/10 space-y-2.5 text-sm">
        {formData.eventDate && (
          <div className="flex items-center gap-2.5">
            <Calendar size={14} className="text-gold-deep shrink-0" />
            <span className="text-charcoal">{formatDate(formData.eventDate)}</span>
          </div>
        )}
        {formData.startTime && formData.endTime && (
          <div className="flex items-center gap-2.5">
            <Clock size={14} className="text-gold-deep shrink-0" />
            <span className="text-charcoal">{formatTime(formData.startTime)} – {formatTime(formData.endTime)}</span>
          </div>
        )}
        {formData.guestCount > 0 && (
          <div className="flex items-center gap-2.5">
            <Users size={14} className="text-gold-deep shrink-0" />
            <span className="text-charcoal">{formData.guestCount} Guests</span>
          </div>
        )}
        {formData.eventType && (
          <div className="flex items-center gap-2.5">
            <PartyPopper size={14} className="text-gold-deep shrink-0" />
            <span className="text-charcoal">{formData.eventType}</span>
          </div>
        )}
        {formData.venue && (
          <div className="flex items-center gap-2.5">
            <MapPin size={14} className="text-gold-deep shrink-0" />
            <span className="text-charcoal truncate">{formData.venue}</span>
          </div>
        )}
      </div>

      {priceBreakdown && (
        <div className="pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary-text">Service Price</span>
            <span className="font-medium text-royal">₹{priceBreakdown.base.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-text">Platform Fee</span>
            <span className="font-medium text-royal">₹{priceBreakdown.platformFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-text">GST (18%)</span>
            <span className="font-medium text-royal">₹{priceBreakdown.gst.toLocaleString()}</span>
          </div>
          <div className="border-t border-gold-deep/10 pt-3 mt-3 flex justify-between items-center">
            <span className="font-bold text-royal">Total</span>
            <span className="text-lg font-bold text-gold-deep">₹{priceBreakdown.total.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
