import { useState } from 'react'
import {
  User, Mail, Phone, MapPin, Lock, Eye, EyeOff,
  Camera, Save, PenLine, CheckCircle2, Shield,
  Smartphone, Monitor, LogOut, Trash2, AlertTriangle, X,
} from 'lucide-react'

const inputClass = 'w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors'
const labelClass = 'block text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/60 mb-2'

interface ProfileData {
  name: string
  email: string
  phone: string
  location: string
}

const initialProfile: ProfileData = {
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
}

export default function SettingsPage() {
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

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

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

  function handleDeleteAccount() {
    setShowDeleteConfirm(false)
    localStorage.removeItem('funcbook_auth_user')
    window.location.href = '/'
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

      <div className="space-y-8 sm:space-y-10">
        {/* ── Profile Section ──────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
              <User size={16} className="text-gold-deep" />
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Profile</h2>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
            {/* Success message */}
            {saveSuccess && (
              <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
                <CheckCircle2 size={16} />
                Profile updated successfully.
              </div>
            )}

            {/* Avatar + Name + Edit */}
            <div className="flex items-center gap-5 mb-8">
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold/10 border-2 border-gold/20 flex items-center justify-center">
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-gold-deep">
                    {profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gold-deep text-white flex items-center justify-center shadow hover:bg-royal transition-colors"
                  >
                    <Camera size={14} />
                  </button>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal truncate">{profile.name}</h3>
                <p className="text-sm text-secondary-text mt-0.5">{profile.email}</p>
                <p className="text-xs text-secondary-text/60 mt-1">Member since March 2026</p>
              </div>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300 shrink-0"
                >
                  <PenLine size={14} />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        </section>

        {/* ── Security Section ─────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
              <Shield size={16} className="text-gold-deep" />
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Security Settings</h2>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {/* Change Password */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Lock size={16} className="text-gold-deep" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-royal">Change Password</h3>
              </div>

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

              <div className="mt-6 pt-5 border-t border-black/5">
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

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Smartphone size={16} className="text-gold-deep" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-royal">Two-Factor Authentication</h3>
                    <p className="text-sm text-secondary-text mt-0.5">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/40 ${
                    twoFactorEnabled ? 'bg-gold-deep' : 'bg-charcoal/15'
                  }`}
                  role="switch"
                  aria-checked={twoFactorEnabled}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ${
                      twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-secondary-text mt-4 pl-12">
                When enabled, you'll be asked to enter a verification code from your phone each time you sign in from a new device.
              </p>
            </div>

            {/* Login Sessions */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Monitor size={16} className="text-gold-deep" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-royal">Login Sessions</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-ivory/60 border border-gold-deep/10">
                  <div className="w-10 h-10 rounded-xl bg-gold-deep/10 flex items-center justify-center shrink-0">
                    <Monitor size={16} className="text-gold-deep" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-royal">Windows — Chrome</p>
                    <p className="text-xs text-secondary-text mt-0.5">Current device</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active now
                  </span>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-ivory/60 border border-gold-deep/10">
                  <div className="w-10 h-10 rounded-xl bg-charcoal/5 flex items-center justify-center shrink-0">
                    <Smartphone size={16} className="text-charcoal/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-royal">iPhone — Safari</p>
                    <p className="text-xs text-secondary-text mt-0.5">Last login: Jul 18, 2026 at 3:42 PM</p>
                  </div>
                  <span className="text-xs text-secondary-text">Mumbai</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-black/5">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-red-500 bg-red-50/80 border border-red-200/60 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
                >
                  <LogOut size={16} />
                  Logout All Devices
                </button>
              </div>
            </div>

            {/* Delete Account */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-red-200/60 shadow-[0_4px_24px_rgba(239,68,68,0.06)] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-500" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-royal">Delete Account</h3>
              </div>
              <p className="text-sm text-secondary-text mb-6 pl-12">
                Permanently delete your FuncBook account and all associated data. This action cannot be undone.
              </p>
              <div className="pl-12">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-white border-2 border-red-300 hover:bg-red-50 hover:border-red-400 hover:text-red-700 transition-all duration-300"
                >
                  <Trash2 size={16} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Delete Confirmation Dialog ────────────────────── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.15)] p-6 sm:p-8 animate-fade-in-up">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-charcoal/40 hover:text-royal hover:bg-ivory transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-200 mx-auto mb-5">
              <AlertTriangle size={24} className="text-red-500" />
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal text-center">
              Delete Account?
            </h3>
            <p className="text-sm text-secondary-text text-center mt-3 leading-relaxed">
              This will permanently delete your account, profile, bookings, reviews, and all associated data. This action cannot be reversed.
            </p>

            <div className="flex items-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-charcoal/70 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-[0_4px_16px_rgba(239,68,68,0.25)] hover:shadow-[0_4px_20px_rgba(239,68,68,0.35)] transition-all duration-300"
              >
                <Trash2 size={16} />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
