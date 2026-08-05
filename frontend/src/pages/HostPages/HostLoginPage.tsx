import { Link, Navigate } from 'react-router-dom'
import { useHostAuth } from '../../contexts/hostAuth'
import HostLoginForm from './HostLoginForm'

export default function HostLoginPage() {
  const { isAuthenticated } = useHostAuth()

  if (isAuthenticated) {
    return <Navigate to="/host/dashboard" replace />
  }

  return (
    <div className="h-screen overflow-y-auto bg-ivory">
      <header className="relative z-50">
        <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
          <div className="flex min-h-[72px] items-center">
            <Link to="/" className="font-heading text-[26px] font-bold tracking-tight text-royal">
              Func<span className="text-gold">Book</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-[26rem]">
          <div className="rounded-3xl border border-gold-deep/15 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8">
            <HostLoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-secondary-text">
            Not a host yet?{' '}
            <Link to="/become-host" className="font-semibold text-royal transition-colors hover:text-gold-deep">
              Become a Host
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
