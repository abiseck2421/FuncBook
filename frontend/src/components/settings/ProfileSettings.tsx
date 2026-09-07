import { useState } from 'react'
import PersonalInformation from './PersonalInformation'
import ProfileSummary from './ProfileSummary'
import ProfileCompletion from './ProfileCompletion'
import SettingsSectionHeader from './SettingsSectionHeader'
import SuccessBanner from './SuccessBanner'
import type { ProfileData } from './types'

function getAuthUser() {
  try {
    const raw = localStorage.getItem('funcbook_auth_user')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') return parsed
    }
  } catch {
    // old plain-string value, ignore
  }
  return {}
}

const initialProfile: ProfileData = {
  name: getAuthUser().name || 'Priya Sharma',
  email: getAuthUser().email || 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
}

const memberSince = 'Member since March 2026'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return parts.map((part) => part.charAt(0)).join('').slice(0, 2).toUpperCase() || 'U'
}

const completionFields: (keyof ProfileData)[] = ['name', 'email', 'phone', 'location']

export default function ProfileSettings() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile)
  const [savedProfile, setSavedProfile] = useState<ProfileData>(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileData, string>>>({})
  const [saveSuccess, setSaveSuccess] = useState(false)

  function validateProfile(): boolean {
    const next: Partial<Record<keyof ProfileData, string>> = {}
    if (!profile.name.trim()) next.name = 'Name is required'
    if (!profile.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) next.email = 'Enter a valid email'
    if (!profile.phone.trim()) next.phone = 'Phone is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSaveProfile() {
    if (!validateProfile()) return
    setSavedProfile({ ...profile })
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  function handleCancelEdit() {
    setProfile({ ...savedProfile })
    setErrors({})
    setIsEditing(false)
  }

  const completion = completionFields.reduce((sum, key) => sum + (profile[key].trim() ? 20 : 0), 0)

  return (
    <div>
      {saveSuccess && <SuccessBanner message="Profile updated successfully." />}

      <SettingsSectionHeader title="Profile" description="Manage your personal information" />

      <ProfileSummary
        name={profile.name}
        email={profile.email}
        initials={getInitials(profile.name)}
        memberSince={memberSince}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
      />

      <div className="mt-6 sm:mt-7">
        <PersonalInformation
          profile={profile}
          errors={errors}
          isEditing={isEditing}
          onChange={(field, value) => setProfile((prev) => ({ ...prev, [field]: value }))}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      </div>

      <ProfileCompletion percent={completion} onComplete={() => setIsEditing(true)} />
    </div>
  )
}