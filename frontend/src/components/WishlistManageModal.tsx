import { useState, useEffect } from 'react'
import { Heart, Trash2, ArrowRightLeft, X, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useWishlist } from '../contexts/WishlistContext'
import type { Service } from '../data/categories'

interface WishlistManageModalProps {
  service: Service
  isOpen: boolean
  onClose: () => void
}

export default function WishlistManageModal({ service, isOpen, onClose }: WishlistManageModalProps) {
  const { collections, removeFromCollection, moveService, getCollectionsForService } = useWishlist()
  const [toast, setToast] = useState<string | null>(null)
  const [confirmRemove, setConfirmRemove] = useState(false)
  const [selectedMoveId, setSelectedMoveId] = useState<string | null>(null)

  const currentCollections = getCollectionsForService(service.id)
  const currentCol = currentCollections[0]
  const otherCollections = collections.filter(
    (col) => col.id !== currentCol?.id && !col.services.some((s) => s.id === service.id),
  )

  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setConfirmRemove(false)
      setSelectedMoveId(null)
      setToast(null)
    }
  }, [isOpen])

  function handleRemove() {
    if (!currentCol) return
    removeFromCollection(service.id, currentCol.id)
    setToast('Removed from Wishlist.')
    setTimeout(() => {
      setToast(null)
      onClose()
    }, 1200)
  }

  function handleMove() {
    if (!currentCol || !selectedMoveId) return
    const targetCol = collections.find((c) => c.id === selectedMoveId)
    const moved = moveService(service.id, currentCol.id, selectedMoveId)
    if (!moved) {
      setToast(`This service already exists in "${targetCol?.name}".`)
      setTimeout(() => setToast(null), 3000)
      return
    }
    setToast(`Moved to "${targetCol?.name}" successfully.`)
    setTimeout(() => {
      setToast(null)
      onClose()
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[500px] bg-white rounded-[22px] shadow-[0_24px_80px_rgba(0,0,0,0.18)] animate-fade-in-up">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl text-charcoal/40 hover:text-royal hover:bg-ivory transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-black/5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <Heart size={18} className="text-red-500 fill-red-500" />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">Manage Wishlist</h2>
          </div>
          <p className="text-sm text-secondary-text mt-2 pl-12">
            This service is already in your wishlist.
          </p>

          <div className="flex items-center gap-3 mt-4 p-3 rounded-2xl bg-ivory/60 border border-gold-deep/10">
            <img
              src={service.image}
              alt={service.name}
              className="w-12 h-12 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-royal truncate">{service.name}</p>
              <p className="text-xs text-secondary-text truncate">{service.location}</p>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="mx-7 mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium animate-fade-in">
            <CheckCircle2 size={16} className="shrink-0" />
            {toast}
          </div>
        )}

        <div className="px-7 py-5 space-y-5">
          {/* Current location */}
          {currentCol && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-2">
                Currently saved in
              </p>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gold/5 border border-gold-deep/15">
                <span className="text-lg shrink-0">{currentCol.icon}</span>
                <span className="text-sm font-semibold text-royal">{currentCol.name}</span>
                <CheckCircle2 size={14} className="text-gold-deep ml-auto shrink-0" />
              </div>
            </div>
          )}

          {/* Remove section */}
          <div>
            {!confirmRemove ? (
              <button
                type="button"
                onClick={() => setConfirmRemove(true)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-red-200 bg-red-50/50 text-left hover:bg-red-50 hover:border-red-300 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <Trash2 size={14} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-600">Remove from Wishlist</p>
                  <p className="text-xs text-red-400 mt-0.5">Delete this service from your wishlist</p>
                </div>
              </button>
            ) : (
              <div className="p-4 rounded-2xl border border-red-200 bg-red-50/50 animate-fade-in">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle size={14} className="text-red-500" />
                  </div>
                  <p className="text-sm text-red-700 font-medium leading-relaxed">
                    Are you sure you want to remove this service from your wishlist?
                  </p>
                </div>
                <div className="flex gap-2 ml-11">
                  <button
                    type="button"
                    onClick={() => setConfirmRemove(false)}
                    className="px-4 py-2 rounded-xl border border-black/10 text-sm font-semibold text-secondary-text hover:bg-ivory transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold shadow-[0_4px_12px_rgba(239,68,68,0.25)] hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Move section */}
          {otherCollections.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-2">
                Move to Collection
              </p>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {otherCollections.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setSelectedMoveId(selectedMoveId === col.id ? null : col.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all duration-200 ${
                      selectedMoveId === col.id
                        ? 'bg-gold/10 border-gold-deep/30 ring-1 ring-gold/20'
                        : 'bg-white border-black/5 hover:border-gold-deep/25 hover:bg-gold/5'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      selectedMoveId === col.id ? 'border-gold-deep bg-gold-deep' : 'border-charcoal/20'
                    }`}>
                      {selectedMoveId === col.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-lg shrink-0">{col.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-royal truncate">{col.name}</p>
                      <p className="text-xs text-secondary-text">
                        {col.services.length} {col.services.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {selectedMoveId && (
                <button
                  type="button"
                  onClick={handleMove}
                  className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gold-deep text-white text-sm font-semibold shadow-[0_4px_12px_rgba(184,134,11,0.25)] hover:bg-royal transition-all duration-300 animate-fade-in"
                >
                  <ArrowRightLeft size={15} />
                  Move to Collection
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
