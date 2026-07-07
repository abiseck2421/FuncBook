import ServiceSection from '../components/ServiceSection'
import { categories, servicesByCategory } from '../data/categories'

export default function ServicesPage() {
  return (
    <div className="pt-22 sm:pt-28 pb-16">
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-3">
            All Services
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-royal">
            Browse Premium Services
          </h1>
          <p className="mt-3 text-secondary-text max-w-lg">
            Explore our curated collection of premium event vendors and services
          </p>
        </div>
      </div>

      {categories.map((cat) => {
        const services = servicesByCategory[cat.id]
        if (!services) return null
        return (
          <ServiceSection
            key={cat.id}
            id={cat.id}
            title={cat.name}
            services={services}
          />
        )
      })}
    </div>
  )
}
