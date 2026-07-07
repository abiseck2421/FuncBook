import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, Globe, Menu, LogIn, X } from 'lucide-react'

type MenuKey = 'services' | 'about' | 'contact' | 'help'

const megaMenuItems: Record<
  MenuKey,
  { title: string; links: string[]; contentGridClass: string }
> = {
  services: {
    title: 'Services',
    contentGridClass: 'lg:grid-cols-4',
    links: [
      'Function Halls',
      'Catering',
      'Decoration',
      'Photography',
      'Videography',
      'Makeup Artists',
      'Lighting & Sound',
      'Stage Setup',
      'Chairs & Tables',
      'Event Planners',
      'Invitation Cards',
      'Return Gifts',
    ],
  },
  about: {
    title: 'About Us',
    contentGridClass: 'lg:grid-cols-3',
    links: [
      'Our Story',
      'Mission & Vision',
      'Why Choose FuncBook',
      'Our Team',
      'Careers',
      'Blog',
      'Testimonials',
    ],
  },
  contact: {
    title: 'Contact',
    contentGridClass: 'lg:grid-cols-3',
    links: [
      'Contact Us',
      'Customer Support',
      'Vendor Support',
      'Business Enquiries',
      'Partner With Us',
      'Office Locations',
    ],
  },
  help: {
    title: 'Help',
    contentGridClass: 'lg:grid-cols-3',
    links: [
      'Help Center',
      'FAQs',
      'Booking Guide',
      'Cancellation Policy',
      'Privacy Policy',
      'Terms & Conditions',
      'Report an Issue',
    ],
  },
}

const navItems: Array<{ key: MenuKey; label: string }> = [
  { key: 'services', label: 'Services' },
  { key: 'about', label: 'About Us' },
  { key: 'contact', label: 'Contact' },
  { key: 'help', label: 'Help' },
]

const dashboardNavItems: Array<{ label: string; page: 'home' | 'services' | 'payout' | 'wishlist' | 'review' }> = [
  { label: 'Dashboard', page: 'home' },
  { label: 'Services', page: 'services' },
  { label: 'Payout History', page: 'payout' },
  { label: 'Wishlist', page: 'wishlist' },
  { label: 'Review', page: 'review' },
]

const accountMenuItems = [
  'Wishlists',
  'Messages',
  'Profile',
  'Notifications',
  'Account settings',
  'Languages & currency',
  'Help Centre',
  'Become a host',
  'Refer a host',
]

type NavbarProps = {
  onAuthSuccess: (email: string) => void
  isAuthenticated: boolean
  userEmail: string
  currentPage: string
  onLogout?: () => void
}

