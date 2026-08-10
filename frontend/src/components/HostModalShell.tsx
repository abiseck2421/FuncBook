import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { X } from 'lucide-react'

interface HostModalShellProps {
  icon: LucideIcon
  iconClass: string
  title: string
  subtitle: string
  onClose: () => void
  tall?: boolean
  children: ReactNode
}

export default function HostModalShell({ icon: Icon, iconClass, title, subtitle, onClose, tall = false, children }: HostModalShellProps) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const closeTimerRef = useRef<number | null>(null)

  const requestClose = () => {
    if (closing) return
    setClosing(true)
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(onClose, 220)
  }

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('keydown', handleEscape)
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const backdropClass = `absolute inset-0 bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-300 ${
    closing || !visible ? 'opacity-0' : 'opacity-100'
  }`

  const panelClass = `relative w-full max-w-[620px] ${
    tall ? 'min-h-[560px] max-h-[90vh]' : 'min-h-[440px] max-h-[82vh]'
  } bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden transition-all duration-300 ease-out ${
    closing || !visible ? 'opacity-0 scale-[0.96] -translate-y-3' : 'opacity-100 scale-100 translate-y-0'
  }`

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className={backdropClass} onClick={requestClose} />
      <div className={panelClass}>
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2 rounded-xl text-charcoal/40 hover:text-royal hover:bg-ivory transition-colors"
        >
          <X size={18} />
        </button>
        <div className="px-6 sm:px-7 pt-7 pb-5 border-b border-black/5 shrink-0">
          <div className="flex items-center gap-3 mb-1 pr-8">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconClass}`}>
              <Icon size={18} />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">{title}</h2>
          </div>
          <p className="text-sm text-secondary-text mt-2 pl-12">{subtitle}</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 sm:px-7 py-5">{children}</div>
      </div>
    </div>
  )
}
