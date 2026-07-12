import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authRedirectPath, setAuthRedirectPath] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email)
    setIsAuthenticated(true)
    setAuthModalOpen(false)
    const redirect = authRedirectPath || '/services'
    setAuthRedirectPath(null)
    navigate(redirect)
  }

  const handleLogout = () => {
    setUserEmail('')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar
        onAuthSuccess={handleAuthSuccess}
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
        onLogout={handleLogout}
        authModalOpen={authModalOpen}
        setAuthModalOpen={setAuthModalOpen}
      />

      <main>
        <Outlet context={{ isAuthenticated, authModalOpen, setAuthModalOpen, handleAuthSuccess, setAuthRedirectPath }} />
      </main>

      {location.pathname === '/' && <Footer />}
    </div>
  )
}
