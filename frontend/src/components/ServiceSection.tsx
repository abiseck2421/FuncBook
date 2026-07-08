import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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
  const displayed = services.slice(0, INITIAL_COUNT)
  const gridClassName = 'grid gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6'

  return (
    <section id={id} className="w-full max-w-[min(95%,1400px)] mx-auto px-6 pb-6 sm:pb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-royal">{title}</h2>
        {services.length > INITIAL_COUNT && (
          <button
            onClick={() => navigate(`/services/${id}`)}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-deep transition-colors group"
          >
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <div className={gridClassName}>
        {displayed.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}
