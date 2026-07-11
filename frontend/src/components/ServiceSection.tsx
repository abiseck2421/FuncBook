import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ServiceCard from './ServiceCard'
import type { Service } from '../data/categories'

interface ServiceSectionProps {
  id?: string
  title: string
  services: Service[]
}

const INITIAL_COUNT = 6
const SCROLL_AMOUNT = 280

export default function ServiceSection({ id, title, services }: ServiceSectionProps) {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const displayed = services.slice(0, INITIAL_COUNT)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section id={id} className="w-full max-w-[min(95%,1400px)] mx-auto px-6 pb-6 sm:pb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-royal">{title}</h2>
        <div className="flex items-center gap-3">
          {services.length > INITIAL_COUNT && (
            <button
              onClick={() => navigate(`/services/${id}`)}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-deep transition-colors group"
            >
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
          <button
            onClick={() => scroll('left')}
            className="flex md:hidden w-10 h-10 rounded-full border border-border items-center justify-center text-royal/40 hover:text-royal hover:border-royal transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex md:hidden w-10 h-10 rounded-full border border-border items-center justify-center text-royal/40 hover:text-royal hover:border-royal transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex md:grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
      >
        {displayed.map((service) => (
          <div
            key={service.id}
            className="w-[calc(50%-0.5rem)] md:w-auto md:min-w-0 snap-start md:snap-none shrink-0 md:shrink"
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  )
}