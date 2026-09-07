import { type LucideIcon } from 'lucide-react'

type SettingsNavItemProps = {
  icon: LucideIcon
  label: string
  description: string
  active: boolean
  onClick: () => void
}

export default function SettingsNavItem({ icon: Icon, label, description, active, onClick }: SettingsNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors duration-200 ${
        active ? 'bg-[#FFF8E8]' : 'hover:bg-gold/5'
      }`}
    >
      <span
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          active ? 'bg-gold/15 text-gold-deep' : 'bg-gold/10 text-gold-deep'
        }`}
      >
        <Icon size={14} />
      </span>
      <span className="min-w-0">
        <span className={`block text-[13px] leading-tight font-semibold truncate ${active ? 'text-royal' : 'text-charcoal/80'}`}>
          {label}
        </span>
        <span className={`block text-[11px] leading-tight mt-0.5 truncate ${active ? 'text-gold-deep/70' : 'text-secondary-text'}`}>
          {description}
        </span>
      </span>
    </button>
  )
}