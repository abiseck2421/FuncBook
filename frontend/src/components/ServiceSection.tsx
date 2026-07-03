import { ArrowRight } from 'lucide-react'
import ServiceCard from './ServiceCard'
import type { Service } from '../data/categories'

interface ServiceSectionProps {
  id?: string
  title: string
  services: Service[]
}

export default function ServiceSection({ id, title, services }: ServiceSectionProps) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-6 py-6 sm:py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-royal">{title}</h2>
        <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-deep transition-colors group">
          View All
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}
