import { useRef, useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: (email: string) => void
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const authSubmitLocked = useRef(false)
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      setEntered(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEntered(true)
        })
      })
    } else if (visible) {
      setEntered(false)
      const el = cardRef.current
      if (el) {
        const onEnd = () => {
          el.removeEventListener('transitionend', onEnd)
          setVisible(false)
        }
        el.addEventListener('transitionend', onEnd)
      } else {
        setVisible(false)
      }
    }
  }, [isOpen])

  const handleAuthSubmit = (event?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()

    if (authSubmitLocked.current) {
      return
    }

    const form = event?.currentTarget instanceof HTMLFormElement ? event.currentTarget : undefined
    const emailValue = form ? new FormData(form).get('auth-email')?.toString().trim() : ''

    authSubmitLocked.current = true
    onClose()
    onAuthSuccess(emailValue || 'user@example.com')

    window.setTimeout(() => {
      authSubmitLocked.current = false
    }, 0)
  }

  if (!visible) return null

  const backdropStyle: React.CSSProperties = {
    transition: 'opacity 0.3s ease, backdrop-filter 0.3s ease',
    opacity: entered ? 1 : 0,
  }

  const cardStyle: React.CSSProperties = {
    transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: entered ? 1 : 0,
    transform: entered ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/55 px-4 py-6 backdrop-blur-[2px]"
      style={backdropStyle}
      onClick={onClose}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-[min(92vw,980px)] overflow-hidden rounded-[32px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.24)]"
        style={cardStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          className="absolute right-4 top-4 z-10 rounded-full bg-ivory p-2 text-charcoal transition hover:bg-gold-deep hover:text-white cursor-pointer"
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

          <div className="relative flex flex-col justify-center p-7 pb-14 sm:p-10 lg:p-12 lg:pb-16">
            <div className="absolute left-1/2 top-12 -translate-x-1/2 font-heading text-[26px] font-bold tracking-tight text-royal">
              Func<span className="text-gold">Book</span>
            </div>
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
  )
}
