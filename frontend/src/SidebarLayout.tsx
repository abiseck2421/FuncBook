import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import type { AuthSuccessInfo } from './components/AuthModal'

export default function SidebarLayout() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authRedirectPath, setAuthRedirectPath] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const isAuthenticated = !!localStorage.getItem('funcbook_auth_user')

  const handleAuthSuccess = (info: AuthSuccessInfo) => {
    setAuthModalOpen(false)
    localStorage.setItem('funcbook_auth_user', JSON.stringify({
      email: info.email ?? '',
      name: info.name,
      lastName: info.lastName,
      dob: info.dob,
    }))
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
