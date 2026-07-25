import { useState } from 'react'
import {
  User, Mail, Phone, MapPin, Lock, Eye, EyeOff,
  Camera, Save, PenLine, CheckCircle2, Shield,
  Smartphone, Trash2, AlertTriangle, X, Building2,
  CreditCard, Bell, Eye as EyeIcon, Star, Wallet,
  Banknote, Info, ToggleLeft,
} from 'lucide-react'

const inputClass = 'w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors'
const labelClass = 'block text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/60 mb-2'

const notificationItems: { key: keyof NotificationSettings; label: string; desc: string }[] = [
  { key: 'booking', label: 'Booking Notifications', desc: 'Get notified when a customer makes a booking' },
  { key: 'cancellation', label: 'Cancellation Notifications', desc: 'Get notified when a booking is cancelled' },
  { key: 'payment', label: 'Payment Notifications', desc: 'Get notified for payment received or pending' },
  { key: 'email', label: 'Email Notifications', desc: 'Receive summary emails about your activity' },
  { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
]

function Toggle({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/40 ${
        checked ? 'bg-gold-deep' : 'bg-charcoal/15'
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

interface ProfileData {
  fullName: string
  email: string
  phone: string
  bio: string
}

const initialProfile: ProfileData = {
  fullName: 'Arjun Mehta',
  email: 'arjun.mehta@email.com',
  phone: '+91 98765 43210',
  bio: 'Experienced event host with 8+ years in premium venue management.',
}

interface BusinessData {
  businessName: string
  category: string
  address: string
  gstId: string
}

const initialBusiness: BusinessData = {
  businessName: 'Mehta Events Pvt. Ltd.',
  category: 'Function Hall',
  address: '123 MG Road, Bangalore, Karnataka 560001',
  gstId: '29AABCM1234F1Z5',
}

interface PasswordData {
  current: string
  newPass: string
  confirm: string
}

interface NotificationSettings {
  booking: boolean
  cancellation: boolean
  payment: boolean
  email: boolean
  push: boolean
}

interface PayoutData {
  accountName: string
  accountNumber: string
  ifscCode: string
  upiId: string
}

interface PrivacySettings {
  publicProfile: boolean
  showContact: boolean
  allowReviews: boolean
}

export default function HostSettingsPage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile)
  const [savedProfile, setSavedProfile] = useState<ProfileData>(initialProfile)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileErrors, setProfileErrors] = useState<Partial<Record<keyof ProfileData, string>>>({})
  const [profileSuccess, setProfileSuccess] = useState(false)

  const [business, setBusiness] = useState<BusinessData>(initialBusiness)
  const [savedBusiness, setSavedBusiness] = useState<BusinessData>(initialBusiness)
  const [isEditingBusiness, setIsEditingBusiness] = useState(false)
  const [businessErrors, setBusinessErrors] = useState<Partial<Record<keyof BusinessData, string>>>({})
  const [businessSuccess, setBusinessSuccess] = useState(false)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwords, setPasswords] = useState<PasswordData>({ current: '', newPass: '', confirm: '' })
  const [passwordErrors, setPasswordErrors] = useState<Partial<Record<'current' | 'newPass' | 'confirm', string>>>({})
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [notifications, setNotifications] = useState<NotificationSettings>({
    booking: true,
    cancellation: true,
    payment: true,
    email: false,
    push: false,
  })
  const [notificationsSuccess, setNotificationsSuccess] = useState(false)

  const [payout, setPayout] = useState<PayoutData>({
    accountName: 'Arjun Mehta',
    accountNumber: '****4521',
    ifscCode: 'SBIN0001234',
    upiId: '',
  })
  const [savedPayout, setSavedPayout] = useState<PayoutData>(payout)
  const [isEditingPayout, setIsEditingPayout] = useState(false)
  const [payoutErrors, setPayoutErrors] = useState<Partial<Record<keyof PayoutData, string>>>({})
  const [payoutSuccess, setPayoutSuccess] = useState(false)

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    publicProfile: true,
    showContact: false,
    allowReviews: true,
  })
  const [privacySuccess, setPrivacySuccess] = useState(false)

  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  function validateProfile(): boolean {
    const next: Partial<Record<keyof ProfileData, string>> = {}
    if (!profile.fullName.trim()) next.fullName = 'Full name is required'
    if (!profile.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) next.email = 'Enter a valid email'
    if (!profile.phone.trim()) next.phone = 'Phone is required'
    setProfileErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSaveProfile() {
    if (!validateProfile()) return
    setSavedProfile({ ...profile })
    setIsEditingProfile(false)
    setProfileSuccess(true)
    setTimeout(() => setProfileSuccess(false), 3000)
  }

  function handleCancelProfile() {
    setProfile({ ...savedProfile })
    setProfileErrors({})
    setIsEditingProfile(false)
  }

  function validateBusiness(): boolean {
    const next: Partial<Record<keyof BusinessData, string>> = {}
    if (!business.businessName.trim()) next.businessName = 'Business name is required'
    if (!business.category.trim()) next.category = 'Category is required'
    if (!business.address.trim()) next.address = 'Address is required'
    setBusinessErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSaveBusiness() {
    if (!validateBusiness()) return
    setSavedBusiness({ ...business })
    setIsEditingBusiness(false)
    setBusinessSuccess(true)
    setTimeout(() => setBusinessSuccess(false), 3000)
  }

  function handleCancelBusiness() {
    setBusiness({ ...savedBusiness })
    setBusinessErrors({})
    setIsEditingBusiness(false)
  }

  function validatePasswords(): boolean {
    const next: Partial<Record<'current' | 'newPass' | 'confirm', string>> = {}
    if (!passwords.current) next.current = 'Current password is required'
    if (!passwords.newPass) next.newPass = 'New password is required'
    else if (passwords.newPass.length < 6) next.newPass = 'Must be at least 6 characters'
    if (!passwords.confirm) next.confirm = 'Please confirm your new password'
    else if (passwords.newPass !== passwords.confirm) next.confirm = 'Passwords do not match'
    setPasswordErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChangePassword() {
    if (!validatePasswords()) return
    setPasswords({ current: '', newPass: '', confirm: '' })
    setPasswordSuccess(true)
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  function handleToggleNotification(key: keyof NotificationSettings) {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleSaveNotifications() {
    setNotificationsSuccess(true)
    setTimeout(() => setNotificationsSuccess(false), 3000)
  }

  function validatePayout(): boolean {
    const next: Partial<Record<keyof PayoutData, string>> = {}
    if (!payout.accountName.trim()) next.accountName = 'Account name is required'
    if (!payout.accountNumber.trim()) next.accountNumber = 'Account number is required'
    if (!payout.ifscCode.trim()) next.ifscCode = 'IFSC code is required'
    setPayoutErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSavePayout() {
    if (!validatePayout()) return
    setSavedPayout({ ...payout })
    setIsEditingPayout(false)
    setPayoutSuccess(true)
    setTimeout(() => setPayoutSuccess(false), 3000)
  }

  function handleCancelPayout() {
    setPayout({ ...savedPayout })
    setPayoutErrors({})
    setIsEditingPayout(false)
  }

  function handleSavePrivacy() {
    setPrivacySuccess(true)
    setTimeout(() => setPrivacySuccess(false), 3000)
  }

  function handleDeactivate() {
    setShowDeactivateConfirm(false)
    setShowDeleteConfirm(false)
    localStorage.removeItem('funcbook_auth_user')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-ivory pb-12">
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-12 sm:pb-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
            Account
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
            Host Settings
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
            Manage your profile, business details, and account preferences
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10">

          {/* ── 1. Profile Settings ────────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <User size={16} className="text-gold-deep" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-gold-deep">Profile Settings</h2>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              {profileSuccess && (
                <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
                  <CheckCircle2 size={16} />
                  Profile updated successfully.
                </div>
              )}

              <div className="flex items-center gap-5 mb-8">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold/10 border-2 border-gold/20 flex items-center justify-center">
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-gold-deep">
                      {profile.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  {isEditingProfile && (
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gold-deep text-white flex items-center justify-center shadow hover:bg-royal transition-colors"
                    >
                      <Camera size={14} />
                    </button>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal truncate">{profile.fullName}</h3>
                  <p className="text-sm text-secondary-text mt-0.5">{profile.email}</p>
                  <p className="text-xs text-secondary-text/60 mt-1">Host since March 2026</p>
                </div>
                {!isEditingProfile && (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300 shrink-0"
                  >
                    <PenLine size={14} />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      disabled={!isEditingProfile}
                      className={`${inputClass} pl-10 ${!isEditingProfile ? 'opacity-60 cursor-default' : ''} ${profileErrors.fullName ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {profileErrors.fullName && <p className="text-xs text-red-500 mt-1">{profileErrors.fullName}</p>}
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditingProfile}
                      className={`${inputClass} pl-10 ${!isEditingProfile ? 'opacity-60 cursor-default' : ''} ${profileErrors.email ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {profileErrors.email && <p className="text-xs text-red-500 mt-1">{profileErrors.email}</p>}
                </div>

                <div>
                  <label className={labelClass}>Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditingProfile}
                      className={`${inputClass} pl-10 ${!isEditingProfile ? 'opacity-60 cursor-default' : ''} ${profileErrors.phone ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {profileErrors.phone && <p className="text-xs text-red-500 mt-1">{profileErrors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Bio / About</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditingProfile}
                    rows={3}
                    className={`${inputClass} resize-none ${!isEditingProfile ? 'opacity-60 cursor-default' : ''}`}
                    placeholder="Tell customers about yourself and your experience..."
                  />
                </div>
              </div>

              {isEditingProfile && (
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
                    onClick={handleCancelProfile}
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-charcoal/60 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ── 2. Business Information ────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Building2 size={16} className="text-gold-deep" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-gold-deep">Business Information</h2>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              {businessSuccess && (
                <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
                  <CheckCircle2 size={16} />
                  Business information updated successfully.
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-secondary-text">
                  Manage your business details visible to customers
                </p>
                {!isEditingBusiness && (
                  <button
                    type="button"
                    onClick={() => setIsEditingBusiness(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300 shrink-0"
                  >
                    <PenLine size={14} />
                    Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Business / Organization Name</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="text"
                      value={business.businessName}
                      onChange={(e) => setBusiness({ ...business, businessName: e.target.value })}
                      disabled={!isEditingBusiness}
                      className={`${inputClass} pl-10 ${!isEditingBusiness ? 'opacity-60 cursor-default' : ''} ${businessErrors.businessName ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {businessErrors.businessName && <p className="text-xs text-red-500 mt-1">{businessErrors.businessName}</p>}
                </div>

                <div>
                  <label className={labelClass}>Business Category</label>
                  <div className="relative">
                    <Star size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <select
                      value={business.category}
                      onChange={(e) => setBusiness({ ...business, category: e.target.value })}
                      disabled={!isEditingBusiness}
                      className={`${inputClass} pl-10 appearance-none ${!isEditingBusiness ? 'opacity-60 cursor-default' : ''} ${businessErrors.category ? 'border-red-400' : ''}`}
                    >
                      <option value="">Select category</option>
                      <option value="Function Hall">Function Hall</option>
                      <option value="Catering">Catering</option>
                      <option value="Decoration">Decoration</option>
                      <option value="Photography">Photography</option>
                      <option value="Music & DJ">Music & DJ</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {businessErrors.category && <p className="text-xs text-red-500 mt-1">{businessErrors.category}</p>}
                </div>

                <div>
                  <label className={labelClass}>GST / Tax ID</label>
                  <div className="relative">
                    <Info size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="text"
                      value={business.gstId}
                      onChange={(e) => setBusiness({ ...business, gstId: e.target.value })}
                      disabled={!isEditingBusiness}
                      placeholder="Optional"
                      className={`${inputClass} pl-10 ${!isEditingBusiness ? 'opacity-60 cursor-default' : ''}`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Location / Address</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-3 text-charcoal/30" />
                    <textarea
                      value={business.address}
                      onChange={(e) => setBusiness({ ...business, address: e.target.value })}
                      disabled={!isEditingBusiness}
                      rows={2}
                      className={`${inputClass} pl-10 resize-none ${!isEditingBusiness ? 'opacity-60 cursor-default' : ''} ${businessErrors.address ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {businessErrors.address && <p className="text-xs text-red-500 mt-1">{businessErrors.address}</p>}
                </div>
              </div>

              {isEditingBusiness && (
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-black/5">
                  <button
                    type="button"
                    onClick={handleSaveBusiness}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelBusiness}
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-charcoal/60 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ── 3. Password & Security ─────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Shield size={16} className="text-gold-deep" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-gold-deep">Password & Security</h2>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {/* Change Password */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Lock size={16} className="text-gold-deep" />
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-gold-deep">Change Password</h3>
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
                          value={passwords.newPass}
                          onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                          placeholder="Enter new password"
                          className={`${inputClass} pl-10 pr-12 ${passwordErrors.newPass ? 'border-red-400' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/60 transition-colors"
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {passwordErrors.newPass && <p className="text-xs text-red-500 mt-1">{passwordErrors.newPass}</p>}
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
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-gold-deep">Two-Factor Authentication</h3>
                      <p className="text-sm text-secondary-text mt-0.5">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-charcoal/5 text-charcoal/50 border border-black/10">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-secondary-text mt-4 pl-12">
                  When enabled, you'll be asked to enter a verification code from your phone each time you sign in from a new device.
                </p>
              </div>
            </div>
          </section>

          {/* ── 4. Notifications ───────────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Bell size={16} className="text-gold-deep" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-gold-deep">Notifications</h2>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              {notificationsSuccess && (
                <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
                  <CheckCircle2 size={16} />
                  Notification preferences saved.
                </div>
              )}

              <div className="divide-y divide-black/5">
                {notificationItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div className="pr-4">
                      <p className="text-sm font-semibold text-royal">{item.label}</p>
                      <p className="text-xs text-secondary-text mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle
                      checked={notifications[item.key]}
                      onToggle={() => handleToggleNotification(item.key)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-black/5">
                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
                >
                  <Save size={16} />
                  Save Preferences
                </button>
              </div>
            </div>
          </section>

          {/* ── 5. Payout Preferences ──────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Wallet size={16} className="text-gold-deep" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-gold-deep">Payout Preferences</h2>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              {payoutSuccess && (
                <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
                  <CheckCircle2 size={16} />
                  Payout details updated successfully.
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-secondary-text">
                  Manage your bank account and payout details
                </p>
                {!isEditingPayout && (
                  <button
                    type="button"
                    onClick={() => setIsEditingPayout(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300 shrink-0"
                  >
                    <PenLine size={14} />
                    Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Bank Account Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="text"
                      value={payout.accountName}
                      onChange={(e) => setPayout({ ...payout, accountName: e.target.value })}
                      disabled={!isEditingPayout}
                      className={`${inputClass} pl-10 ${!isEditingPayout ? 'opacity-60 cursor-default' : ''} ${payoutErrors.accountName ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {payoutErrors.accountName && <p className="text-xs text-red-500 mt-1">{payoutErrors.accountName}</p>}
                </div>

                <div>
                  <label className={labelClass}>Account Number</label>
                  <div className="relative">
                    <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="text"
                      value={payout.accountNumber}
                      onChange={(e) => setPayout({ ...payout, accountNumber: e.target.value })}
                      disabled={!isEditingPayout}
                      placeholder="Enter account number"
                      className={`${inputClass} pl-10 ${!isEditingPayout ? 'opacity-60 cursor-default' : ''} ${payoutErrors.accountNumber ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {payoutErrors.accountNumber && <p className="text-xs text-red-500 mt-1">{payoutErrors.accountNumber}</p>}
                </div>

                <div>
                  <label className={labelClass}>IFSC / SWIFT Code</label>
                  <div className="relative">
                    <Banknote size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="text"
                      value={payout.ifscCode}
                      onChange={(e) => setPayout({ ...payout, ifscCode: e.target.value })}
                      disabled={!isEditingPayout}
                      placeholder="Enter IFSC or SWIFT code"
                      className={`${inputClass} pl-10 ${!isEditingPayout ? 'opacity-60 cursor-default' : ''} ${payoutErrors.ifscCode ? 'border-red-400' : ''}`}
                    />
                  </div>
                  {payoutErrors.ifscCode && <p className="text-xs text-red-500 mt-1">{payoutErrors.ifscCode}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>UPI ID</label>
                  <div className="relative">
                    <Smartphone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input
                      type="text"
                      value={payout.upiId}
                      onChange={(e) => setPayout({ ...payout, upiId: e.target.value })}
                      disabled={!isEditingPayout}
                      placeholder="Optional — e.g. name@upi"
                      className={`${inputClass} pl-10 ${!isEditingPayout ? 'opacity-60 cursor-default' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {isEditingPayout && (
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-black/5">
                  <button
                    type="button"
                    onClick={handleSavePayout}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
                  >
                    <Save size={16} />
                    Update Payout Details
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelPayout}
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-charcoal/60 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ── 6. Privacy ─────────────────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <EyeIcon size={16} className="text-gold-deep" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-gold-deep">Privacy</h2>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
              {privacySuccess && (
                <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
                  <CheckCircle2 size={16} />
                  Privacy settings saved.
                </div>
              )}

              <div className="divide-y divide-black/5">
                <div className="flex items-center justify-between py-4 first:pt-0">
                  <div className="pr-4">
                    <p className="text-sm font-semibold text-royal">Public Profile Visibility</p>
                    <p className="text-xs text-secondary-text mt-0.5">Allow anyone to view your host profile and listings</p>
                  </div>
                  <Toggle
                    checked={privacy.publicProfile}
                    onToggle={() => setPrivacy({ ...privacy, publicProfile: !privacy.publicProfile })}
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="pr-4">
                    <p className="text-sm font-semibold text-royal">Show Contact Information</p>
                    <p className="text-xs text-secondary-text mt-0.5">Display your phone and email to potential customers</p>
                  </div>
                  <Toggle
                    checked={privacy.showContact}
                    onToggle={() => setPrivacy({ ...privacy, showContact: !privacy.showContact })}
                  />
                </div>

                <div className="flex items-center justify-between py-4 last:pb-0">
                  <div className="pr-4">
                    <p className="text-sm font-semibold text-royal">Allow Customer Reviews</p>
                    <p className="text-xs text-secondary-text mt-0.5">Let customers leave reviews on your services</p>
                  </div>
                  <Toggle
                    checked={privacy.allowReviews}
                    onToggle={() => setPrivacy({ ...privacy, allowReviews: !privacy.allowReviews })}
                  />
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-black/5">
                <button
                  type="button"
                  onClick={handleSavePrivacy}
                  className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* ── 7. Danger Zone ─────────────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertTriangle size={16} className="text-red-500" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-gold-deep">Danger Zone</h2>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-red-200/60 shadow-[0_4px_24px_rgba(239,68,68,0.06)] p-6 sm:p-8 space-y-5">
              {/* Deactivate */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-black/5">
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-gold-deep">Deactivate Account</h3>
                  <p className="text-sm text-secondary-text mt-0.5">
                    Temporarily disable your host account. Your listings will be hidden.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeactivateConfirm(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:text-amber-800 transition-all duration-300 shrink-0"
                >
                  <ToggleLeft size={16} />
                  Deactivate Account
                </button>
              </div>

              {/* Delete */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-gold-deep">Delete Account</h3>
                  <p className="text-sm text-secondary-text mt-0.5">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-white border-2 border-red-300 hover:bg-red-50 hover:border-red-400 hover:text-red-700 transition-all duration-300 shrink-0"
                >
                  <Trash2 size={16} />
                  Delete Account
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── Deactivate Confirmation Modal ───────────────────── */}
      {showDeactivateConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
            onClick={() => setShowDeactivateConfirm(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.15)] p-6 sm:p-8 animate-fade-in-up">
            <button
              type="button"
              onClick={() => setShowDeactivateConfirm(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-charcoal/40 hover:text-royal hover:bg-ivory transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-50 border border-amber-200 mx-auto mb-5">
              <AlertTriangle size={24} className="text-amber-500" />
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal text-center">
              Deactivate Account?
            </h3>
            <p className="text-sm text-secondary-text text-center mt-3 leading-relaxed">
              Your listings will be hidden from customers and you won't receive new bookings. You can reactivate anytime.
            </p>

            <div className="flex items-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => setShowDeactivateConfirm(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-charcoal/70 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeactivate}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 shadow-[0_4px_16px_rgba(217,119,6,0.25)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.35)] transition-all duration-300"
              >
                <ToggleLeft size={16} />
                Yes, Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ───────────────────────── */}
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
              This will permanently delete your account, profile, listings, bookings, reviews, and all associated data. This action cannot be reversed.
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
                onClick={handleDeactivate}
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
