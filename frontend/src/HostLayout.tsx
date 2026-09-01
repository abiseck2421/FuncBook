import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, CalendarCheck, BarChart3,
  Star, CreditCard, Settings, HelpCircle,
} from 'lucide-react'
import AfterLoginNavbar from './components/AfterLoginNavbar'
import Sidebar from './components/Sidebar'
import type { SidebarNavItem } from './components/Sidebar'
import type { NavbarDropdownItem } from './components/AfterLoginNavbar'
import { useHostAuth } from './contexts/hostAuth'

const hostNavItems: SidebarNavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/host/dashboard' },
  { label: 'My Services', icon: Building2, path: '/host/services' },
  { label: 'Bookings', icon: CalendarCheck, path: '/host/bookings' },
  { label: 'Add New Service', icon: Building2, path: '/host/add-service' },
  { label: 'Analytics', icon: BarChart3, path: '/host/analytics' },
  { label: 'Reviews', icon: Star, path: '/host/reviews' },
  { label: 'Payments', icon: CreditCard, path: '/host/payments' },
]

const hostSecondaryItems: SidebarNavItem[] = [
  { label: 'Settings', icon: Settings, path: '/host/settings' },
  { label: 'Help & Support', icon: HelpCircle, path: '/host/help' },
]

const hostDropdownItems: NavbarDropdownItem[] = [
  { label: 'Host Dashboard', icon: LayoutDashboard, path: '/host/dashboard' },
  { label: 'My Services', icon: Building2, path: '/host/services' },
  { label: 'Add New Service', icon: Building2, path: '/host/add-service' },
  { label: 'Settings', icon: Settings, path: '/host/settings' },
]

export default function HostLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { hostEmail, logout } = useHostAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/become-host')
    logout()
  }

  return (
    <div className="h-screen overflow-hidden bg-ivory">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        navItems={hostNavItems}
        secondaryItems={hostSecondaryItems}
      />

      <div className="h-full flex flex-col">
        <AfterLoginNavbar
          onMenuClick={() => setIsSidebarOpen(true)}
          userEmail={hostEmail ?? 'host@funcbook.com'}
          onLogout={handleLogout}
          logoHref="/host/dashboard"
          dropdownItems={hostDropdownItems}
        />

        <main className="flex-1 overflow-y-auto pt-4 sm:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
