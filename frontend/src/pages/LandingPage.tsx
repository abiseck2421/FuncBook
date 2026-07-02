import { useState } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import LoginModal from '../components/LoginModal'

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />
      <HeroSection />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  )
}
