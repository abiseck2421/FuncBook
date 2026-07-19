import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, CalendarCheck, Heart, Star, CreditCard,
  Settings, HelpCircle, DollarSign, BarChart3,
} from 'lucide-react'
import AfterLoginNavbar from './components/AfterLoginNavbar'
import Sidebar from './components/Sidebar'
import type { SidebarNavItem } from './components/Sidebar'
import type { NavbarDropdownItem } from './components/AfterLoginNavbar'

export type DashboardType = 'customer' | 'host'

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

const hostNavItems: SidebarNavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/host/dashboard' },
  { label: 'My Services', icon: Building2, path: '/host/services' },
  { label: 'Bookings', icon: CalendarCheck, path: '/host/bookings' },
  { label: 'Add New Service', icon: Building2, path: '/host/add-service' },
  { label: 'Analytics', icon: BarChart3, path: '/host/analytics' },
  { label: 'Reviews', icon: Star, path: '/host/reviews' },
  { label: 'Earnings', icon: DollarSign, path: '/host/earnings' },
]

const hostSecondaryItems: SidebarNavItem[] = [
  { label: 'Profile', icon: Settings, path: '/host/profile' },
  { label: 'Settings', icon: Settings, path: '/host/settings' },
  { label: 'Help & Support', icon: HelpCircle, path: '/customer/help' },
]

const hostDropdownItems: NavbarDropdownItem[] = [
  { label: 'Host Dashboard', icon: LayoutDashboard, path: '/host/dashboard' },
  { label: 'My Services', icon: Building2, path: '/host/services' },
  { label: 'Add New Service', icon: Building2, path: '/host/add-service' },
]

const layoutConfig: Record<DashboardType, {
  navItems: SidebarNavItem[]
  secondaryItems: SidebarNavItem[]
  logoHref: string
  dropdownItems: NavbarDropdownItem[]
}> = {
  customer: {
    navItems: customerNavItems,
    secondaryItems: customerSecondaryItems,
    logoHref: '/customer/dashboard',
    dropdownItems: customerDropdownItems,
  },
  host: {
    navItems: hostNavItems,
    secondaryItems: hostSecondaryItems,
    logoHref: '/host/dashboard',
    dropdownItems: hostDropdownItems,
  },
}

type CustomerLayoutProps = {
  type?: DashboardType
}

export default function CustomerLayout({ type = 'customer' }: CustomerLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userEmail] = useState('user@funcbook.com')
  const navigate = useNavigate()

  const config = layoutConfig[type]

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
        navItems={config.navItems}
        secondaryItems={config.secondaryItems}
      />

      <div className="h-full flex flex-col">
        <AfterLoginNavbar
          onMenuClick={() => setIsSidebarOpen(true)}
          userEmail={userEmail}
          onLogout={handleLogout}
          logoHref={config.logoHref}
          dropdownItems={config.dropdownItems}
        />

        <main className="flex-1 overflow-y-auto pt-4 sm:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
