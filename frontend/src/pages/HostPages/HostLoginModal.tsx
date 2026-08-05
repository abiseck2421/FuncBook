import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import HostLoginForm from './HostLoginForm'

interface HostLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HostLoginModal({ isOpen, onClose }: HostLoginModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)

    const scrollContainers = Array.from(document.querySelectorAll<HTMLElement>('main'))
    const previousOverflows = scrollContainers.map((el) => ({ el, value: el.style.overflow }))
    scrollContainers.forEach((el) => {
      el.style.overflow = 'hidden'
    })

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      previousOverflows.forEach(({ el, value }) => {
        el.style.overflow = value
      })
      document.body.style.overflow = previousBodyOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-charcoal/55 px-4 py-6 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Host login"
    >
      <div
        className="relative w-full max-w-[26rem] rounded-[28px] bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-ivory p-2 text-charcoal transition hover:bg-gold-deep hover:text-white"
          aria-label="Close host login"
        >
          <X size={18} />
        </button>

        <HostLoginForm />

        <p className="mt-6 text-center text-sm text-secondary-text">
          Not a host yet?{' '}
          <Link
            to="/become-host"
            onClick={onClose}
            className="font-semibold text-royal transition-colors hover:text-gold-deep"
          >
            Become a Host
          </Link>
        </p>
      </div>
    </div>
  )
}
