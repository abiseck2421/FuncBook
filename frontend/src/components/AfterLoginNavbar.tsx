import { Link } from 'react-router-dom'
import { Globe, Menu } from 'lucide-react'

type AfterLoginNavbarProps = {
  onMenuClick: () => void
  userEmail: string
  userName?: string
  logoHref: string
  profileHref: string
}

export default function AfterLoginNavbar({ onMenuClick, userEmail, userName, logoHref, profileHref }: AfterLoginNavbarProps) {
  const userInitial = (() => {
    const name = userName?.trim()
    if (name) {
      return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
    }
    return (userEmail.trim().charAt(0) || 'U').toUpperCase()
  })()

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
            <Link to={logoHref} className="font-heading text-[26px] font-bold tracking-tight text-royal shrink-0">
              Func<span className="text-gold">Book</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-royal transition-colors">
              <Globe size={16} />
              <span className="hidden sm:inline">Language</span>
            </button>
            <Link
              to={profileHref}
              className="grid h-10 w-10 place-items-center rounded-full bg-gold-deep text-sm font-bold text-white ring-1 ring-black/5 transition hover:ring-gold-deep"
              aria-label="Profile"
            >
              {userInitial}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}