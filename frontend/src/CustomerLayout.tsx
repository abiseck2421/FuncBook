import { useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, CalendarCheck, Heart, Star, CreditCard,
  Settings, HelpCircle,
} from 'lucide-react'
import AfterLoginNavbar from './components/AfterLoginNavbar'
import Sidebar from './components/Sidebar'
import type { SidebarNavItem } from './components/Sidebar'
import type { NavbarDropdownItem } from './components/AfterLoginNavbar'

const customerNavItems: SidebarNavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/customer/dashboard' },
  { label: 'Services', icon: Building2, path: '/services' },
  { label: 'My Bookings', icon: CalendarCheck, path: '/customer/bookings' },
  { label: 'Wishlist', icon: Heart, path: '/customer/wishlist' },
  { label: 'My Reviews', icon: Star, path: '/customer/reviews' },
  { label: 'Payments', icon: CreditCard, path: '/customer/payments' },
]

const customerSecondaryItems: SidebarNavItem[] = [
  { label: 'Settings', icon: Settings, path: '/customer/settings' },
  { label: 'Help & Support', icon: HelpCircle, path: '/customer/help' },
]

const customerDropdownItems: NavbarDropdownItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/customer/dashboard' },
  { label: 'Account Settings', icon: Settings, path: '/customer/settings' },
  { label: 'Become a Host', icon: Building2, path: '/become-host' },
]

export default function CustomerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('funcbook_auth_user')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') return parsed
      }
    } catch {
      // old plain-string value, ignore
    }
    return { email: 'user@funcbook.com', name: '' }
  }, [])

  const userEmail = user.email || 'user@funcbook.com'
  const userName = typeof user.name === 'string' ? user.name : ''

  const handleLogout = () => {
    localStorage.removeItem('funcbook_auth_user')
    navigate('/')
  }

  return (
    <div className="h-screen overflow-hidden bg-ivory">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        navItems={customerNavItems}
        secondaryItems={customerSecondaryItems}
      />

      <div className="h-full flex flex-col">
        <AfterLoginNavbar
          onMenuClick={() => setIsSidebarOpen(true)}
          userEmail={userEmail}
          userName={userName}
          onLogout={handleLogout}
          logoHref="/"
          dropdownItems={customerDropdownItems}
        />

        <main className="flex-1 overflow-y-auto pt-4 sm:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
