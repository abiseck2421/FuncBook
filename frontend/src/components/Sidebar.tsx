import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { X, LogOut } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SidebarNavItem {
  label: string
  icon: LucideIcon
  path: string
}

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
  onLogout?: () => void
  navItems: SidebarNavItem[]
  secondaryItems: SidebarNavItem[]
}

function SidebarLink({ item, onNavigate }: { item: SidebarNavItem; onNavigate: () => void }) {
  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border transition-colors duration-200 outline-none ${
          isActive
            ? 'bg-gold-deep text-white border-gold-deep shadow-[0_2px_8px_rgba(184,134,11,0.2)]'
            : 'text-charcoal border-transparent hover:bg-[#FFF8E8] hover:text-gold-deep hover:border-gold/20 focus-visible:ring-2 focus-visible:ring-gold-deep/40'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            size={18}
            className={`shrink-0 transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-secondary-text'
            }`}
          />
          {item.label}
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar({ isOpen, onClose, onLogout, navItems, secondaryItems }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isOpen) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Close mobile sidebar on outside click or Escape
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Close mobile sidebar on any nav click
  const handleNavigate = () => {
    onClose()
  }

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-[72px] border-b border-black/5 shrink-0">
        <span className="font-heading text-[22px] font-bold tracking-tight text-royal">
          Func<span className="text-gold">Book</span>
        </span>
        {/* Close button — mobile only */}
        <button
          type="button"
          onClick={onClose}
          className="p-2 -mr-2 rounded-xl text-charcoal hover:text-royal hover:bg-ivory focus-visible:ring-2 focus-visible:ring-gold-deep/40 transition-colors duration-200 outline-none"
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <SidebarLink key={item.label} item={item} onNavigate={handleNavigate} />
        ))}

        <div className="my-2 border-t border-black/5" />

        {secondaryItems.map((item) => (
          <SidebarLink key={item.label} item={item} onNavigate={handleNavigate} />
        ))}

        <div className="my-2 border-t border-black/5" />
      </nav>

      {/* Logout pinned to bottom */}
      <div className="shrink-0 border-t border-black/5 px-3 py-3">
        <button
          type="button"
          onClick={() => { onClose(); onLogout?.() }}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 bg-red-50/60 border border-transparent hover:bg-red-100 hover:text-red-600 hover:border-red-200 focus-visible:ring-2 focus-visible:ring-red-400/40 transition-colors duration-200 outline-none"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Backdrop */}
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
        {sidebarContent}
      </aside>
    </>
  )
}
