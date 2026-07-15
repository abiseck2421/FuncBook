import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Menu, LayoutDashboard, Settings, Building2, LogOut } from 'lucide-react'

type CustomerNavbarProps = {
  onMenuClick: () => void
  userEmail: string
  onLogout?: () => void
}

export default function CustomerNavbar({ onMenuClick, userEmail, onLogout }: CustomerNavbarProps) {
  const navigate = useNavigate()
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAccountMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const userInitial = (userEmail.trim().charAt(0) || 'U').toUpperCase()

  return (
    <header className="relative z-50 bg-ivory shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
        <div className="flex min-h-[72px] items-center justify-between gap-4 py-4 sm:py-4">
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onMenuClick}
              className="p-2 -ml-2 rounded-xl text-charcoal hover:text-royal hover:bg-white/80 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
            <Link to="/customer/dashboard" className="font-heading text-[26px] font-bold tracking-tight text-royal shrink-0">
              Func<span className="text-gold">Book</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 shrink-0" ref={menuRef}>
            <button className="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-royal transition-colors">
              <Globe size={16} />
              <span className="hidden sm:inline">Language</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="grid h-10 w-10 place-items-center rounded-full bg-gold-deep text-sm font-bold text-white ring-1 ring-black/5 transition hover:ring-gold-deep"
              aria-label="Open account menu"
              aria-expanded={accountMenuOpen}
            >
              {userInitial}
            </button>

            {accountMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                <div className="max-h-[70vh] overflow-auto py-2">
                  <div className="px-4 pb-3 pt-2">
                    <p className="text-sm font-semibold text-royal">{userEmail}</p>
                    <p className="text-xs text-secondary-text">Your account</p>
                  </div>
                  <div className="border-t border-black/5" />
                  <div className="py-1">
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-charcoal transition-colors hover:bg-ivory hover:text-royal"
                      onClick={() => { setAccountMenuOpen(false); navigate('/customer/dashboard') }}
                    >
                      <LayoutDashboard size={16} className="text-gold-deep/60" />
                      Dashboard
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-charcoal transition-colors hover:bg-ivory hover:text-royal"
                      onClick={() => { setAccountMenuOpen(false); navigate('/customer/settings') }}
                    >
                      <Settings size={16} className="text-gold-deep/60" />
                      Account Settings
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-charcoal transition-colors hover:bg-ivory hover:text-royal"
                      onClick={() => { setAccountMenuOpen(false); navigate('/become-host') }}
                    >
                      <Building2 size={16} className="text-gold-deep/60" />
                      Become a Host
                    </button>
                  </div>
                  <div className="border-t border-black/5" />
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold text-red-500 bg-red-50/80 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => { setAccountMenuOpen(false); onLogout?.() }}
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
