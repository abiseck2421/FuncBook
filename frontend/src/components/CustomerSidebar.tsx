import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { X, LayoutDashboard, Building2, CalendarCheck, Heart, Star, CreditCard, Settings, HelpCircle, LogOut } from 'lucide-react'

const sidebarNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/customer/dashboard' },
  { label: 'Services', icon: Building2, path: '/services' },
  { label: 'My Bookings', icon: CalendarCheck, path: '/customer/bookings' },
  { label: 'Wishlist', icon: Heart, path: '/customer/wishlist' },
  { label: 'My Reviews', icon: Star, path: '/customer/reviews' },
  { label: 'Payments', icon: CreditCard, path: '/customer/payments' },
]

const sidebarSecondaryItems = [
  { label: 'Settings', icon: Settings, path: '/customer/settings' },
  { label: 'Help & Support', icon: HelpCircle, path: '/customer/help' },
]

type CustomerSidebarProps = {
  isOpen: boolean
  onClose: () => void
  onLogout?: () => void
}

export default function CustomerSidebar({ isOpen, onClose, onLogout }: CustomerSidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node) && isOpen) {
        onClose()
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar drawer */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-[70] h-full w-72 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-[72px] border-b border-black/5 shrink-0">
          <span className="font-heading text-[22px] font-bold tracking-tight text-royal">
            Func<span className="text-gold">Book</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-xl text-charcoal hover:text-royal hover:bg-ivory transition-colors"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {sidebarNavItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => { onClose(); if (item.path) navigate(item.path) }}
                className={`group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 transition-all duration-200 ${
                  isActive
                    ? 'bg-gold/10 text-gold-deep border-gold/20'
                    : 'text-charcoal hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20'
                }`}
              >
                <item.icon
                  size={18}
                  className={`${
                    isActive ? 'text-gold-deep' : 'text-secondary-text group-hover:text-gold-deep'
                  } transition-colors`}
                />
                {item.label}
              </button>
            )
          })}

          <div className="my-2 border-t border-black/5" />

          {sidebarSecondaryItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => { onClose(); if (item.path) navigate(item.path) }}
                className={`group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 transition-all duration-200 ${
                  isActive
                    ? 'bg-gold/10 text-gold-deep border-gold/20'
                    : 'text-charcoal hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20'
                }`}
              >
                <item.icon
                  size={18}
                  className={`${
                    isActive ? 'text-gold-deep' : 'text-secondary-text group-hover:text-gold-deep'
                  } transition-colors`}
                />
                {item.label}
              </button>
            )
          })}

          <div className="my-2 border-t border-black/5" />
        </nav>

        {/* Logout pinned to bottom */}
        <div className="shrink-0 border-t border-black/5 px-3 py-3">
          <button
            type="button"
            onClick={() => { onClose(); onLogout?.() }}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 bg-red-50/80 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
