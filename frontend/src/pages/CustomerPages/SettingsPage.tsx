import { useState } from 'react'
import {
  User, Mail, Phone, MapPin, Lock, Eye, EyeOff,
  Camera, Save, Shield, Globe, PenLine, CheckCircle2,
} from 'lucide-react'

const inputClass = 'w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors'
const labelClass = 'block text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/60 mb-2'

type Tab = 'profile' | 'security'

interface ProfileData {
  name: string
  email: string
  phone: string
  location: string
  bio: string
}

const initialProfile: ProfileData = {
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
  bio: 'Event enthusiast. Love planning weddings and celebrations.',
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [profile, setProfile] = useState<ProfileData>(initialProfile)
  const [savedProfile, setSavedProfile] = useState<ProfileData>(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileData, string>>>({})
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const [passwordErrors, setPasswordErrors] = useState<Partial<Record<'current' | 'new' | 'confirm', string>>>({})
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const [language, setLanguage] = useState('English')
  const [currency, setCurrency] = useState('INR')

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

  function validatePasswords(): boolean {
    const next: Partial<Record<'current' | 'new' | 'confirm', string>> = {}
    if (!passwords.current) next.current = 'Current password is required'
    if (!passwords.new) next.new = 'New password is required'
    else if (passwords.new.length < 6) next.new = 'Must be at least 6 characters'
    if (!passwords.confirm) next.confirm = 'Please confirm your new password'
    else if (passwords.new !== passwords.confirm) next.confirm = 'Passwords do not match'
    setPasswordErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChangePassword() {
    if (!validatePasswords()) return
    setPasswords({ current: '', new: '', confirm: '' })
    setPasswordSuccess(true)
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          Account
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
          Settings
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
          Manage your account preferences and personal information
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 shrink-0">
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {([
              { key: 'profile' as const, label: 'Profile', icon: User },
              { key: 'security' as const, label: 'Security', icon: Shield },
            ]).map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-royal text-white shadow-[0_4px_16px_rgba(17,17,17,0.15)]'
                      : 'bg-white text-charcoal border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Profile Section */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">
                  Profile Information
                </h2>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300"
                  >
                    <PenLine size={14} />
                    Edit
                  </button>
                )}
              </div>

              {/* Success message */}
              {saveSuccess && (
                <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
                  <CheckCircle2 size={16} />
                  Profile updated successfully.
                </div>
              )}

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-black/5">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/10 border-2 border-gold/20 flex items-center justify-center">
                    <span className="font-heading text-xl sm:text-2xl font-bold text-gold-deep">
                      {profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gold-deep text-white flex items-center justify-center shadow hover:bg-royal transition-colors"
                    >
                      <Camera size={13} />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">{profile.name}</h3>
                  <p className="text-sm text-secondary-text">Member since March 2026</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      className={`${inputClass} pl-10 ${!isEditing ? 'opacity-60 cursor-default' : ''} ${errors.name ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className={`${inputClass} pl-10 ${!isEditing ? 'opacity-60 cursor-default' : ''} ${errors.email ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        className={`${inputClass} pl-10 ${!isEditing ? 'opacity-60 cursor-default' : ''} ${errors.phone ? 'border-red-400' : ''}`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className={labelClass}>Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        disabled={!isEditing}
                        className={`${inputClass} pl-10 ${!isEditing ? 'opacity-60 cursor-default' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className={`${inputClass} resize-none ${!isEditing ? 'opacity-60 cursor-default' : ''}`}
                  />
                </div>
              </div>

              {/* Save / Cancel */}
              {isEditing && (
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-black/5">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-charcoal/60 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Security Section */}
          {activeTab === 'security' && (
            <div className="space-y-5 sm:space-y-6">
              {/* Change Password */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal mb-6">
                  Change Password
                </h2>

                {passwordSuccess && (
                  <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
                    <CheckCircle2 size={16} />
                    Password updated successfully.
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Current Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        placeholder="Enter current password"
                        className={`${inputClass} pl-10 pr-12 ${passwordErrors.current ? 'border-red-400' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/60 transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {passwordErrors.current && <p className="text-xs text-red-500 mt-1">{passwordErrors.current}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>New Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          placeholder="Enter new password"
                          className={`${inputClass} pl-10 pr-12 ${passwordErrors.new ? 'border-red-400' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/60 transition-colors"
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {passwordErrors.new && <p className="text-xs text-red-500 mt-1">{passwordErrors.new}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Confirm New Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                        <input
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                          placeholder="Confirm new password"
                          className={`${inputClass} pl-10 ${passwordErrors.confirm ? 'border-red-400' : ''}`}
                        />
                      </div>
                      {passwordErrors.confirm && <p className="text-xs text-red-500 mt-1">{passwordErrors.confirm}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-black/5">
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
                  >
                    <Lock size={16} />
                    Update Password
                  </button>
                </div>
              </div>

              {/* Language & Region */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal mb-6">
                  Language & Region
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Language</label>
                    <div className="relative">
                      <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Marathi</option>
                        <option>Tamil</option>
                        <option>Telugu</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Currency</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30 text-sm">₹</span>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
