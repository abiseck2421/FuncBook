import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Globe, Menu, LogIn, UserPlus, X } from 'lucide-react'

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

const authMenuItems: Array<{
  key: 'login' | 'signup'
  label: string
  icon: typeof LogIn
}> = [
  { key: 'login', label: 'Login or Sign In', icon: LogIn },
  { key: 'signup', label: 'Sign Up', icon: UserPlus },
]

type NavbarProps = {
  onAuthSuccess: () => void
}

export default function Navbar({ onAuthSuccess }: NavbarProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const authSubmitLocked = useRef(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAuthModalOpen(false)
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

    authSubmitLocked.current = true
    setAuthModalOpen(false)
    onAuthSuccess()

    window.setTimeout(() => {
      authSubmitLocked.current = false
    }, 0)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-ivory shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
        <div className="flex min-h-[72px] items-center justify-between gap-4 py-4 sm:py-4">
          <span className="font-heading text-[26px] font-bold tracking-tight text-royal shrink-0">
            Func<span className="text-gold">Book</span>
          </span>

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

              {mobileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 overflow-hidden">
                  <div className="p-2 space-y-1">
                    {authMenuItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => {
                            setAuthMode(item.key)
                            setAuthModalOpen(true)
                            setMobileMenuOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-charcoal bg-ivory hover:bg-gold-deep hover:text-white rounded-xl transition-colors"
                        >
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
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
                    {authMode === 'login' ? 'Welcome back' : 'Create account'}
                  </p>
                  <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-royal sm:text-5xl">
                    {authMode === 'login'
                      ? 'Log in to continue your event planning.'
                      : 'Join FuncBook and start planning faster.'}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-secondary-text sm:text-base">
                    {authMode === 'login'
                      ? 'Access your saved vendors, shortlist, and booking progress from one secure place.'
                      : 'Create an account to save vendors, compare services, and manage your booking workflow.'}
                  </p>
                </div>

                <div className="mt-8 rounded-[24px] bg-white/75 p-5 ring-1 ring-black/5 backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                    {authMode === 'login' ? 'Need an account?' : 'Already have an account?'}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-secondary-text">
                    {authMode === 'login'
                      ? 'Use the Sign Up tab to create your FuncBook profile and save your vendor shortlist.'
                      : 'Switch to Login to continue with your existing booking details and saved preferences.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white transition hover:bg-charcoal"
                  >
                    {authMode === 'login' ? 'Go to Sign Up' : 'Go to Login'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 pb-14 sm:p-10 lg:p-12 lg:pb-16">
                <div className="mb-6 flex rounded-full bg-ivory p-1 text-sm font-semibold">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 rounded-full px-4 py-2 transition ${authMode === 'login' ? 'bg-white text-royal shadow-sm' : 'text-secondary-text'}`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 rounded-full px-4 py-2 transition ${authMode === 'signup' ? 'bg-white text-royal shadow-sm' : 'text-secondary-text'}`}
                  >
                    Sign Up
                  </button>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={handleAuthSubmit}
                >
                  {authMode === 'signup' && (
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-charcoal">
                        Full name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-ivory/60 px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold-deep focus:bg-white"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="auth-email" className="text-sm font-medium text-charcoal">
                      Email address
                    </label>
                    <input
                      id="auth-email"
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
                      placeholder={authMode === 'login' ? 'Enter your password' : 'Create a password'}
                      className="mt-2 w-full rounded-2xl border border-black/10 bg-ivory/60 px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold-deep focus:bg-white"
                    />
                  </div>

                  {authMode === 'login' ? (
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <label className="flex items-center gap-2 text-secondary-text">
                        <input type="checkbox" className="h-4 w-4 rounded border-black/20 text-gold-deep focus:ring-gold-deep" />
                        Remember me
                      </label>
                      <a href="#" className="font-medium text-royal hover:text-gold-deep">
                        Forgot password?
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-secondary-text">
                      By signing up, you agree to our terms and privacy policy.
                    </p>
                  )}

                  <button
                    type="submit"
                    onClick={handleAuthSubmit}
                    className="w-full rounded-2xl bg-gold-deep px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(214,169,97,0.26)] transition hover:bg-royal"
                  >
                    {authMode === 'login' ? 'Login' : 'Create Account'}
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