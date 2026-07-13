import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, Globe, Menu, LogIn, X, Building2, UtensilsCrossed, Sparkles, Camera, Video, Palette, Lightbulb, LayoutTemplate, Armchair, CalendarDays, Mail, Gift, BookOpen, Target, Star, Users, Briefcase, FileText, Quote, Phone, Headphones, Handshake, UserPlus, MapPin, HelpCircle, MessageCircleQuestion, BookCheck, Ban, Shield, FileCheck, AlertTriangle, LayoutDashboard, CalendarCheck, Heart, CreditCard, Settings, LogOut } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AuthModal from './AuthModal'

type MenuKey = 'services' | 'about' | 'contact' | 'help'

const megaMenuItems: Record<
  MenuKey,
  { title: string; links: { label: string; icon: LucideIcon }[]; contentGridClass: string }
> = {
  services: {
    title: 'Services',
    contentGridClass: 'lg:grid-cols-4',
    links: [
      { label: 'Function Halls', icon: Building2 },
      { label: 'Catering', icon: UtensilsCrossed },
      { label: 'Decoration', icon: Sparkles },
      { label: 'Photography', icon: Camera },
      { label: 'Videography', icon: Video },
      { label: 'Makeup Artists', icon: Palette },
      { label: 'Lighting & Sound', icon: Lightbulb },
      { label: 'Stage Setup', icon: LayoutTemplate },
      { label: 'Chairs & Tables', icon: Armchair },
      { label: 'Event Planners', icon: CalendarDays },
      { label: 'Invitation Cards', icon: Mail },
      { label: 'Return Gifts', icon: Gift },
    ],
  },
  about: {
    title: 'About Us',
    contentGridClass: 'lg:grid-cols-3',
    links: [
      { label: 'Our Story', icon: BookOpen },
      { label: 'Mission & Vision', icon: Target },
      { label: 'Why Choose FuncBook', icon: Star },
      { label: 'Our Team', icon: Users },
      { label: 'Careers', icon: Briefcase },
      { label: 'Blog', icon: FileText },
      { label: 'Testimonials', icon: Quote },
    ],
  },
  contact: {
    title: 'Contact',
    contentGridClass: 'lg:grid-cols-3',
    links: [
      { label: 'Contact Us', icon: Phone },
      { label: 'Customer Support', icon: Headphones },
      { label: 'Vendor Support', icon: Handshake },
      { label: 'Business Enquiries', icon: Building2 },
      { label: 'Partner With Us', icon: UserPlus },
      { label: 'Office Locations', icon: MapPin },
    ],
  },
  help: {
    title: 'Help',
    contentGridClass: 'lg:grid-cols-3',
    links: [
      { label: 'Help Center', icon: HelpCircle },
      { label: 'FAQs', icon: MessageCircleQuestion },
      { label: 'Booking Guide', icon: BookCheck },
      { label: 'Cancellation Policy', icon: Ban },
      { label: 'Privacy Policy', icon: Shield },
      { label: 'Terms & Conditions', icon: FileCheck },
      { label: 'Report an Issue', icon: AlertTriangle },
    ],
  },
}

const navItems: Array<{ key: MenuKey; label: string }> = [
  { key: 'services', label: 'Services' },
  { key: 'about', label: 'About Us' },
  { key: 'contact', label: 'Contact' },
  { key: 'help', label: 'Help' },
]

type NavbarProps = {
  onAuthSuccess: (email: string) => void
  isAuthenticated: boolean
  userEmail: string
  onLogout?: () => void
  authModalOpen?: boolean
  setAuthModalOpen?: (open: boolean) => void
}

