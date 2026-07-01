import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.svg'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-[0_1px_12px_rgba(0,0,0,0.06)]' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-4 group">
          <img
            src={logo}
            alt="FuncBook"
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-heading text-[28px] font-bold tracking-tight text-royal">
            Func<span className="text-gold">Book</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-semibold text-charcoal relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#login"
            className="h-12 px-7 text-sm font-semibold text-royal border border-royal rounded-xl inline-flex items-center justify-center hover:bg-royal hover:text-white transition-all duration-300"
          >
            Login
          </a>
          <a
            href="#get-started"
            className="h-12 px-7 text-sm font-semibold text-white bg-royal rounded-xl inline-flex items-center justify-center hover:bg-gold hover:text-royal transition-all duration-300"
          >
            Get Started
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-royal"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-border px-6 pb-6 pt-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-charcoal hover:text-royal hover:bg-ivory rounded-xl font-medium text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <a
              href="#login"
              onClick={() => setIsOpen(false)}
              className="text-center px-7 py-3 text-sm font-semibold text-royal border border-royal rounded-xl hover:bg-royal hover:text-white transition-all"
            >
              Login
            </a>
            <a
              href="#get-started"
              onClick={() => setIsOpen(false)}
              className="text-center px-7 py-3 text-sm font-semibold text-white bg-royal rounded-xl hover:bg-gold hover:text-royal transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
