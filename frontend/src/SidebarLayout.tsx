import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import type { AuthSuccessInfo } from './components/AuthModal'

interface UserData {
  email: string
  name: string
  lastName: string
  dob: string
}

export default function SidebarLayout() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authRedirectPath, setAuthRedirectPath] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('funcbook_auth_user'))
  const [user, setUser] = useState<UserData | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem('funcbook_auth_user')
    if (raw) {
      try {
        setUser(JSON.parse(raw))
      } catch {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }, [isAuthenticated])

  const handleAuthSuccess = (info: AuthSuccessInfo) => {
    setAuthModalOpen(false)
    localStorage.setItem('funcbook_auth_user', JSON.stringify({
      email: info.email ?? '',
      name: info.name,
      lastName: info.lastName,
      dob: info.dob,
    }))
    setIsAuthenticated(true)
    navigate(authRedirectPath || '/customer/dashboard')
    setAuthRedirectPath(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('funcbook_auth_user')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <div className="h-screen overflow-hidden bg-ivory">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onAuthSuccess={handleAuthSuccess}
        authModalOpen={authModalOpen}
        setAuthModalOpen={setAuthModalOpen}
      />

        <main className="w-full h-[calc(100vh-72px)] overflow-y-auto pt-4 sm:pt-6">
        <Outlet
          context={{
            authModalOpen,
            setAuthModalOpen,
            handleAuthSuccess,
            isAuthenticated,
            authRedirectPath,
            setAuthRedirectPath,
          }}
        />
        {location.pathname === '/' && <Footer />}
      </main>
    </div>
  )
}
