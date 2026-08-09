import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  label: string
  value: string | number
  icon: LucideIcon
  index: number
  onClick?: () => void
  suffix?: string
  sub?: ReactNode
}

export default function PaymentSummaryCard({ label, value, icon: Icon, index, onClick, suffix, sub }: Props) {
  const interactive = typeof onClick === 'function'
  const hasSub = sub != null
  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      className={`group bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 flex gap-4 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(184,134,11,0.12)] transition-all duration-250 ${
        hasSub ? 'h-[150px] items-stretch' : 'h-[120px] items-center'
      } ${
        interactive
          ? 'cursor-pointer hover:border-gold-deep/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40'
          : ''
      }`}
      style={{ animation: `fadeUp 0.4s ${index * 0.08}s both` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-250">
        <Icon size={22} className="text-gold-deep" />
      </div>
      <div className={`min-w-0 flex-1 ${hasSub ? 'flex flex-col' : ''}`}>
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text mb-1">
          {label}
        </p>
        {suffix ? (
          <p className="font-heading text-xl sm:text-2xl font-bold text-royal flex items-baseline gap-1.5">
            <span className="truncate">{value}</span>
            <span className="text-xs sm:text-sm font-medium text-secondary-text whitespace-nowrap">{suffix}</span>
          </p>
        ) : (
          <p className="font-heading text-xl sm:text-2xl font-bold text-royal truncate">{value}</p>
        )}
        {hasSub && (
          <div className="mt-auto pt-2 space-y-0.5 text-[11px] sm:text-xs text-secondary-text leading-snug">
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}
