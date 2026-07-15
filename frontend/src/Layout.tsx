import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function Layout() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const location = useLocation()

  const handleAuthSuccess = () => {
    setAuthModalOpen(false)
  }

  return (
    <div className="h-screen overflow-hidden bg-ivory">
      <Navbar
        onAuthSuccess={handleAuthSuccess}
        authModalOpen={authModalOpen}
        setAuthModalOpen={setAuthModalOpen}
      />

      <main className="w-full h-[calc(100vh-72px)] overflow-y-auto">
        <Outlet context={{ authModalOpen, setAuthModalOpen, handleAuthSuccess }} />
        {location.pathname === '/' && <Footer />}
      </main>
    </div>
  )
}
