import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ServiceCard from './ServiceCard'
import type { Service } from '../data/categories'

const halls: Service[] = [
  {
    id: 'fh-featured-1',
    name: 'Royal Grand Palace',
    location: 'Chennai',
    description: '500 Guests capacity venue',
    rating: 5.0,
    reviewCount: 128,
    price: 150000,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
    tags: ['Premium', 'AC', 'Valet'],
    verified: true,
  },
  {
    id: 'fh-featured-2',
    name: 'Crystal Convention Centre',
    location: 'Bangalore',
    description: '800 Guests capacity venue',
    rating: 4.9,
    reviewCount: 215,
    price: 200000,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
    tags: ['Convention', 'Premium'],
    verified: true,
  },
  {
    id: 'fh-featured-3',
    name: 'The Golden Pearl Hall',
    location: 'Hyderabad',
    description: '350 Guests capacity venue',
    rating: 4.8,
    reviewCount: 96,
    price: 120000,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop',
    tags: ['Elegant', 'AC'],
    verified: true,
  },
  {
    id: 'fh-featured-4',
    name: 'Emerald Garden Estate',
    location: 'Mumbai',
    description: '600 Guests capacity venue',
    rating: 4.9,
    reviewCount: 183,
    price: 250000,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop',
    tags: ['Garden', 'Premium'],
    verified: true,
  },
]

const SCROLL_AMOUNT = 280

export default function FeaturedHalls() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section id="featured-halls" className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-12 sm:py-16 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-3">
            Featured Venues
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-royal">
            Premium Function Halls
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-deep transition-colors group">
            View All
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
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
        className="flex md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
      >
        {halls.map((hall) => (
          <div
            key={hall.id}
            className="w-[calc(50%-0.5rem)] md:w-auto md:min-w-0 snap-start md:snap-none shrink-0 md:shrink"
          >
            <ServiceCard service={hall} />
          </div>
        ))}
      </div>
    </section>
  )
}
