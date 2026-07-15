import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Star, MessageSquare, CalendarDays, ArrowRight,
  PenLine, ThumbsUp, Trash2, X, Check, Hash,
} from 'lucide-react'

type ReviewFilter = 'all' | '5' | '4' | '3' | '2' | '1'

interface Review {
  id: string
  serviceName: string
  category: string
  bookingRef: string
  date: string
  rating: number
  text: string
  likes: number
}

const initialReviews: Review[] = [
  {
    id: 'REV-001',
    serviceName: 'The Grand Ballroom',
    category: 'Function Halls',
    bookingRef: 'BK-2026-001',
    date: '2026-07-20',
    rating: 5,
    text: 'Absolutely stunning venue! The staff was incredibly professional and the decor was exactly what we envisioned. Our guests couldn\'t stop complimenting the space. Highly recommend for any grand celebration.',
    likes: 12,
  },
  {
    id: 'REV-002',
    serviceName: 'Elegance Decor Studio',
    category: 'Decoration Setups',
    bookingRef: 'BK-2026-003',
    date: '2026-06-25',
    rating: 4,
    text: 'Beautiful decoration setup that transformed the venue. The floral arrangements were gorgeous. Only minor feedback — setup took a bit longer than expected, but the end result was worth the wait.',
    likes: 8,
  },
  {
    id: 'REV-003',
    serviceName: 'Captured Moments',
    category: 'Photographers',
    bookingRef: 'BK-2026-004',
    date: '2026-05-18',
    rating: 5,
    text: 'The photography team was phenomenal! They captured every precious moment of our event with such artistry. The album quality exceeded our expectations. These memories will last a lifetime.',
    likes: 15,
  },
  {
    id: 'REV-004',
    serviceName: 'Glam Studio by Priya',
    category: 'Makeup Artists',
    bookingRef: 'BK-2026-006',
    date: '2026-03-22',
    rating: 4,
    text: 'Priya did an amazing job with the makeup. Very skilled and understood exactly what I wanted. The look lasted the entire event. Would definitely book again for future occasions.',
    likes: 6,
  },
]

const filterTabs: Array<{ key: ReviewFilter; label: string }> = [
  { key: 'all', label: 'All' },
  { key: '5', label: '5★' },
  { key: '4', label: '4★' },
  { key: '3', label: '3★' },
  { key: '2', label: '2★' },
  { key: '1', label: '1★' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

const inputClass = 'w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews)
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [editRating, setEditRating] = useState(5)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const filteredReviews = activeFilter === 'all'
    ? reviews
    : reviews.filter((r) => r.rating === Number(activeFilter))

  const counts: Record<ReviewFilter, number> = {
    all: reviews.length,
    '5': reviews.filter((r) => r.rating === 5).length,
    '4': reviews.filter((r) => r.rating === 4).length,
    '3': reviews.filter((r) => r.rating === 3).length,
    '2': reviews.filter((r) => r.rating === 2).length,
    '1': reviews.filter((r) => r.rating === 1).length,
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  function handleEdit(review: Review) {
    setEditingId(review.id)
    setEditText(review.text)
    setEditRating(review.rating)
  }

  function handleSaveEdit(id: string) {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, text: editText, rating: editRating } : r
      )
    )
    setEditingId(null)
  }

  function handleCancelEdit() {
    setEditingId(null)
  }

  function handleDelete(id: string) {
    setReviews((prev) => prev.filter((r) => r.id !== id))
    setDeleteConfirmId(null)
  }

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          Feedback
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
          My Reviews
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
          Share your experiences and help others make informed decisions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <div className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Star size={18} className="text-gold-deep" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
              Avg Rating
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">{avgRating}</span>
            <span className="text-xs text-secondary-text">/ 5</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <MessageSquare size={18} className="text-gold-deep" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
              Reviews
            </span>
          </div>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">
            {reviews.length}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <ThumbsUp size={18} className="text-gold-deep" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
              Total Likes
            </span>
          </div>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">
            {reviews.reduce((sum, r) => sum + r.likes, 0)}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-royal text-white shadow-[0_4px_16px_rgba(17,17,17,0.15)]'
                  : 'bg-white text-charcoal border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5'
              }`}
            >
              {tab.label}
              <span className={`inline-flex items-center justify-center min-w-[18px] sm:min-w-[22px] h-[18px] sm:h-[22px] px-1 sm:px-1.5 rounded-full text-[10px] sm:text-xs font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-gold/10 text-gold-deep'
              }`}>
                {counts[tab.key]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Review Cards */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {filteredReviews.map((review) => {
            const isEditing = editingId === review.id
            const isDeleting = deleteConfirmId === review.id

            return (
              <div
                key={review.id}
                className="group bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-gold-deep/25 hover:shadow-[0_8px_32px_rgba(184,134,11,0.08)] transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <span className="font-heading text-sm sm:text-base font-bold text-gold-deep">P</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-royal leading-tight">
                          {review.serviceName}
                        </h3>
                        {/* Star rating — display or edit */}
                        {isEditing ? (
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }, (_, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setEditRating(i + 1)}
                                className="p-0"
                              >
                                <Star
                                  size={16}
                                  className={i < editRating ? 'text-gold fill-gold' : 'text-charcoal/15'}
                                />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? 'text-gold fill-gold' : 'text-charcoal/15'}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-gold-deep mb-1.5">
                        {review.category}
                      </p>

                      {/* Review text — display or edit */}
                      {isEditing ? (
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={3}
                          className={`${inputClass} resize-none mt-1`}
                        />
                      ) : (
                        <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                          {review.text}
                        </p>
                      )}

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-secondary-text">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={12} className="text-gold-deep" />
                          {formatDate(review.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Hash size={12} className="text-gold-deep" />
                          {review.bookingRef}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ThumbsUp size={12} className="text-gold-deep" />
                          {review.likes} likes
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(review.id)}
                            disabled={!editText.trim()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                          >
                            <Check size={12} />
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-charcoal/60 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
                          >
                            <X size={12} />
                            Cancel
                          </button>
                        </>
                      ) : isDeleting ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleDelete(review.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-all duration-300"
                          >
                            <Check size={12} />
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-charcoal/60 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
                          >
                            <X size={12} />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEdit(review)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300"
                          >
                            <PenLine size={12} />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(review.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 bg-red-50/80 border border-red-200/60 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-8 sm:p-10 md:p-16 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/10 border border-gold/20 mb-4 sm:mb-5">
            <Star size={24} className="text-gold-deep sm:hidden" />
            <Star size={28} className="text-gold-deep hidden sm:block" />
          </div>
          <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-royal">
            No reviews found
          </h3>
          <p className="text-secondary-text text-xs sm:text-sm mt-2 max-w-sm mx-auto">
            {activeFilter === 'all'
              ? "You haven't written any reviews yet. Complete a booking and share your experience."
              : `No ${activeFilter}-star reviews to show. Try a different filter.`}
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-xs sm:text-sm mt-5 sm:mt-6 shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] transition-all duration-400"
          >
            Browse Services
            <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </div>
  )
}
