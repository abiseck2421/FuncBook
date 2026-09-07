import { ArrowRight } from 'lucide-react'
import { buttonSoft } from './styles'

type ProfileCompletionProps = {
  percent: number
  onComplete: () => void
}

export default function ProfileCompletion({ percent, onComplete }: ProfileCompletionProps) {
  const clamped = Math.min(100, Math.max(0, percent))

  return (
    <div className="border-t border-black/5 pt-5 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/70">
              Profile completion
            </p>
            <span className="text-sm font-bold text-royal">{clamped}%</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-charcoal/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gold-deep transition-all duration-500"
              style={{ width: `${clamped}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-secondary-text">Add your remaining details to get faster bookings.</p>
        </div>

        <button type="button" onClick={onComplete} className={buttonSoft}>
          Complete Profile
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}