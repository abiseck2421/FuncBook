import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceSection from '../components/ServiceSection'
import { categories, servicesByCategory } from '../data/categories'

type LandingPageProps = {
  onAuthSuccess: (email: string) => void
  isAuthenticated: boolean
  userEmail: string
}

export default function LandingPage({ onAuthSuccess, isAuthenticated, userEmail }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar onAuthSuccess={onAuthSuccess} isAuthenticated={isAuthenticated} userEmail={userEmail} />

      <main className="pt-22 sm:pt-28">
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
