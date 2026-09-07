import { useState } from 'react'
import { Check, ChevronRight, type LucideIcon } from 'lucide-react'
import { iconChipClass } from './styles'

export interface PreferenceOption {
  label: string
  value: string
}

type PreferenceRowProps = {
  icon: LucideIcon
  label: string
  description: string
  value: string
  options: PreferenceOption[]
  onChange: (value: string) => void
}

export default function PreferenceRow({ icon: Icon, label, description, value, options, onChange }: PreferenceRowProps) {
  const [open, setOpen] = useState(false)

  function handleSelect(selected: string) {
    onChange(selected)
    setOpen(false)
  }

  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className={iconChipClass}>
            <Icon size={16} className="text-gold-deep" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-royal">{label}</p>
            <p className="text-xs text-secondary-text mt-0.5">{description}</p>
          </div>
        </div>

        <button type="button" onClick={() => setOpen(!open)} className="flex items-center gap-1.5 shrink-0 group">
          <span className="text-sm font-medium text-charcoal/80 group-hover:text-gold-deep transition-colors">
            {value}
          </span>
          <ChevronRight
            size={16}
            className={`text-charcoal/40 group-hover:text-gold-deep transition-all duration-300 ${
              open ? 'rotate-90' : ''
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="mt-3 ml-12 space-y-1 rounded-xl border border-gold-deep/10 bg-ivory/50 p-2 animate-slide-in">
          {options.map((option) => {
            const selected = option.value === value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  selected ? 'bg-white text-gold-deep font-semibold shadow-sm' : 'text-charcoal/80 hover:bg-white/70'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {selected && <Check size={14} className="text-gold-deep shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}