import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, CalendarCheck, Heart, Star, CreditCard,
  Settings, HelpCircle,
} from 'lucide-react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import type { SidebarNavItem } from './components/Sidebar'
import type { AuthSuccessInfo } from './components/AuthModal'

interface UserData {
  email: string
  name: string
  lastName: string
  dob: string
}

const navItems: SidebarNavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/customer/dashboard' },
  { label: 'Services', icon: Building2, path: '/services' },
  { label: 'My Bookings', icon: CalendarCheck, path: '/customer/bookings' },
  { label: 'Wishlist', icon: Heart, path: '/customer/wishlist' },
  { label: 'My Reviews', icon: Star, path: '/customer/reviews' },
  { label: 'Payments', icon: CreditCard, path: '/customer/payments' },
]

const secondaryItems: SidebarNavItem[] = [
  { label: 'Settings', icon: Settings, path: '/customer/settings' },
  { label: 'Help & Support', icon: HelpCircle, path: '/customer/help' },
]

export default function SidebarLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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
    navigate(authRedirectPath || '/')
    setAuthRedirectPath(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('funcbook_auth_user')
    setIsAuthenticated(false)
    setIsSidebarOpen(false)
    navigate('/')
  }

  return (
    <div className="h-screen overflow-hidden bg-ivory">
      {isAuthenticated && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
          navItems={navItems}
          secondaryItems={secondaryItems}
        />
      )}

      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onAuthSuccess={handleAuthSuccess}
        authModalOpen={authModalOpen}
        setAuthModalOpen={setAuthModalOpen}
        onMenuClick={isAuthenticated ? () => setIsSidebarOpen(true) : undefined}
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
