import { type ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'
import { iconChipClass } from './styles'

type SecurityRowProps = {
  icon: LucideIcon
  title: string
  description: string
  action: ReactNode
  children?: ReactNode
}

export default function SecurityRow({ icon: Icon, title, description, action, children }: SecurityRowProps) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className={iconChipClass}>
            <Icon size={16} className="text-gold-deep" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-royal">{title}</p>
            <p className="text-xs text-secondary-text mt-0.5 truncate">{description}</p>
          </div>
        </div>
        <div className="shrink-0">{action}</div>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}