import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Sparkles, Building2, UtensilsCrossed,
  Palette, Camera, Music, Lightbulb, Armchair, CalendarCheck,
  Flower2, Zap, Package, MapPin, Phone, IndianRupee, Briefcase,
  FileText, AlertCircle, PartyPopper,
} from 'lucide-react'

type ServiceForm = {
  name: string
  description: string
  location: string
  price: string
  phone: string
  experience: string
}

const emptyForm: ServiceForm = {
  name: '',
  description: '',
  location: '',
  price: '',
  phone: '',
  experience: '',
}

const serviceMeta: Record<
  string,
  { title: string; icon: typeof Building2; iconBg: string; iconColor: string }
> = {
  'function-hall': { title: 'Function Hall', icon: Building2, iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
  catering:        { title: 'Catering',      icon: UtensilsCrossed, iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
  decoration:      { title: 'Decoration',     icon: Palette, iconBg: 'bg-rose-50', iconColor: 'text-rose-600' },
  photography:     { title: 'Photography',    icon: Camera, iconBg: 'bg-sky-50', iconColor: 'text-sky-600' },
  makeup:          { title: 'Makeup Artist',  icon: Sparkles, iconBg: 'bg-pink-50', iconColor: 'text-pink-600' },
  'dj-sound':      { title: 'DJ & Sound',     icon: Music, iconBg: 'bg-violet-50', iconColor: 'text-violet-600' },
  lighting:        { title: 'Lighting',        icon: Lightbulb, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  'chairs-tables': { title: 'Chairs & Tables', icon: Armchair, iconBg: 'bg-stone-50', iconColor: 'text-stone-600' },
  'event-planner': { title: 'Event Planner',  icon: CalendarCheck, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  mehendi:         { title: 'Mehendi Artist',  icon: Flower2, iconBg: 'bg-teal-50', iconColor: 'text-teal-600' },
  generator:       { title: 'Generator Rental', icon: Zap, iconBg: 'bg-red-50', iconColor: 'text-red-600' },
  other:           { title: 'Other Services',  icon: Package, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
}

export default function AddServicePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const serviceIds = (location.state?.services as string[]) || []

  const [formData, setFormData] = useState<Record<string, ServiceForm>>(() =>
    serviceIds.reduce(
      (acc, id) => ({ ...acc, [id]: { ...emptyForm } }),
      {} as Record<string, ServiceForm>,
    ),
  )
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  if (serviceIds.length === 0 && !submitted) {
    navigate('/become-host', { replace: true })
    return null
  }

  const updateField = (id: string, field: keyof ServiceForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }))
    setErrors([])
  }

  const validate = (): string[] => {
    const errs: string[] = []
    for (const id of serviceIds) {
      const meta = serviceMeta[id]
      const label = meta?.title ?? id
      const data = formData[id]
      if (!data?.name?.trim()) errs.push(`${label}: Service name is required`)
      if (!data?.description?.trim()) errs.push(`${label}: Description is required`)
      if (!data?.location?.trim()) errs.push(`${label}: Location is required`)
      if (!data?.phone?.trim()) errs.push(`${label}: Contact phone is required`)
    }
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (errs.length > 0) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory pt-22 sm:pt-28">
        <section className="relative overflow-hidden bg-gradient-to-b from-ivory via-ivory to-white">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gold/8 blur-[80px]" />
          </div>
          <div className="relative z-10 w-full max-w-[min(95%,1400px)] mx-auto px-6 py-20 sm:py-28 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/20 mb-8">
              <PartyPopper size={36} className="text-gold-deep" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-royal">
              You&apos;re <span className="text-gold">All Set!</span>
            </h1>
            <p className="mt-4 text-secondary-text max-w-md mx-auto text-base sm:text-lg leading-relaxed">
              Your services have been submitted for review. You&apos;ll start receiving bookings once approved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-500"
              >
                Browse Services
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-500"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory pt-22 sm:pt-28 pb-28 lg:pb-8">
      {/* ─── Header ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ivory via-ivory to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gold/8 blur-[80px]" />
        </div>

        <div className="relative z-10 w-full max-w-[min(95%,1400px)] mx-auto px-6 py-12 sm:py-16">
          <Link
            to="/become-host"
            className="inline-flex items-center gap-2 text-sm font-medium text-secondary-text hover:text-gold-deep transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to service selection
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-deep text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            Step 2 of 3
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-royal leading-[1.08] tracking-tight">
            Add Your Services
          </h1>
          <p className="mt-4 text-secondary-text max-w-lg text-base sm:text-lg leading-relaxed">
            Tell us about each service you selected. This information will be visible to
            customers browsing FuncBook.
          </p>
        </div>
      </section>

      {/* ─── Form Sections ─── */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-8 sm:py-12">
        {/* Error banner */}
        {errors.length > 0 && (
          <div className="animate-fade-in bg-red-50 border border-red-200/60 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-700">
                  Please complete the required fields:
                </p>
                <ul className="mt-2 space-y-1">
                  {errors.map((err, i) => (
                    <li key={i} className="text-sm text-red-600">
                      {err}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {serviceIds.map((id, index) => {
            const meta = serviceMeta[id]
            if (!meta) return null
            const Icon = meta.icon
            const data = formData[id] || emptyForm

            const fieldHasError = (field: keyof ServiceForm) =>
              errors.some((e) => e.startsWith(meta.title) && e.toLowerCase().includes(field))

            return (
              <div
                key={id}
                className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Card header */}
                <div className="flex items-center gap-4 px-8 pt-8 pb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.iconBg}`}
                  >
                    <Icon size={22} className={meta.iconColor} />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">
                      {meta.title}
                    </h2>
                    <p className="text-xs text-secondary-text mt-0.5">
                      Fill in the details for this service
                    </p>
                  </div>
                </div>

                {/* Form fields */}
                <div className="px-8 pb-8 space-y-5">
                  {/* Row 1 — Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-charcoal">
                        Service / Business Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <Briefcase
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60"
                        />
                        <input
                          type="text"
                          placeholder="e.g., Royal Palace Banquet Hall"
                          value={data.name}
                          onChange={(e) => updateField(id, 'name', e.target.value)}
                          className={`w-full rounded-2xl border bg-ivory/60 pl-11 pr-4 py-3 text-sm text-charcoal outline-none transition focus:bg-white placeholder:text-secondary-text/40 ${
                            fieldHasError('name')
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-black/10 focus:border-gold-deep'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-charcoal">
                        Contact Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <Phone
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60"
                        />
                        <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-secondary-text font-medium select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          placeholder="Enter phone number"
                          value={data.phone}
                          onChange={(e) => updateField(id, 'phone', e.target.value)}
                          className={`w-full rounded-2xl border bg-ivory/60 pl-[5.25rem] pr-4 py-3 text-sm text-charcoal outline-none transition focus:bg-white placeholder:text-secondary-text/40 ${
                            fieldHasError('phone')
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-black/10 focus:border-gold-deep'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2 — Location + Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-charcoal">
                        Location / Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <MapPin
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60"
                        />
                        <input
                          type="text"
                          placeholder="e.g., MG Road, Bangalore"
                          value={data.location}
                          onChange={(e) => updateField(id, 'location', e.target.value)}
                          className={`w-full rounded-2xl border bg-ivory/60 pl-11 pr-4 py-3 text-sm text-charcoal outline-none transition focus:bg-white placeholder:text-secondary-text/40 ${
                            fieldHasError('location')
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-black/10 focus:border-gold-deep'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-charcoal">
                        Starting Price
                      </label>
                      <div className="relative mt-2">
                        <IndianRupee
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60"
                        />
                        <input
                          type="number"
                          placeholder="e.g., 25000"
                          min={0}
                          value={data.price}
                          onChange={(e) => updateField(id, 'price', e.target.value)}
                          className="w-full rounded-2xl border border-black/10 bg-ivory/60 pl-11 pr-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold-deep focus:bg-white placeholder:text-secondary-text/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3 — Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-charcoal">
                        Years of Experience
                      </label>
                      <div className="relative mt-2">
                        <CalendarCheck
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60"
                        />
                        <input
                          type="number"
                          placeholder="e.g., 5"
                          min={0}
                          max={100}
                          value={data.experience}
                          onChange={(e) => updateField(id, 'experience', e.target.value)}
                          className="w-full rounded-2xl border border-black/10 bg-ivory/60 pl-11 pr-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold-deep focus:bg-white placeholder:text-secondary-text/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4 — Description */}
                  <div>
                    <label className="text-sm font-medium text-charcoal">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <FileText
                        size={16}
                        className="absolute left-4 top-4 text-secondary-text/60"
                      />
                      <textarea
                        rows={3}
                        placeholder="Describe your service, what makes it special, and what customers can expect..."
                        value={data.description}
                        onChange={(e) => updateField(id, 'description', e.target.value)}
                        className={`w-full rounded-2xl border bg-ivory/60 pl-11 pr-4 py-3 text-sm text-charcoal outline-none transition focus:bg-white resize-none min-h-[100px] placeholder:text-secondary-text/40 ${
                          fieldHasError('description')
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-black/10 focus:border-gold-deep'
                        }`}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-secondary-text">
                      {data.description.length}/500 characters
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── Bottom Action Bar ─── */}
      <div
        className={`
          fixed bottom-0 inset-x-0 z-50
          border-t border-gold-deep/10 bg-white/90 backdrop-blur-xl
          shadow-[0_-4px_24px_rgba(0,0,0,0.06)]
          lg:static lg:z-auto lg:border-t lg:border-gold-deep/10
          lg:bg-ivory lg:backdrop-blur-none lg:shadow-none
        `}
      >
        <div className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link
            to="/become-host"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-sm text-secondary-text">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-deep" />
            <span className="font-semibold text-royal">{serviceIds.length}</span>
            <span>
              service{serviceIds.length !== 1 ? 's' : ''} to complete
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-300"
          >
            Save &amp; Continue
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
