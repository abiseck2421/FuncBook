import { useEffect, useState } from 'react'
import { ChevronDown, Globe, Menu } from 'lucide-react'

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

interface NavbarProps {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
          : 'bg-ivory/90 backdrop-blur-md'
      }`}
    >
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
          <a href="/" className="font-heading text-[26px] font-bold tracking-tight text-royal shrink-0">
            Func<span className="text-gold">Book</span>
          </a>

          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2">
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
            <button
              onClick={onMenuClick}
              className="p-2 text-charcoal hover:text-royal transition-colors"
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
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
    </header>
  )
}