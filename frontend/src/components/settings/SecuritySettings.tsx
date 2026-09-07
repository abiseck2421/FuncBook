import { useState } from 'react'
import { ChevronRight, Eye, EyeOff, Lock, LogOut, Monitor, Smartphone } from 'lucide-react'
import SecurityRow from './SecurityRow'
import SettingsSectionHeader from './SettingsSectionHeader'
import SuccessBanner from './SuccessBanner'
import Toggle from './Toggle'
import { buttonGold, buttonSoft, buttonSoftDanger, inputClass, labelClass } from './styles'

export default function SecuritySettings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showSessions, setShowSessions] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const [passwordErrors, setPasswordErrors] = useState<Partial<Record<'current' | 'new' | 'confirm', string>>>({})
  const [passwordSuccess, setPasswordSuccess] = useState(false)

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
    <div>
      <SettingsSectionHeader title="Security" description="Keep your FuncBook account secure." />

      <div className="divide-y divide-black/5">
        {/* Password */}
        <SecurityRow
          icon={Lock}
          title="Password"
          description="Last changed recently"
          action={
            <button type="button" onClick={() => setShowPasswordForm(!showPasswordForm)} className={buttonSoft}>
              <ChevronRight size={14} className={`transition-transform duration-300 ${showPasswordForm ? 'rotate-90' : ''}`} />
              Change Password
            </button>
          }
        >
          {showPasswordForm && (
            <div className="border border-gold-deep/10 rounded-xl bg-ivory/50 p-4 animate-slide-in">
              {passwordSuccess && (
                <div className="mb-4">
                  <SuccessBanner message="Password updated successfully." />
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

              <div className="mt-4 pt-4 border-t border-black/5">
                <button type="button" onClick={handleChangePassword} className={buttonGold}>
                  <Lock size={16} />
                  Update Password
                </button>
              </div>
            </div>
          )}
        </SecurityRow>

        {/* Two-Factor Authentication */}
        <SecurityRow
          icon={Smartphone}
          title="Two-Factor Authentication"
          description="Add an extra layer of protection"
          action={<Toggle checked={twoFactorEnabled} onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)} label="Two-Factor Authentication" />}
        >
          {twoFactorEnabled && (
            <p className="text-xs text-secondary-text pl-12">
              When enabled, you'll be asked to enter a verification code from your phone each time you sign in from a
              new device.
            </p>
          )}
        </SecurityRow>

        {/* Active Sessions */}
        <SecurityRow
          icon={Monitor}
          title="Active Sessions"
          description="Chrome on Windows • Active now"
          action={
            <button type="button" onClick={() => setShowSessions(!showSessions)} className={buttonSoft}>
              <ChevronRight size={14} className={`transition-transform duration-300 ${showSessions ? 'rotate-90' : ''}`} />
              Manage
            </button>
          }
        >
          {showSessions && (
            <div className="space-y-3 border border-gold-deep/10 rounded-xl bg-ivory/50 p-4 animate-slide-in">
              <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-white border border-gold-deep/10">
                <div className="w-9 h-9 rounded-lg bg-gold-deep/10 flex items-center justify-center shrink-0">
                  <Monitor size={15} className="text-gold-deep" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-royal">Windows — Chrome</p>
                  <p className="text-xs text-secondary-text mt-0.5">Current device</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  Active now
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-white border border-gold-deep/10">
                <div className="w-9 h-9 rounded-lg bg-charcoal/5 flex items-center justify-center shrink-0">
                  <Smartphone size={15} className="text-charcoal/40" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-royal">iPhone — Safari</p>
                  <p className="text-xs text-secondary-text mt-0.5">Last login: Jul 18, 2026 at 3:42 PM</p>
                </div>
                <span className="text-xs text-secondary-text hidden sm:inline shrink-0">Mumbai</span>
              </div>

              <div className="pt-3 border-t border-black/5">
                <button type="button" className={buttonSoftDanger}>
                  <LogOut size={16} />
                  Logout All Devices
                </button>
              </div>
            </div>
          )}
        </SecurityRow>
      </div>
    </div>
  )
}