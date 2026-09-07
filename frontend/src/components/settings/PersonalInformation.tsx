import { Mail, MapPin, Phone, Save, User, type LucideIcon } from 'lucide-react'
import { buttonGold, buttonSecondary, inputClass, labelClass } from './styles'
import type { ProfileData } from './types'

interface FieldConfig {
  key: keyof ProfileData
  label: string
  icon: LucideIcon
  type?: string
}

const fields: FieldConfig[] = [
  { key: 'name', label: 'Full Name', icon: User },
  { key: 'email', label: 'Email Address', icon: Mail, type: 'email' },
  { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
  { key: 'location', label: 'Location', icon: MapPin },
]

type PersonalInformationProps = {
  profile: ProfileData
  errors: Partial<Record<keyof ProfileData, string>>
  isEditing: boolean
  onChange: (field: keyof ProfileData, value: string) => void
  onSave: () => void
  onCancel: () => void
}

export default function PersonalInformation({
  profile,
  errors,
  isEditing,
  onChange,
  onSave,
  onCancel,
}: PersonalInformationProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-bold text-royal">Personal Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-3 sm:mt-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`profile-${field.key}`} className={labelClass}>
              {field.label}
            </label>
            <div className="relative">
              <field.icon
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30 pointer-events-none"
              />
              <input
                id={`profile-${field.key}`}
                type={field.type ?? 'text'}
                value={profile[field.key]}
                onChange={(e) => onChange(field.key, e.target.value)}
                disabled={!isEditing}
                className={`${inputClass} pl-10 ${!isEditing ? 'opacity-60 cursor-default' : ''} ${
                  errors[field.key] ? 'border-red-400' : ''
                }`}
              />
            </div>
            {errors[field.key] && <p className="text-xs text-red-500 mt-1">{errors[field.key]}</p>}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-black/5">
          <button type="button" onClick={onSave} className={buttonGold}>
            <Save size={16} />
            Save Changes
          </button>
          <button type="button" onClick={onCancel} className={buttonSecondary}>
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}