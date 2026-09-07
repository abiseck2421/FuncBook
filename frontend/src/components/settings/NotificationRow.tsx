import Toggle from './Toggle'

type NotificationRowProps = {
  label: string
  description: string
  checked: boolean
  onToggle: () => void
}

export default function NotificationRow({ label, description, checked, onToggle }: NotificationRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="pr-4 min-w-0">
        <p className="text-sm font-semibold text-royal">{label}</p>
        <p className="text-xs text-secondary-text mt-0.5">{description}</p>
      </div>
      <Toggle checked={checked} onToggle={onToggle} label={label} />
    </div>
  )
}