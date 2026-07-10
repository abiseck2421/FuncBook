import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, ShieldCheck, Award, Building2, Palette, UtensilsCrossed, Camera, Music, Layout, Star } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-ivory via-ivory to-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gold/8 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-[min(95%,1400px)] mx-auto px-6 pt-28 pb-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-deep text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} />
              Premium Event Booking Platform
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-royal leading-[1.08] tracking-tight">
              Plan Your
              <br />
              <span className="text-gold">Dream Event</span>
              <br />
              With Ease
            </h1>

            <p className="max-w-lg text-base sm:text-lg text-secondary-text leading-relaxed">
              Discover and book the finest vendors for your special occasions. 
              From function halls to catering, we bring premium event services to your fingertips.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-500"
              >
                Explore Services
                <ArrowRight size={18} />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-500"
              >
                Book Your Event
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-gold" />
                <span className="text-xs sm:text-sm text-secondary-text font-medium">Verified Vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-gold" />
                <span className="text-xs sm:text-sm text-secondary-text font-medium">Seamless Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-gold" />
                <span className="text-xs sm:text-sm text-secondary-text font-medium">Premium Experience</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-gold/5 blur-[80px] rounded-[32px]" />

            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-[32px] shadow-[0_24px_64px_rgba(0,0,0,0.08)] p-7 sm:p-8 animate-float border border-white/60">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1000&fit=crop"
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-white/10" />
              <div className="relative z-10">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal">Explore Premium Services</h3>
                <p className="text-xs sm:text-sm text-secondary-text mt-1.5">Everything you need for your perfect event.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { icon: Building2, label: 'Wedding Hall' },
                  { icon: Palette, label: 'Decoration' },
                  { icon: UtensilsCrossed, label: 'Catering' },
                  { icon: Camera, label: 'Photography' },
                  { icon: Music, label: 'DJ & Music' },
                  { icon: Layout, label: 'Stage Setup' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="group flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(184,134,11,0.1)] hover:border-gold/30 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                        <Icon size={17} className="text-gold-deep" />
                      </div>
                      <span className="text-xs font-semibold text-charcoal group-hover:text-royal transition-colors">{item.label}</span>
                    </div>
                  )
                })}
              </div>

              
              <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} className="fill-gold text-gold -mr-0.5 last:mr-0" />
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
  )
}