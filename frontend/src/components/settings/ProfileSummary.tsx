import { Camera, PenLine } from 'lucide-react'
import { buttonSoft, whiteCard } from './styles'

type ProfileSummaryProps = {
  name: string
  email: string
  initials: string
  memberSince: string
  isEditing: boolean
  onEdit: () => void
}

export default function ProfileSummary({
  name,
  email,
  initials,
  memberSince,
  isEditing,
  onEdit,
}: ProfileSummaryProps) {
  return (
    <div className={`${whiteCard} p-4`}>
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold/20 grid place-items-center">
            <span className="font-heading text-lg font-bold text-gold-deep">{initials}</span>
          </div>
          {isEditing && (
            <button
              type="button"
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gold-deep text-white flex items-center justify-center shadow-md hover:bg-royal transition-colors"
              aria-label="Upload profile photo"
            >
              <Camera size={11} />
            </button>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg font-bold text-royal leading-snug truncate">{name}</h3>
          <p className="text-sm text-secondary-text leading-snug truncate">{email}</p>
          <p className="text-xs text-secondary-text/60 mt-0.5 leading-snug">{memberSince}</p>
        </div>

        {!isEditing && (
          <button type="button" onClick={onEdit} className={buttonSoft}>
            <PenLine size={14} />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}