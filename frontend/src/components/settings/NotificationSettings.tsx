import { useState } from 'react'
import NotificationRow from './NotificationRow'
import SettingsSectionHeader from './SettingsSectionHeader'

const notificationItems = [
  { key: 'bookings', label: 'Booking Updates', desc: 'Receive updates about your bookings.' },
  { key: 'reminders', label: 'Service Reminders', desc: 'Get reminders before your bookings.' },
  { key: 'email', label: 'Email Notifications', desc: 'Receive important account updates.' },
  { key: 'promos', label: 'Promotional Offers', desc: 'Receive offers and recommendations.' },
] as const

type NotificationKey = (typeof notificationItems)[number]['key']

const initialPreferences: Record<NotificationKey, boolean> = {
  bookings: true,
  reminders: true,
  email: true,
  promos: false,
}

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<Record<NotificationKey, boolean>>(initialPreferences)

  function handleToggle(key: NotificationKey) {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div>
      <SettingsSectionHeader title="Notifications" description="Choose which updates you want to receive." />

      <div className="divide-y divide-black/5">
        {notificationItems.map((item) => (
          <NotificationRow
            key={item.key}
            label={item.label}
            description={item.desc}
            checked={preferences[item.key]}
            onToggle={() => handleToggle(item.key)}
          />
        ))}
      </div>
    </div>
  )
}