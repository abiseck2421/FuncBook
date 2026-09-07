import { useState } from 'react'
import { CalendarCheck, Languages, Moon, Wallet, type LucideIcon } from 'lucide-react'
import PreferenceRow, { type PreferenceOption } from './PreferenceRow'
import SettingsSectionHeader from './SettingsSectionHeader'

interface PreferenceConfig {
  key: string
  label: string
  desc: string
  value: string
  options: PreferenceOption[]
  icon: LucideIcon
}

const preferences: PreferenceConfig[] = [
  {
    key: 'language',
    label: 'Language',
    desc: 'Choose your preferred language',
    value: 'English',
    icon: Languages,
    options: [
      { label: 'English', value: 'English' },
      { label: 'हिन्दी', value: 'Hindi' },
      { label: 'Français', value: 'French' },
      { label: 'Español', value: 'Spanish' },
      { label: 'Deutsch', value: 'German' },
    ],
  },
  {
    key: 'currency',
    label: 'Currency',
    desc: 'Display prices in your preferred currency',
    value: 'INR ₹',
    icon: Wallet,
    options: [
      { label: 'INR ₹', value: 'INR ₹' },
      { label: 'USD $', value: 'USD $' },
      { label: 'EUR €', value: 'EUR €' },
      { label: 'GBP £', value: 'GBP £' },
    ],
  },
  {
    key: 'appearance',
    label: 'Appearance',
    desc: 'Choose between light and dark theme',
    value: 'System',
    icon: Moon,
    options: [
      { label: 'Light', value: 'Light' },
      { label: 'Dark', value: 'Dark' },
      { label: 'System', value: 'System' },
    ],
  },
  {
    key: 'booking',
    label: 'Booking Preferences',
    desc: 'Manage how incoming booking requests are handled',
    value: 'Auto-confirm',
    icon: CalendarCheck,
    options: [
      { label: 'Auto-confirm bookings', value: 'Auto-confirm' },
      { label: 'Require my approval', value: 'Approval' },
    ],
  },
]

export default function PreferenceSettings() {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(preferences.map((pref) => [pref.key, pref.value])),
  )

  return (
    <div>
      <SettingsSectionHeader title="Preferences" description="Manage your FuncBook experience." />

      <div className="divide-y divide-black/5">
        {preferences.map((pref) => (
          <PreferenceRow
            key={pref.key}
            icon={pref.icon}
            label={pref.label}
            description={pref.desc}
            value={values[pref.key]}
            options={pref.options}
            onChange={(value) => setValues((prev) => ({ ...prev, [pref.key]: value }))}
          />
        ))}
      </div>
    </div>
  )
}