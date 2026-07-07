import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    event: 'Wedding',
    review: 'FuncBook made our wedding planning absolutely seamless. From the grand hall to the exquisite catering, every vendor exceeded our expectations. The platform is truly premium!',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    event: 'Corporate Event',
    review: 'We booked our annual corporate gala through FuncBook. The vendor selection was outstanding and the booking process was incredibly smooth. Highly recommended for corporate events.',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    event: 'Birthday Party',
    review: 'My daughter\'s birthday was made extra special thanks to FuncBook. The decorators and caterers were phenomenal. Everything was arranged perfectly!',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    event: 'Reception',
    review: 'An exceptional platform for event planning. The transparency in pricing and quality of vendors truly sets FuncBook apart. Our reception was a grand success!',
    rating: 4,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)

  const t = testimonials[current]

  return (
    <section className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-12 sm:py-16">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-4">
          Testimonials
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-royal">
          What Our Clients Say
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 sm:p-12">
          <Quote size={40} className="absolute top-6 left-6 text-gold/10" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={t.photo}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-gold/20"
              />
              <div>
                <p className="font-heading text-lg font-bold text-royal">{t.name}</p>
                <p className="text-xs text-secondary-text">{t.event}</p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-charcoal leading-relaxed italic">&ldquo;{t.review}&rdquo;</p>

            <div className="flex items-center gap-1 mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < t.rating ? 'fill-gold text-gold' : 'text-black/10'}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-charcoal hover:text-gold-deep hover:shadow-[0_4px_16px_rgba(184,134,11,0.15)] transition-all"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-gold-deep w-6' : 'bg-black/10 hover:bg-black/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-charcoal hover:text-gold-deep hover:shadow-[0_4px_16px_rgba(184,134,11,0.15)] transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
