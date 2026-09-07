import { useState } from 'react'
import AccountSettings from '../../components/settings/AccountSettings'
import type { SettingsSectionId } from '../../components/settings/nav'
import ProfileSettings from '../../components/settings/ProfileSettings'
import SecuritySettings from '../../components/settings/SecuritySettings'
import NotificationSettings from '../../components/settings/NotificationSettings'
import PreferenceSettings from '../../components/settings/PreferenceSettings'
import { DeleteAccountDialog } from '../../components/settings/DangerZone'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSectionId>('profile')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  function handleDeleteAccount() {
    setShowDeleteConfirm(false)
    localStorage.removeItem('funcbook_auth_user')
    window.location.href = '/'
  }

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-12 sm:pb-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          Account
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-royal">Settings</h1>
        <p className="mt-2 sm:mt-3 text-sm text-secondary-text">
          Manage your profile, preferences and security.
        </p>
      </div>

      <AccountSettings
        active={activeSection}
        onSelect={setActiveSection}
        onDeleteAccount={() => setShowDeleteConfirm(true)}
      >
        {activeSection === 'profile' && <ProfileSettings />}
        {activeSection === 'security' && <SecuritySettings />}
        {activeSection === 'notifications' && <NotificationSettings />}
        {activeSection === 'preferences' && <PreferenceSettings />}
      </AccountSettings>

      <DeleteAccountDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onDelete={handleDeleteAccount}
      />
    </div>
  )
}