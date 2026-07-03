import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceSection from '../components/ServiceSection'
import { categories, servicesByCategory } from '../data/categories'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar onMenuClick={() => {}} />

      <main className="pt-2 sm:pt-3">
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
      </main>

      <Footer />
    </div>
  )
}
