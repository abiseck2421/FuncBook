import { Check, ChevronRight, Sparkles } from 'lucide-react'

const trustIndicators = [
  'Premium Vendors',
  'Verified Services',
  'Seamless Booking',
]

const services = [
  { label: 'Wedding Hall', emoji: '🏛️' },
  { label: 'Elegant Decor', emoji: '✨' },
  { label: 'Fine Dining', emoji: '🍽️' },
  { label: 'Photography', emoji: '📸' },
  { label: 'Stage Setup', emoji: '🎭' },
  { label: 'DJ & Music', emoji: '🎵' },
  { label: 'Celebration', emoji: '🎉' },
]

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 overflow-hidden bg-ivory"
    >
      <div className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-gold/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24 min-h-[calc(100vh-80px)] py-20 lg:py-0">
          <div className="flex-1 pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border text-xs font-semibold text-charcoal tracking-widest uppercase mb-8 animate-fade-in">
              <Sparkles size={14} className="text-gold" />
              Luxury Event Booking Platform
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-royal leading-[0.95] tracking-[-0.03em] animate-slide-up">
              Celebrate Every{' '}
              <span className="text-gold">Moment.</span>
              <br />
              Book Every{' '}
              <span className="text-gold">Detail.</span>
            </h1>

            <p className="mt-6 text-lg text-secondary-text max-w-[550px] leading-[1.8] animate-fade-in">
              Discover and book premium venues, catering, decoration, photography,
              DJ, lighting, transportation, makeup artists, cakes, and more—all in
              one elegant platform.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-slide-up">
              <a
                href="#services"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-royal text-white font-semibold rounded-[14px] hover:bg-gold transition-all duration-300 shadow-lg shadow-royal/10 hover:shadow-gold/20"
              >
                Explore Services
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#book"
                className="px-8 py-4 font-semibold text-royal border-2 border-royal rounded-[14px] hover:bg-royal hover:text-white transition-all duration-300"
              >
                Book Your Event
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 animate-fade-in">
              {trustIndicators.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-charcoal">
                  <div className="p-0.5 rounded-full bg-gold/20">
                    <Check size={14} className="text-gold" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent rounded-[32px] blur-2xl -z-10" />

              <div className="relative bg-white rounded-[32px] shadow-[0_20px_80px_-12px_rgba(0,0,0,0.12)] border border-border/60 overflow-hidden p-5 sm:p-6">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-ivory">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-royal/5" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6">
                      {services.map((service) => (
                        <div
                          key={service.label}
                          className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-white/90 border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                          <span className="text-xl sm:text-2xl">{service.emoji}</span>
                          <span className="text-[10px] sm:text-xs font-semibold text-charcoal text-center leading-tight">
                            {service.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-royal flex items-center justify-center">
                      <Sparkles size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold text-royal">FuncBook</p>
                      <p className="text-xs text-secondary-text">Premium Events</p>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gold/20 border-2 border-white"
                      />
                    ))}
                    <div className="w-7 h-7 rounded-full bg-gold border-2 border-white flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
