import HeroSection from '../components/HeroSection'
import BrowseCategories from '../components/BrowseCategories'
import FeaturedHalls from '../components/FeaturedHalls'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <BrowseCategories />
      <FeaturedHalls />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  )
}
