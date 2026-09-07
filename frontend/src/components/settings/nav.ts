import { type LucideIcon } from 'lucide-react'
import { Bell, Shield, SlidersHorizontal, User } from 'lucide-react'

export type SettingsSectionId = 'profile' | 'security' | 'notifications' | 'preferences'

export const settingsSections: { id: SettingsSectionId; label: string; description: string; icon: LucideIcon }[] = [
  { id: 'profile', label: 'Profile', description: 'Personal information', icon: User },
  { id: 'security', label: 'Security', description: 'Password and login', icon: Shield },
  { id: 'notifications', label: 'Notifications', description: 'Alerts and updates', icon: Bell },
  { id: 'preferences', label: 'Preferences', description: 'Language and preferences', icon: SlidersHorizontal },
]