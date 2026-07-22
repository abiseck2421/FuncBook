import { useRef, useState, useEffect } from 'react'
import { X, ArrowLeft } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: (email?: string) => void
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const authSubmitLocked = useRef(false)
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState<'input' | 'otp'>('input')
  const [contact, setContact] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      setEntered(false)
      setStep('input')
      setContact('')
      setOtp(['', '', '', '', '', ''])
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

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!contact.trim()) return
    setStep('otp')
    setTimeout(() => otpRefs.current[0]?.focus(), 100)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const newOtp = pasted.split('').concat(Array(6).fill('')).slice(0, 6)
    setOtp(newOtp)
    otpRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const handleVerify = () => {
    if (authSubmitLocked.current) return
    authSubmitLocked.current = true
    onClose()
    onAuthSuccess(contact)
    window.setTimeout(() => {
      authSubmitLocked.current = false
    }, 0)
  }

  const maskedContact = contact.includes('@')
    ? contact.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : contact.replace(/(\d{2})(\d+)(\d{2})/, '$1***$3')

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
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-deep">
                Welcome
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-royal sm:text-4xl">
                Plan Your Perfect Event with FuncBook
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-secondary-text sm:text-base">
                Discover trusted venues and event services, manage your bookings, and create unforgettable celebrations all in one place.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center p-7 pb-14 sm:p-10 lg:p-12 lg:pb-16">
            <div className="absolute left-1/2 top-12 -translate-x-1/2 font-heading text-[26px] font-bold tracking-tight text-royal">
              Func<span className="text-gold">Book</span>
            </div>

            {step === 'input' ? (
              <>
                <div className="mt-10 text-center">
                  <h3 className="font-heading text-3xl font-bold text-royal">Log in or Sign up</h3>
                </div>

                <form className="mt-10 space-y-5" onSubmit={handleContinue}>
                  <input
                    type="text"
                    placeholder="Phone number or email"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full rounded-2xl border border-black/10 bg-ivory/60 px-4 py-3.5 text-sm text-charcoal outline-none transition focus:border-gold-deep focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gold-deep px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(214,169,97,0.26)] transition hover:bg-royal"
                  >
                    Continue
                  </button>
                </form>

                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-black/10" />
                  <span className="text-xs font-medium text-secondary-text">or</span>
                  <div className="h-px flex-1 bg-black/10" />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-charcoal transition hover:bg-ivory"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-charcoal transition hover:bg-ivory"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    Apple
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { setStep('input'); setOtp(['', '', '', '', '', '']) }}
                  className="absolute left-4 top-4 z-10 rounded-full bg-ivory p-2 text-charcoal transition hover:bg-gold-deep hover:text-white cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="mt-10 text-center">
                  <h3 className="font-heading text-3xl font-bold text-royal">Confirm it's you</h3>
                  <p className="mt-2 text-sm text-secondary-text">
                    We sent a code to <span className="font-medium text-charcoal">{maskedContact}</span>
                  </p>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ''))}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      onPaste={handleOtpPaste}
                      className="h-12 w-10 sm:h-14 sm:w-12 md:h-16 md:w-14 rounded-xl border border-black/10 bg-ivory/60 text-center text-lg font-semibold text-charcoal outline-none transition focus:border-gold-deep focus:bg-white"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleVerify}
                  className="mt-6 w-full rounded-2xl bg-gold-deep px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(214,169,97,0.26)] transition hover:bg-royal"
                >
                  Verify
                </button>

                <p className="mt-5 text-center text-sm text-secondary-text">
                  Didn't receive code?{' '}
                  <button
                    type="button"
                    onClick={() => setOtp(['', '', '', '', '', ''])}
                    className="font-semibold text-royal hover:text-gold-deep"
                  >
                    Resend
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}