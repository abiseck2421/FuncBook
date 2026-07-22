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

export default function ServiceSection({ id, title, services }: ServiceSectionProps) {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const displayed = services.slice(0, INITIAL_COUNT)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const firstChild = container.children[0] as HTMLElement
    if (!firstChild) return
    const gap = parseInt(getComputedStyle(container).gap) || 16
    const cardWidth = firstChild.offsetWidth + gap
    const amount = direction === 'left' ? -cardWidth : cardWidth
    container.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section id={id} className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-6 sm:pb-8 animate-fade-in">
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
        className="flex md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-4 overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory pb-4 md:pb-0 scrollbar-hide px-1"
      >
        {displayed.map((service) => (
          <div
            key={service.id}
            className="w-[min(260px,calc(50%-0.375rem))] md:w-auto md:min-w-0 snap-start md:snap-none shrink-0 md:shrink"
          >
            <ServiceCard service={service} />
          </div>
        ))}
        <button
          onClick={() => navigate(`/services/${id}`)}
          className="flex md:hidden w-[calc(50%-0.5rem)] shrink-0 snap-start items-center justify-center rounded-[18px] border-2 border-dashed border-gold/30 bg-gold/5 hover:bg-gold/10 transition-colors"
        >
          <span className="text-sm font-semibold text-gold-deep">View More</span>
        </button>
      </div>
    </section>
  )
}