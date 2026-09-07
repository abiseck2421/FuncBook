import { AlertTriangle, Trash2, X } from 'lucide-react'

type DangerZoneProps = {
  onDelete: () => void
}

const dangerButton =
  'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-white border-2 border-red-300 hover:bg-red-50 hover:border-red-400 hover:text-red-700 transition-all duration-300 shrink-0'

export default function DangerZone({ onDelete }: DangerZoneProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
          <AlertTriangle size={15} className="text-red-500" />
        </span>
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">Danger Zone</h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-4 sm:p-5">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-red-600">Delete your FuncBook account</p>
          <p className="text-xs text-secondary-text mt-0.5">
            Once your account is deleted, this action cannot be easily reversed.
          </p>
        </div>
        <button type="button" onClick={onDelete} className={dangerButton}>
          <Trash2 size={15} />
          Delete Account
        </button>
      </div>
    </div>
  )
}

type DeleteAccountDialogProps = {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

export function DeleteAccountDialog({ open, onClose, onDelete }: DeleteAccountDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.15)] p-6 sm:p-8 animate-fade-in-up">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-charcoal/40 hover:text-royal hover:bg-ivory transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-200 mx-auto mb-5">
          <AlertTriangle size={24} className="text-red-500" />
        </div>

        <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal text-center">Delete Account?</h3>
        <p className="text-sm text-secondary-text text-center mt-3 leading-relaxed">
          This will permanently delete your account, profile, bookings, reviews, and all associated data. This action
          cannot be reversed.
        </p>

        <div className="flex items-center gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-charcoal/70 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-[0_4px_16px_rgba(239,68,68,0.25)] hover:shadow-[0_4px_20px_rgba(239,68,68,0.35)] transition-all duration-300"
          >
            <Trash2 size={16} />
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}