export default function Navbar({ onAuthSuccess, isAuthenticated, userEmail, currentPage, onLogout }: NavbarProps) {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const authSubmitLocked = useRef(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
        setAccountMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAuthModalOpen(false)
        setAccountMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleAuthSubmit = (event?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()

    if (authSubmitLocked.current) {
      return
    }

    const form = event?.currentTarget instanceof HTMLFormElement ? event.currentTarget : undefined
    const emailValue = form ? new FormData(form).get('auth-email')?.toString().trim() : ''

    authSubmitLocked.current = true
    setAuthModalOpen(false)
    onAuthSuccess(emailValue || 'user@example.com')

    window.setTimeout(() => {
      authSubmitLocked.current = false
    }, 0)
  }

  const userInitial = (userEmail.trim().charAt(0) || 'U').toUpperCase()

  if (isAuthenticated) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-ivory shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
        <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
          <div className="flex min-h-[72px] items-center justify-between gap-4 py-4 sm:py-4">
            <Link to="/" className="font-heading text-[26px] font-bold tracking-tight text-royal shrink-0">
              Func<span className="text-gold">Book</span>
            </Link>

            <nav className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-10">
              {dashboardNavItems.map((item) => {
                const isActive = currentPage === item.page
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate('/' + (item.page === 'home' ? '' : item.page))}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive
                        ? 'text-royal bg-white/80 shadow-[0_4px_18px_rgba(0,0,0,0.06)]'
                        : 'text-charcoal hover:text-royal hover:bg-white/60'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>

            <div className="relative flex items-center gap-2 shrink-0" ref={menuRef}>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gold-deep text-sm font-bold text-white ring-1 ring-black/5">
                {userInitial}
              </div>
              <button
                type="button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-charcoal ring-1 ring-black/5 transition hover:text-royal"
                aria-label="Open account menu"
                aria-expanded={accountMenuOpen}
              >
                <Menu size={18} />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                  <div className="max-h-[70vh] overflow-auto py-2">
                    <div className="px-4 pb-3 pt-2">
                      <p className="text-sm font-semibold text-royal">{userEmail || 'Akhil'}</p>
                      <p className="text-xs text-secondary-text">Your account</p>
                    </div>

                    <div className="border-t border-black/5" />

                    <div>
                      {accountMenuItems.map((item) => (
                        <button
                          key={item}
                          type="button"
                          className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-charcoal transition-colors hover:bg-ivory hover:text-royal"
                          onClick={() => setAccountMenuOpen(false)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-black/5" />

                    <button
                      type="button"
                      className="flex w-full items-center px-4 py-3 text-left text-sm font-semibold text-charcoal transition-colors hover:bg-ivory hover:text-royal"
                      onClick={() => {
                        setAccountMenuOpen(false)
                        onLogout?.()
                      }}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:hidden pb-1">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-charcoal">
              {dashboardNavItems.map((item) => {
                const isActive = currentPage === item.page
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate('/' + (item.page === 'home' ? '' : item.page))}
                    className={`rounded-full px-3 py-2 transition-colors ${isActive ? 'bg-royal text-white' : 'bg-transparent hover:text-royal'}`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-ivory shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
        <div className="flex min-h-[72px] items-center justify-between gap-4 py-4 sm:py-4">
          <Link to="/" className="font-heading text-[26px] font-bold tracking-tight text-royal shrink-0">
            Func<span className="text-gold">Book</span>
          </Link>

          <nav className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-10">
            {navItems.map((item) => {
              const menu = megaMenuItems[item.key]
              const isOpen = activeMenu === item.key

              return (
                <div
                  key={item.key}
                  className="group relative"
                  onMouseEnter={() => setActiveMenu(item.key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isOpen ? 'text-royal bg-white/80 shadow-[0_4px_18px_rgba(0,0,0,0.06)]' : 'text-charcoal hover:text-royal hover:bg-white/60'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </button>

                  <div
                    className={`absolute left-1/2 top-full w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-all duration-300 ${
                      isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'pointer-events-none opacity-0 -translate-y-2'
                    }`}
                  >
                    <div
                      className="rounded-b-[28px] rounded-t-[24px] bg-white shadow-[0_18px_50px_rgba(17,17,17,0.12)] ring-1 ring-black/5 overflow-hidden"
                      onMouseEnter={() => setActiveMenu(item.key)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <div className="grid gap-px bg-black/5 lg:grid-cols-[1.1fr_1fr_1fr_1fr] items-stretch">
                        <div className="bg-ivory/70 p-7 sm:p-9 min-h-[260px]">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                            {menu.title}
                          </p>
                          <h3 className="mt-3 font-heading text-3xl font-bold text-royal">
                            Premium event planning, all in one place.
                          </h3>
                          <p className="mt-4 max-w-sm text-sm leading-6 text-secondary-text">
                            Curated vendors, elegant execution, and a polished booking experience for every celebration.
                          </p>
                        </div>

                        <div className={`grid gap-px bg-black/5 p-4 sm:p-5 sm:grid-cols-2 lg:col-span-3 ${menu.contentGridClass}`}>
                          {menu.links.map((link) => (
                            <a
                              key={link}
                              href="#"
                              className="group/item flex min-h-[56px] items-center justify-between rounded-[14px] bg-white px-5 py-4 text-left text-sm font-medium text-charcoal transition-all duration-200 hover:bg-ivory hover:text-royal"
                            >
                              <span>{link}</span>
                              <span className="h-2 w-2 rounded-full bg-gold/0 transition-all duration-200 group-hover/item:bg-gold" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <button className="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-royal transition-colors">
                <Globe size={16} />
                <span className="hidden sm:inline">Language</span>
              </button>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal hover:text-royal transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {mobileMenuOpen && !isAuthenticated && (
                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                  <div className="divide-y divide-black/5">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthModalOpen(true)
                        setMobileMenuOpen(false)
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-ivory hover:text-royal"
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </button>
                    <a href="#" className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-ivory hover:text-royal" onClick={() => setMobileMenuOpen(false)}>
                      <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-current text-[10px] leading-none">B</span>
                      <span>Become host</span>
                    </a>
                    <a href="#" className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-ivory hover:text-royal" onClick={() => setMobileMenuOpen(false)}>
                      <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-current text-[10px] leading-none">?</span>
                      <span>Help Center</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:hidden pb-1">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-charcoal">
            {navItems.map((item) => (
              <a key={item.key} href="#" className="flex items-center gap-1 hover:text-royal transition-colors">
                <span>{item.label}</span>
                <ChevronDown size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {authModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/55 px-4 py-6 backdrop-blur-[2px]">
          <div className="relative w-full max-w-[min(92vw,980px)] overflow-hidden rounded-[32px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-ivory p-2 text-charcoal transition hover:bg-gold-deep hover:text-white"
              aria-label="Close login dialog"
            >
              <X size={18} />
            </button>

            <div className="grid lg:min-h-[560px] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col justify-between bg-[linear-gradient(135deg,rgba(214,169,97,0.18),rgba(255,255,255,0.96))] p-7 sm:p-10 lg:p-12">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                    Welcome back
                  </p>
                  <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-royal sm:text-5xl">
                    Log in to continue your event planning.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-secondary-text sm:text-base">
                    Access your saved vendors, shortlist, and booking progress from one secure place.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 pb-14 sm:p-10 lg:p-12 lg:pb-16">
                <form
                  className="space-y-4"
                  onSubmit={handleAuthSubmit}
                >
                  <div>
                    <label htmlFor="auth-email" className="text-sm font-medium text-charcoal">
                      Email address
                    </label>
                    <input
                      id="auth-email"
                      name="auth-email"
                      type="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-ivory/60 px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold-deep focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="auth-password" className="text-sm font-medium text-charcoal">
                      Password
                    </label>
                    <input
                      id="auth-password"
                      type="password"
                      placeholder="Enter your password"
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-ivory/60 px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold-deep focus:bg-white"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <label className="flex items-center gap-2 text-secondary-text">
                      <input type="checkbox" className="h-4 w-4 rounded border-black/20 text-gold-deep focus:ring-gold-deep" />
                      Remember me
                    </label>
                    <a href="#" className="font-medium text-royal hover:text-gold-deep">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    onClick={handleAuthSubmit}
                    className="w-full rounded-2xl bg-gold-deep px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(214,169,97,0.26)] transition hover:bg-royal"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}