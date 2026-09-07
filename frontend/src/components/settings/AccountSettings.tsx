import { type ReactNode } from 'react'
import SettingsSidebar from './SettingsSidebar'
import DangerZone from './DangerZone'
import { settingsSections, type SettingsSectionId } from './nav'

type AccountSettingsProps = {
  active: SettingsSectionId
  onSelect: (id: SettingsSectionId) => void
  onDeleteAccount: () => void
  children: ReactNode
}

export default function AccountSettings({ active, onSelect, onDeleteAccount, children }: AccountSettingsProps) {
  return (
    <div>
      {/* Mobile tab selector */}
      <div className="md:hidden -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1" role="tablist" aria-label="Settings sections">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={active === section.id}
              onClick={() => onSelect(section.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-200 ${
                active === section.id
                  ? 'bg-gold-deep text-white'
                  : 'bg-white text-charcoal border border-gold-deep/15 hover:bg-gold/5 hover:text-gold-deep'
              }`}
            >
              <section.icon size={15} />
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[224px_minmax(0,1fr)] lg:grid-cols-[248px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
        {/* Desktop sidebar */}
        <aside className="hidden md:block min-w-0">
          <div className="md:sticky md:top-4">
            <SettingsSidebar active={active} onSelect={onSelect} />
          </div>
        </aside>

        {/* Section content */}
        <main className="min-w-0">
          <div className="space-y-6 sm:space-y-7">{children}</div>
          <div className="mt-8 sm:mt-10">
            <DangerZone onDelete={onDeleteAccount} />
          </div>
        </main>
      </div>
    </div>
  )
}