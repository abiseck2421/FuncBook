import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function SidebarLayout() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authRedirectPath, setAuthRedirectPath] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const isAuthenticated = !!localStorage.getItem('funcbook_auth_user')

  const handleAuthSuccess = () => {
    setAuthModalOpen(false)
    localStorage.setItem('funcbook_auth_user', 'user@funcbook.com')
    navigate(authRedirectPath || '/customer/dashboard')
    setAuthRedirectPath(null)
  }

  return (
    <div className="h-screen overflow-hidden bg-ivory">
      <Navbar
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
