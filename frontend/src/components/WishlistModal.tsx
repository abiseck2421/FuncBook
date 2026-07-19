import { useState, useEffect, useRef } from 'react'
import { Heart, Plus, X, CheckCircle2, FolderOpen } from 'lucide-react'
import { useWishlist } from '../contexts/WishlistContext'
import type { Service } from '../data/categories'

interface WishlistModalProps {
  service: Service
  isOpen: boolean
  onClose: () => void
}

export default function WishlistModal({ service, isOpen, onClose }: WishlistModalProps) {
  const { collections, addToCollection, createCollection, getCollectionsForService } = useWishlist()
  const [newName, setNewName] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const inCollections = getCollectionsForService(service.id)

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
      setNewName('')
      setShowCreate(false)
      setToast(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (showCreate && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showCreate])

  function handleSelectCollection(collectionId: string) {
    const col = collections.find((c) => c.id === collectionId)
    const added = addToCollection(service, collectionId)
    if (!added) {
      setToast(`This service is already in "${col?.name}".`)
      setTimeout(() => setToast(null), 3000)
      return
    }
    setToast(`Added to "${col?.name}" successfully.`)
    setTimeout(() => {
      setToast(null)
      onClose()
    }, 1200)
  }

  function handleCreateCollection() {
    const trimmed = newName.trim()
    if (!trimmed) return
    const col = createCollection(trimmed, '\u2764\uFE0F', service)
    setToast(`Added to "${col.name}" successfully.`)
    setTimeout(() => {
      setToast(null)
      onClose()
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-[520px] bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] animate-fade-in-up"
      >
        {/* Close */}
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
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">Save to Wishlist</h2>
          </div>
          <p className="text-sm text-secondary-text mt-2 pl-12">
            Choose a collection or create a new one.
          </p>

          {/* Service preview */}
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

        {/* Collections */}
        <div className="px-7 py-5 max-h-[340px] overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">
            Existing Collections
          </p>
          <div className="space-y-2">
            {collections.map((col) => {
              const isIn = inCollections.some((c) => c.id === col.id)
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => handleSelectCollection(col.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all duration-200 ${
                    isIn
                      ? 'bg-gold/5 border-gold-deep/20 hover:border-gold-deep/40'
                      : 'bg-white border-black/5 hover:border-gold-deep/25 hover:bg-gold/5'
                  }`}
                >
                  <span className="text-lg shrink-0">{col.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-royal truncate">{col.name}</p>
                    <p className="text-xs text-secondary-text">
                      {col.services.length} {col.services.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  {isIn && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gold-deep/10 text-gold-deep shrink-0">
                      <CheckCircle2 size={10} />
                      Saved
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Create new collection */}
        <div className="px-7 pb-7">
          {!showCreate ? (
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-gold-deep/20 text-sm font-semibold text-gold-deep hover:border-gold-deep/40 hover:bg-gold/5 transition-all duration-200"
            >
              <Plus size={16} />
              Create New Collection
            </button>
          ) : (
            <div className="p-4 rounded-2xl border border-gold-deep/15 bg-ivory/30">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-2">
                Collection Name
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FolderOpen size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateCollection()
                    }}
                    placeholder="e.g. Wedding Ideas"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gold-deep/15 bg-white text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCreateCollection}
                  disabled={!newName.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-deep text-white text-sm font-semibold shadow-[0_4px_12px_rgba(184,134,11,0.25)] hover:bg-royal disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shrink-0"
                >
                  <Plus size={14} />
                  Create
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
