import { useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, CalendarCheck, Heart, ArrowRight, CalendarDays, Camera, Pencil } from 'lucide-react'

const profileNavItems = [
  { label: 'About Me', icon: User, path: '/customer/settings' },
  { label: 'My Bookings', icon: CalendarCheck, path: '/customer/bookings' },
  { label: 'Favorites', icon: Heart, path: '/customer/wishlist' },
]

export default function CustomerDashboardPage() {
  const location = useLocation()
  const fileRef = useRef<HTMLInputElement>(null)
  const [photo, setPhoto] = useState<string>(() => {
    try { return localStorage.getItem('funcbook_profile_photo') || '' } catch { return '' }
  })
  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('funcbook_auth_user')
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  }, [])

  const name = [user?.name, user?.lastName].filter(Boolean).join(' ') || 'Guest'
  const email = user?.email || ''
  const initial = name.charAt(0).toUpperCase()

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result)
      setPhoto(dataUrl)
      try { localStorage.setItem('funcbook_profile_photo', dataUrl) } catch {}
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="w-[90%] mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
      {/* Body: Left Nav + Right Content */}
      <div className="lg:flex lg:items-start lg:gap-8">
        {/* Left: Sticky Page Header + Nav */}
        <div className="mb-6 lg:mb-0 lg:w-[280px] lg:shrink-0 lg:self-start lg:sticky lg:top-0 lg:z-30">
          {/* Page Header (left-aligned only) */}
          <div className="bg-ivory pb-4 mb-2 lg:pl-4">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
              Dashboard
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
              Profile
            </h1>
          </div>

          {/* Nav */}
          <aside className="rounded-2xl overflow-hidden flex flex-col lg:py-4 lg:px-3">
            {profileNavItems.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.path || (item.label === 'About Me' && location.pathname === '/customer/dashboard')
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex w-full items-center gap-3 px-5 py-3 text-base font-medium transition-colors ${
                    active
                      ? 'rounded-xl bg-gold-deep/15 text-royal'
                      : 'rounded-xl text-charcoal hover:bg-ivory hover:text-royal'
                  }`}
                >
                  <span className="w-5 shrink-0 flex justify-center">
                    <Icon size={18} className={active ? 'text-gold-deep' : 'text-secondary-text'} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </aside>
        </div>

        {/* Right: Content */}
        <div className="space-y-6 lg:flex-1 lg:min-w-0">
          {/* Profile + Complete Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Profile Card */}
            <div className="relative bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col justify-center">
              <Link
                to="/customer/settings"
                className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold-deep/20 text-gold-deep text-xs font-semibold hover:bg-gold-deep hover:text-white transition-colors"
              >
                <Pencil size={12} /> Edit
              </Link>
              <div className="flex flex-col items-center text-center gap-4">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="relative w-28 h-28 rounded-full bg-gold-deep flex items-center justify-center text-3xl font-bold text-white shrink-0 ring-4 ring-gold-deep/10 overflow-hidden group"
                  aria-label="Add profile photo"
                >
                  {photo ? (
                    <img src={photo} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{initial}</span>
                  )}
                  <span className="absolute inset-0 bg-royal/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} />
                  </span>
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                <div className="min-w-0">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-royal truncate">{name}</h2>
                  {email && <p className="text-sm sm:text-base text-secondary-text mt-0.5 truncate">{email}</p>}
                </div>
              </div>
            </div>

            {/* Complete Profile */}
            <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-royal">Complete your profile</h3>
                <p className="text-sm sm:text-base text-secondary-text mt-1">
                  Add your details for faster bookings.
                </p>
              </div>
              <Link to="/customer/settings" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-charcoal transition-colors w-fit">
                Get Started <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* My Bookings */}
          <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-royal">My Bookings</h3>
              <Link to="/customer/bookings" className="text-sm font-semibold text-gold-deep hover:text-royal transition-colors flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="text-center py-6 sm:py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-deep/[0.06] mb-3">
                <CalendarDays size={20} className="text-gold-deep" />
              </div>
              <h4 className="font-heading text-lg font-bold text-royal mt-2">You don&apos;t have any bookings yet.</h4>
              <p className="text-sm text-secondary-text mt-1.5 max-w-sm mx-auto">Explore services and make your first booking.</p>
              <Link to="/all-services" className="inline-flex items-center gap-2 px-6 py-3 mt-5 rounded-xl bg-gold-deep text-white text-sm font-semibold hover:bg-royal transition-colors">
                Explore Services <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
