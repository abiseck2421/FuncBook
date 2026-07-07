import { Search, ArrowRightLeft, CalendarCheck, PartyPopper } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Search Services',
    desc: 'Browse through our curated collection of premium event vendors and venues.',
    color: 'from-gold/20 to-gold/5',
  },
  {
    icon: ArrowRightLeft,
    title: 'Compare Vendors',
    desc: 'Review ratings, pricing, and portfolios to find your perfect match.',
    color: 'from-gold-deep/20 to-gold-deep/5',
  },
  {
    icon: CalendarCheck,
    title: 'Book Instantly',
    desc: 'Secure your booking with transparent pricing and easy payment options.',
    color: 'from-gold/20 to-gold/5',
  },
  {
    icon: PartyPopper,
    title: 'Celebrate Your Event',
    desc: 'Relax and enjoy your special day while we handle the rest.',
    color: 'from-gold-deep/20 to-gold-deep/5',
  },
]

export default function HowItWorks() {
  return (
    <section className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-12 sm:py-16">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-4">
          How It Works
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-royal">
          Plan in Four Simple Steps
        </h2>
        <p className="mt-4 text-secondary-text max-w-md mx-auto">
          From browsing to celebrating, we make your event planning effortless
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={step.title} className="relative group">
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${step.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex items-center justify-center group-hover:shadow-[0_8px_32px_rgba(184,134,11,0.15)] transition-shadow duration-500">
                  <Icon size={28} className="text-gold-deep" />
                </div>

                <div className="mt-6 w-8 h-8 mx-auto rounded-full bg-gold/10 text-gold-deep text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </div>

                <h3 className="mt-4 font-heading text-xl font-bold text-royal">{step.title}</h3>
                <p className="mt-2 text-sm text-secondary-text leading-relaxed">{step.desc}</p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
