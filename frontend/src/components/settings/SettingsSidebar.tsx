import SettingsNavItem from './SettingsNavItem'
import { settingsSections, type SettingsSectionId } from './nav'
import { whiteCard } from './styles'

type SettingsSidebarProps = {
  active: SettingsSectionId
  onSelect: (id: SettingsSectionId) => void
}

export default function SettingsSidebar({ active, onSelect }: SettingsSidebarProps) {
  return (
    <div className={`${whiteCard} p-3`}>
      <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
        Account
      </p>
      <nav className="space-y-1" aria-label="Settings sections">
        {settingsSections.map((section) => (
          <SettingsNavItem
            key={section.id}
            icon={section.icon}
            label={section.label}
            description={section.description}
            active={active === section.id}
            onClick={() => onSelect(section.id)}
          />
        ))}
      </nav>
    </div>
  )
}