import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Check, Sparkles, Building2, UtensilsCrossed,
  Palette, Camera, Music, Lightbulb, Armchair, CalendarCheck,
  Flower2, Zap, Package, Star, Users, TrendingUp,
} from 'lucide-react'

const businessTypes = [
  {
    id: 'function-hall',
    title: 'Function Hall',
    desc: 'Rent out your wedding or event venue.',
    icon: Building2,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 'catering',
    title: 'Catering',
    desc: 'Provide delicious food for events.',
    icon: UtensilsCrossed,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    id: 'decoration',
    title: 'Decoration',
    desc: 'Offer stage, floral, and venue decoration.',
    icon: Palette,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    id: 'photography',
    title: 'Photography',
    desc: 'Capture memorable moments.',
    icon: Camera,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'makeup',
    title: 'Makeup Artist',
    desc: 'Professional bridal and event makeup.',
    icon: Sparkles,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    id: 'dj-sound',
    title: 'DJ & Sound',
    desc: 'Music, DJ, and sound system services.',
    icon: Music,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    id: 'lighting',
    title: 'Lighting',
    desc: 'Lighting and stage effects.',
    icon: Lightbulb,
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
  {
    id: 'chairs-tables',
    title: 'Chairs & Tables',
    desc: 'Furniture rental for events.',
    icon: Armchair,
    iconBg: 'bg-stone-50',
    iconColor: 'text-stone-600',
  },
  {
    id: 'event-planner',
    title: 'Event Planner',
    desc: 'Complete event management services.',
    icon: CalendarCheck,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'mehendi',
    title: 'Mehendi Artist',
    desc: 'Traditional bridal mehendi services.',
    icon: Flower2,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    id: 'generator',
    title: 'Generator Rental',
    desc: 'Power backup for events.',
    icon: Zap,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    id: 'other',
    title: 'Other Services',
    desc: 'List any additional event-related service.',
    icon: Package,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
]

export default function BecomeHostPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggleSelection = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const selectedCount = selected.size

  return (
    <div className="min-h-screen bg-ivory pt-22 sm:pt-28 pb-28 lg:pb-8">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ivory via-ivory to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gold/8 blur-[80px]" />
        </div>

        <div className="relative z-10 w-full max-w-[min(95%,1400px)] mx-auto px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-deep text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} />
                Start Earning Today
              </div>

              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-royal leading-[1.08] tracking-tight">
                Become a Host
                <br />
                on <span className="text-gold">FuncBook</span>
              </h1>

              <p className="max-w-lg text-base sm:text-lg text-secondary-text leading-relaxed">
                List your venue or event services and start receiving bookings from
                thousands of customers.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById('business-types')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-500"
                >
                  Start Hosting
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gold" />
                  <span className="text-xs sm:text-sm text-secondary-text font-medium">
                    2000+ Active Hosts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-gold" />
                  <span className="text-xs sm:text-sm text-secondary-text font-medium">
                    4.9 Host Rating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-gold" />
                  <span className="text-xs sm:text-sm text-secondary-text font-medium">
                    15K+ Bookings
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Illustration Card */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-gold/5 blur-[80px] rounded-[32px]" />

              <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-[32px] shadow-[0_24px_64px_rgba(0,0,0,0.08)] p-7 sm:p-8 animate-float border border-white/60">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=1000&fit=crop"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-white/10" />

                <div className="relative z-10">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal">
                      Start Earning Today
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary-text mt-1.5">
                      Share your space, grow your business.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {[
                      { icon: Building2, label: 'Venues' },
                      { icon: UtensilsCrossed, label: 'Catering' },
                      { icon: Camera, label: 'Photography' },
                      { icon: Music, label: 'DJ & Music' },
                    ].map((item) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(184,134,11,0.1)] hover:border-gold/30"
                        >
                          <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                            <Icon size={17} className="text-gold-deep" />
                          </div>
                          <span className="text-xs font-semibold text-charcoal">
                            {item.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            size={12}
                            className="fill-gold text-gold -mr-0.5 last:mr-0"
                          />
                        ))}
                      </div>
                      <span className="font-bold text-royal">4.9</span>
                      <span className="text-secondary-text">Rating</span>
                    </div>
                    <div className="text-secondary-text">
                      <span className="font-semibold text-royal">1200+</span> Events
                    </div>
                    <div className="text-secondary-text">
                      <span className="font-semibold text-royal">500+</span> Vendors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Choose Your Business Type ─── */}
      <section
        id="business-types"
        className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-12 sm:py-16"
      >
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-4">
            Choose Your Business Type
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-royal">
            What Do You Offer?
          </h2>
          <p className="mt-4 text-secondary-text max-w-md mx-auto">
            Select all the services you provide. You can always update this later.
          </p>
        </div>

        {/* Selection badge */}
        <div
          className={`text-center mb-6 transition-all duration-300 ${
            selectedCount > 0
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none h-0 mb-0'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-deep text-sm font-semibold">
            <Check size={14} />
            {selectedCount} service{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {businessTypes.map((type, index) => {
            const Icon = type.icon
            const isSelected = selected.has(type.id)

            return (
              <button
                key={type.id}
                onClick={() => toggleSelection(type.id)}
                className={`
                  group relative text-left w-full rounded-2xl p-6
                  transition-all duration-300 ease-out
                  opacity-0 animate-fade-in-up
                  ${
                    isSelected
                      ? 'bg-white border-2 border-gold-deep shadow-[0_8px_32px_rgba(184,134,11,0.15)]'
                      : 'bg-white border border-gold-deep/15 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] hover:border-gold-deep/30'
                  }
                `}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                {/* Animated checkmark */}
                <div
                  className={`
                    absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${
                      isSelected
                        ? 'bg-gold-deep scale-100 opacity-100 animate-check-pop'
                        : 'bg-gold-deep/20 scale-75 opacity-0'
                    }
                  `}
                >
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>

                {/* Icon */}
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-4
                    transition-all duration-300
                    ${type.iconBg} group-hover:scale-110
                    ${isSelected ? 'ring-2 ring-gold-deep/20 ring-offset-2' : ''}
                  `}
                >
                  <Icon size={22} className={type.iconColor} />
                </div>

                {/* Text */}
                <h3 className="font-heading text-lg font-bold text-royal">
                  {type.title}
                </h3>
                <p className="mt-1.5 text-sm text-secondary-text leading-relaxed">
                  {type.desc}
                </p>

                {/* Selected background glow */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 via-transparent to-gold/3 pointer-events-none" />
                )}
              </button>
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
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-sm text-secondary-text">
            {selectedCount > 0 && (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-gold-deep" />
                <span className="font-semibold text-royal">{selectedCount}</span>
                <span>
                  service{selectedCount !== 1 ? 's' : ''} selected
                </span>
              </>
            )}
          </div>

          <button
            onClick={() =>
              navigate('/become-host/details', {
                state: { services: Array.from(selected) },
              })
            }
            disabled={selectedCount === 0}
            className={`
              inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold text-sm
              transition-all duration-300
              ${
                selectedCount > 0
                  ? 'bg-gold-deep text-white shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)]'
                  : 'bg-charcoal/15 text-charcoal/40 cursor-not-allowed'
              }
            `}
          >
            Continue
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
