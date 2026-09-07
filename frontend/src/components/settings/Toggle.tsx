type ToggleProps = {
  checked: boolean
  onToggle: () => void
  label?: string
}

export default function Toggle({ checked, onToggle, label }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/40 ${
        checked ? 'bg-gold-deep' : 'bg-charcoal/15'
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}