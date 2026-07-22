import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-royal via-royal to-charcoal py-12 sm:py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[150px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gold/8 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gold/5 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles size={14} />
          Get Started Today
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto">
          Ready to Plan Your{' '}
          <span className="text-gold">Dream Event</span>?
        </h2>

        <p className="mt-6 text-base sm:text-lg text-white/50 max-w-xl mx-auto">
          Join thousands of happy customers who have created unforgettable moments with FuncBook.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-white hover:text-royal transition-all duration-500"
          >
            Book Your Event
            <ArrowRight size={18} />
          </Link>
          <a
            href="#categories"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 text-white font-semibold text-sm ring-1 ring-white/20 hover:bg-white/20 hover:ring-gold/40 transition-all duration-500"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  )
}