export default function Navbar({ onAuthSuccess, isAuthenticated, userEmail, onLogout, authModalOpen: controlledAuthModalOpen, setAuthModalOpen: controlledSetAuthModalOpen }: NavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [internalAuthModalOpen, setInternalAuthModalOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)


  const menuRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const authModalOpen = controlledAuthModalOpen !== undefined ? controlledAuthModalOpen : internalAuthModalOpen
  const setAuthModalOpen = controlledSetAuthModalOpen !== undefined ? controlledSetAuthModalOpen : setInternalAuthModalOpen

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
        setAccountMenuOpen(false)
      }
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node) && sidebarOpen) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [sidebarOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAuthModalOpen(false)
        setAccountMenuOpen(false)
        setSidebarOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [setAuthModalOpen])


  const userInitial = (userEmail.trim().charAt(0) || 'U').toUpperCase()

  if (isAuthenticated) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-ivory shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
          <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
            <div className="flex min-h-[72px] items-center justify-between gap-4 py-4 sm:py-4">
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 -ml-2 rounded-xl text-charcoal hover:text-royal hover:bg-white/80 transition-colors"
                  aria-label="Open navigation menu"
                >
                  <Menu size={22} />
                </button>
                <Link to="/" className="font-heading text-[26px] font-bold tracking-tight text-royal shrink-0">
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
                          onClick={() => { setAccountMenuOpen(false); navigate('/profile') }}
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
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold text-charcoal transition-colors hover:bg-ivory hover:text-royal"
                        onClick={() => { setAccountMenuOpen(false); onLogout?.() }}
                      >
                        <LogOut size={16} className="text-gold-deep/60" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar overlay */}
        <div
          className={`fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
            sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        {/* Left sidebar */}
        <aside
          ref={sidebarRef}
          className={`fixed top-0 left-0 z-[70] h-full w-72 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out flex flex-col ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-5 h-[72px] border-b border-black/5 shrink-0">
            <Link to="/" className="font-heading text-[22px] font-bold tracking-tight text-royal" onClick={() => setSidebarOpen(false)}>
              Func<span className="text-gold">Book</span>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="p-2 -mr-2 rounded-xl text-charcoal hover:text-royal hover:bg-ivory transition-colors"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar nav — static */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            <button type="button" onClick={() => { setSidebarOpen(false); navigate('/customer/dashboard') }} className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-charcoal border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 focus-visible:bg-gold/5 transition-all duration-200 hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20">
              <LayoutDashboard size={18} className="text-secondary-text group-hover:text-gold-deep transition-colors" />
              Dashboard
            </button>
            <button type="button" onClick={() => { setSidebarOpen(false); navigate('/services') }} className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-charcoal border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 focus-visible:bg-gold/5 transition-all duration-200 hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20">
              <Building2 size={18} className="text-secondary-text group-hover:text-gold-deep transition-colors" />
              Services
            </button>
            <button type="button" className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-charcoal border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 focus-visible:bg-gold/5 transition-all duration-200 hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20">
              <CalendarCheck size={18} className="text-secondary-text group-hover:text-gold-deep transition-colors" />
              My Bookings
            </button>
            <button type="button" className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-charcoal border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 focus-visible:bg-gold/5 transition-all duration-200 hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20">
              <Heart size={18} className="text-secondary-text group-hover:text-gold-deep transition-colors" />
              Wishlist
            </button>
            <button type="button" className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-charcoal border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 focus-visible:bg-gold/5 transition-all duration-200 hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20">
              <Star size={18} className="text-secondary-text group-hover:text-gold-deep transition-colors" />
              Reviews
            </button>
            <button type="button" className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-charcoal border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 focus-visible:bg-gold/5 transition-all duration-200 hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20">
              <CreditCard size={18} className="text-secondary-text group-hover:text-gold-deep transition-colors" />
              Payment History
            </button>

            <div className="my-2 border-t border-black/5" />

            <button type="button" className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-charcoal border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 focus-visible:bg-gold/5 transition-all duration-200 hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20">
              <Settings size={18} className="text-secondary-text group-hover:text-gold-deep transition-colors" />
              Profile &amp; Settings
            </button>
            <button type="button" className="group flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-charcoal border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/50 focus-visible:bg-gold/5 transition-all duration-200 hover:bg-gold/8 hover:text-gold-deep hover:border-gold/20">
              <HelpCircle size={18} className="text-secondary-text group-hover:text-gold-deep transition-colors" />
              Help &amp; Support
            </button>

            <div className="my-2 border-t border-black/5" />
          </nav>

          {/* Sidebar footer — logout pinned to bottom */}
          <div className="shrink-0 border-t border-black/5 px-3 py-3">
            <button
              type="button"
              onClick={() => { setSidebarOpen(false); onLogout?.() }}
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
            {location.pathname === '/' && navItems.map((item) => {
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
                    className={`fixed left-1/2 top-[72px] w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 before:content-[''] before:absolute before:top-[-16px] before:left-0 before:right-0 before:h-4 transition-all duration-300 ${
                      isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'pointer-events-none opacity-0 -translate-y-2'
                    }`}
                  >
                    <div
                      className="rounded-b-[28px] rounded-t-[24px] bg-white shadow-[0_18px_50px_rgba(17,17,17,0.12)] ring-1 ring-black/5 overflow-hidden"
                      onMouseEnter={() => setActiveMenu(item.key)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <div className="grid lg:grid-cols-[1.1fr_1fr_1fr_1fr] items-stretch">
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

                        <div className={`grid p-0 sm:grid-cols-2 lg:col-span-3 ${menu.contentGridClass}`}>
                          {menu.links.map((link) => (
                            <a
                              key={link.label}
                              href="#"
                              className="group/item flex items-center gap-3 border-b border-black/[0.04] px-5 py-3.5 text-left text-sm font-medium text-charcoal transition-all duration-200 last:border-b-0 hover:bg-ivory/70 hover:text-royal"
                            >
                              <link.icon size={16} className="shrink-0 text-gold-deep/60 group-hover/item:text-gold-deep transition-colors" />
                              <span>{link.label}</span>
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
                <div className="absolute right-0 top-full mt-2 w-72 lg:w-48 overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 max-h-[80vh] overflow-y-auto">
                  <div className="divide-y divide-black/5">
                    <div className="lg:hidden">
                      {location.pathname === '/' && navItems.map((item) => {
                        const menu = megaMenuItems[item.key]
                        const isOpen = activeMenu === item.key
                        return (
                          <div key={item.key}>
                            <button
                              type="button"
                              onClick={() => setActiveMenu(isOpen ? null : item.key)}
                              className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-ivory hover:text-royal"
                            >
                              <span>{item.label}</span>
                              <ChevronDown size={15} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isOpen && (
                              <div className="bg-ivory/40 px-4 pb-2 pt-1 space-y-0.5">
                                {menu.links.map((link) => (
                                  <a
                                    key={link.label}
                                    href="#"
                                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-charcoal transition-colors hover:bg-white hover:text-royal"
                                  >
                                    <link.icon size={14} className="shrink-0 text-gold-deep/60" />
                                    {link.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
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
                    <Link to="/become-host" className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-ivory hover:text-royal" onClick={() => setMobileMenuOpen(false)}>
                      <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-current text-[10px] leading-none">B</span>
                      <span>Become host</span>
                    </Link>
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
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onAuthSuccess={onAuthSuccess} />
    </header>
  )
}