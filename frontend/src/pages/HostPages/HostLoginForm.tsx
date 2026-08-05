import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Building2, ArrowRight,
} from 'lucide-react'
import { useHostAuth } from '../../contexts/hostAuth'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function HostLoginForm() {
  const { login } = useHostAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [forgotNotice, setForgotNotice] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (): boolean => {
    let valid = true

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setEmailError('Email address is required.')
      valid = false
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.')
      valid = false
    } else {
      setEmailError(null)
    }

    if (!password) {
      setPasswordError('Password is required.')
      valid = false
    } else {
      setPasswordError(null)
    }

    return valid
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!validate()) return

    setIsSubmitting(true)
    setForgotNotice(null)

    window.setTimeout(() => {
      login(email.trim())
      navigate('/host/dashboard', { replace: true })
    }, 900)
  }

  const handleForgotPassword = () => {
    setForgotNotice(
      'Password reset for host accounts is not available in this demo. Please contact host support.',
    )
  }

  return (
    <>
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          <Building2 size={13} />
          Host Portal
        </div>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-royal">
          Welcome Back, Host
        </h1>
        <p className="mt-2 text-sm leading-6 text-secondary-text">
          Sign in to manage your services, bookings, payments, and reviews.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="host-login-email" className="block text-sm font-medium text-charcoal">
            Email Address
          </label>
          <div className="relative mt-2">
            <Mail
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60"
            />
            <input
              id="host-login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError(null)
              }}
              placeholder="you@example.com"
              aria-invalid={!!emailError}
              className={`w-full rounded-2xl border bg-ivory/60 py-3 pl-11 pr-4 text-sm text-charcoal outline-none transition focus:bg-white ${
                emailError
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                  : 'border-black/10 focus:border-gold-deep'
              }`}
            />
          </div>
          {emailError && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500" role="alert">
              <AlertCircle size={13} className="shrink-0" />
              {emailError}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="host-login-password" className="text-sm font-medium text-charcoal">
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs font-semibold text-gold-deep transition-colors hover:text-royal"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative mt-2">
            <Lock
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60"
            />
            <input
              id="host-login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (passwordError) setPasswordError(null)
              }}
              placeholder="Enter your password"
              aria-invalid={!!passwordError}
              className={`w-full rounded-2xl border bg-ivory/60 py-3 pl-11 pr-12 text-sm text-charcoal outline-none transition focus:bg-white ${
                passwordError
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                  : 'border-black/10 focus:border-gold-deep'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-secondary-text transition-colors hover:text-charcoal"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {passwordError && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500" role="alert">
              <AlertCircle size={13} className="shrink-0" />
              {passwordError}
            </p>
          )}
        </div>

        <label className="flex cursor-pointer select-none items-center gap-2.5">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-black/20 accent-gold-deep"
          />
          <span className="text-sm text-charcoal">Remember me</span>
        </label>

        {forgotNotice && (
          <p
            className="rounded-xl border border-amber-200/60 bg-amber-50 px-3.5 py-2.5 text-xs font-medium text-amber-700"
            role="status"
          >
            {forgotNotice}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-deep px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(214,169,97,0.26)] transition hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-gold-deep disabled:hover:shadow-[0_12px_24px_rgba(214,169,97,0.26)]"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Signing you in…
            </>
          ) : (
            <>
              Login to Host Dashboard
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </>
  )
}
