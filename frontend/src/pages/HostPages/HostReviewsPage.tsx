import { useState, useMemo } from 'react'
import {
  Star, MessageSquare, Reply as ReplyIcon, X, Check,
  CalendarDays, Hash, Search, ChevronDown, Clock, TrendingUp,
} from 'lucide-react'

type ReviewFilter = 'all' | '5' | '4' | '3' | '2' | '1'
type SortOption = 'newest' | 'oldest' | 'highest'

interface Review {
  id: string
  customerName: string
  customerInitials: string
  serviceName: string
  category: string
  bookingRef: string
  date: string
  rating: number
  text: string
  reply?: string
}

const reviews: Review[] = [
  {
    id: 'REV-001', customerName: 'Priya Sharma', customerInitials: 'PS',
    serviceName: 'Royal Palace Banquet Hall', category: 'Venues',
    bookingRef: 'BK-1019', date: '2026-07-20', rating: 5,
    text: 'Absolutely stunning venue! The staff was incredibly professional and the decor was exactly what we envisioned. Our guests couldn\'t stop complimenting the space. Highly recommend for any grand celebration.',
    reply: 'Thank you so much Priya! It was our pleasure hosting your event. We look forward to welcoming you again!',
  },
  {
    id: 'REV-002', customerName: 'Rahul Verma', customerInitials: 'RV',
    serviceName: 'Spice Route Catering', category: 'Catering',
    bookingRef: 'BK-1022', date: '2026-06-25', rating: 4,
    text: 'The food was absolutely delicious! Every dish was perfectly prepared. Only minor feedback — service was slightly slow during the main course, but the quality more than made up for it.',
  },
  {
    id: 'REV-003', customerName: 'Ananya Gupta', customerInitials: 'AG',
    serviceName: 'Bloom & Bliss Decor', category: 'Decoration',
    bookingRef: 'BK-1025', date: '2026-05-18', rating: 5,
    text: 'The decoration team transformed our venue into a dream! The floral arrangements were breathtaking. Every detail was thoughtfully executed. Our guests were in awe.',
    reply: 'Ananya, your vision made it all come together beautifully!',
  },
  {
    id: 'REV-004', customerName: 'Vikram Patel', customerInitials: 'VP',
    serviceName: 'Royal Palace Banquet Hall', category: 'Venues',
    bookingRef: 'BK-1030', date: '2026-03-22', rating: 3,
    text: 'The venue itself was beautiful, but the air conditioning wasn\'t working properly during our event. Management was responsive and offered a discount, but it impacted the experience.',
  },
  {
    id: 'REV-005', customerName: 'Sneha Iyer', customerInitials: 'SI',
    serviceName: 'Lens & Light Photography', category: 'Photography',
    bookingRef: 'BK-1035', date: '2026-07-12', rating: 5,
    text: 'The photography team captured every precious moment of our wedding beautifully. The candid shots were phenomenal and the album delivery was ahead of schedule. Truly talented professionals!',
    reply: 'Sneha, it was an honor to document your special day!',
  },
  {
    id: 'REV-006', customerName: 'Arjun Nair', customerInitials: 'AN',
    serviceName: 'Spice Route Catering', category: 'Catering',
    bookingRef: 'BK-1036', date: '2026-04-10', rating: 5,
    text: 'Outstanding catering service! The variety and taste of food was exceptional. Our 200 guests were all impressed. The team was well-organized and punctual.',
    reply: 'Thank you Arjun! We take pride in delivering memorable culinary experiences.',
  },
  {
    id: 'REV-007', customerName: 'Kavitha Reddy', customerInitials: 'KR',
    serviceName: 'Bloom & Bliss Decor', category: 'Decoration',
    bookingRef: 'BK-1040', date: '2026-02-14', rating: 2,
    text: 'The initial setup looked great but some arrangements wilted by the evening. The centerpieces were not what was discussed in the consultation. Disappointed with the inconsistency.',
  },
  {
    id: 'REV-008', customerName: 'Mohammed Farhan', customerInitials: 'MF',
    serviceName: 'Grand Terrace Lounge', category: 'Venues',
    bookingRef: 'BK-1042', date: '2026-01-20', rating: 4,
    text: 'Great venue with excellent views. The sound system was top-notch. Slight delay in getting the bar area set up, but overall a fantastic experience for our anniversary party.',
  },
  {
    id: 'REV-009', customerName: 'Deepa Krishnan', customerInitials: 'DK',
    serviceName: 'Lens & Light Photography', category: 'Photography',
    bookingRef: 'BK-1045', date: '2026-07-05', rating: 5,
    text: 'Absolutely loved working with this team! They were patient, creative, and delivered stunning photos. The drone footage was an incredible addition to our wedding video.',
    reply: 'Deepa, your feedback means the world to us!',
  },
  {
    id: 'REV-010', customerName: 'Rohit Sharma', customerInitials: 'RS',
    serviceName: 'Spice Route Catering', category: 'Catering',
    bookingRef: 'BK-1048', date: '2026-06-01', rating: 3,
    text: 'Food quality was good but the quantity was insufficient for our guest count. Had to arrange for additional food at the last minute. Communication about portions could have been better.',
  },
  {
    id: 'REV-011', customerName: 'Nisha Agarwal', customerInitials: 'NA',
    serviceName: 'Royal Palace Banquet Hall', category: 'Venues',
    bookingRef: 'BK-1050', date: '2026-05-28', rating: 5,
    text: 'The most beautiful venue we have ever seen! Every corner was Instagram-worthy. The lighting, the stage setup, the seating — everything was perfect. Our dream wedding came true here.',
    reply: 'Nisha, creating magical moments is what we do best!',
  },
  {
    id: 'REV-012', customerName: 'Sanjay Mehta', customerInitials: 'SM',
    serviceName: 'Bloom & Bliss Decor', category: 'Decoration',
    bookingRef: 'BK-1052', date: '2026-04-18', rating: 1,
    text: 'Very disappointing experience. The decoration was nothing like what was promised. Missing elements, poor quality flowers, and the team arrived late. Would not recommend.',
  },
]

const filterTabs: Array<{ key: ReviewFilter; label: string }> = [
  { key: 'all', label: 'All Reviews' },
  { key: '5', label: '5 Stars' },
  { key: '4', label: '4 Stars' },
  { key: '3', label: '3 Stars' },
  { key: '2', label: '2 Stars' },
  { key: '1', label: '1 Star' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}

const ratingBreakdown = [
  { stars: 5, count: 5 },
  { stars: 4, count: 3 },
  { stars: 3, count: 2 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
]

const totalReviews = reviews.length
const maxBreakdown = Math.max(...ratingBreakdown.map((r) => r.count))

export default function HostReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [replyingId, setReplyingId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [localReviews, setLocalReviews] = useState(reviews)

  const avgRating = (localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length).toFixed(1)
  const fiveStarCount = localReviews.filter((r) => r.rating === 5).length
  const repliedCount = localReviews.filter((r) => r.reply).length
  const responseRate = Math.round((repliedCount / localReviews.length) * 100)

  const counts: Record<ReviewFilter, number> = {
    all: localReviews.length,
    '5': localReviews.filter((r) => r.rating === 5).length,
    '4': localReviews.filter((r) => r.rating === 4).length,
    '3': localReviews.filter((r) => r.rating === 3).length,
    '2': localReviews.filter((r) => r.rating === 2).length,
    '1': localReviews.filter((r) => r.rating === 1).length,
  }

  const filteredReviews = useMemo(() => {
    let result = activeFilter === 'all'
      ? localReviews
      : localReviews.filter((r) => r.rating === Number(activeFilter))

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((r) => r.customerName.toLowerCase().includes(q))
    }

    if (sortBy === 'newest') {
      result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === 'oldest') {
      result = [...result].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [activeFilter, searchQuery, sortBy, localReviews])

  const recentReviews = [...localReviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  function handleReply(id: string) {
    setLocalReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, reply: replyText.trim() || undefined } : r)),
    )
    setReplyingId(null)
    setReplyText('')
  }

  function handleDeleteReply(id: string) {
    setLocalReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, reply: undefined } : r)),
    )
  }

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-12 sm:pb-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          Feedback
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
          Reviews
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
          View customer feedback and ratings for your services.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {[
          { label: 'Average Rating', value: avgRating, suffix: '/ 5', icon: Star },
          { label: 'Total Reviews', value: totalReviews, suffix: '', icon: MessageSquare },
          { label: '5-Star Reviews', value: fiveStarCount, suffix: '', icon: TrendingUp },
          { label: 'Response Rate', value: `${responseRate}%`, suffix: '', icon: ReplyIcon },
        ].map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Icon size={18} className="text-gold-deep" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
                  {card.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">{card.value}</span>
                {card.suffix && <span className="text-xs text-secondary-text">{card.suffix}</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Rating Overview */}
      <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 mb-6 sm:mb-8">
        <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Rating Overview</h2>
        <div className="flex flex-col md:flex-row gap-8 md:items-center">
          <div className="flex flex-col items-center md:items-start shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <Star size={32} className="fill-gold text-gold" />
              <span className="font-heading text-5xl font-bold text-royal">{avgRating}</span>
            </div>
            <p className="text-sm text-secondary-text">{totalReviews} total reviews</p>
          </div>

          <div className="flex-1 space-y-2.5 w-full">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-secondary-text w-14 shrink-0">
                  {item.stars} ★
                </span>
                <div className="flex-1 h-2.5 bg-gold/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gold-deep transition-all duration-500"
                    style={{ width: `${(item.count / maxBreakdown) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-royal w-8 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-8">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key
            return (
              <button
                key={tab.key}
                type="button"
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

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-text" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-deep/15 bg-white text-sm text-royal placeholder:text-secondary-text/60 focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors"
            />
          </div>
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none w-full sm:w-48 px-4 py-2.5 pr-9 rounded-xl border border-gold-deep/15 bg-white text-sm text-royal font-semibold focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          {filteredReviews.map((review) => {
            const isReplying = replyingId === review.id
            return (
              <div
                key={review.id}
                className="group bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-gold-deep/25 hover:shadow-[0_8px_32px_rgba(184,134,11,0.08)] transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <span className="font-heading text-sm sm:text-base font-bold text-gold-deep">
                        {review.customerInitials}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-royal leading-tight">
                          {review.customerName}
                        </h3>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? 'text-gold fill-gold' : 'text-charcoal/15'}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-gold-deep mb-1.5">
                        {review.serviceName} · {review.category}
                      </p>

                      <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                        {review.text}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-secondary-text">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={12} className="text-gold-deep" />
                          {formatDate(review.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Hash size={12} className="text-gold-deep" />
                          {review.bookingRef}
                        </span>
                      </div>

                      {review.reply && !isReplying && (
                        <div className="mt-4 ml-4 pl-4 border-l-2 border-gold-deep/20 bg-gold/5 rounded-r-xl p-3">
                          <div className="flex items-center gap-2 mb-1.5">
                            <ReplyIcon size={12} className="text-gold-deep" />
                            <span className="text-[10px] sm:text-xs font-semibold text-gold-deep uppercase tracking-wider">Your Reply</span>
                          </div>
                          <p className="text-sm text-secondary-text">{review.reply}</p>
                        </div>
                      )}

                      {isReplying && (
                        <div className="mt-4">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={3}
                            placeholder="Write your reply..."
                            className="w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors resize-none"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0">
                      {isReplying ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleReply(review.id)}
                            disabled={!replyText.trim()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                          >
                            <Check size={12} />
                            Reply
                          </button>
                          <button
                            type="button"
                            onClick={() => { setReplyingId(null); setReplyText('') }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-charcoal/60 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
                          >
                            <X size={12} />
                            Cancel
                          </button>
                        </>
                      ) : review.reply ? (
                        <>
                          <button
                            type="button"
                            onClick={() => { setReplyingId(review.id); setReplyText(review.reply || '') }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300"
                          >
                            <ReplyIcon size={12} />
                            Edit Reply
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteReply(review.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 bg-red-50/80 border border-red-200/60 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
                          >
                            <X size={12} />
                            Delete
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => { setReplyingId(review.id); setReplyText('') }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300"
                        >
                          <ReplyIcon size={12} />
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-8 sm:p-10 md:p-16 text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/10 border border-gold/20 mb-4 sm:mb-5">
            <Star size={24} className="text-gold-deep sm:hidden" />
            <Star size={28} className="text-gold-deep hidden sm:block" />
          </div>
          <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-royal">
            No reviews found
          </h3>
          <p className="text-secondary-text text-xs sm:text-sm mt-2 max-w-sm mx-auto">
            {activeFilter === 'all' && !searchQuery
              ? "You haven't received any reviews yet. Complete bookings to start collecting feedback."
              : "No reviews match your filters. Try adjusting your search or filter criteria."}
          </p>
        </div>
      )}

      {/* Recent Feedback Timeline */}
      <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock size={18} className="text-gold-deep" />
          <h2 className="font-heading text-lg sm:text-xl font-bold text-royal">Recent Feedback</h2>
        </div>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gold-deep/10" />
          <div className="space-y-5">
            {recentReviews.map((review, i) => (
              <div key={review.id} className="flex gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-gold/10 border-2 border-ivory flex items-center justify-center shrink-0 z-10">
                  <span className="font-heading text-xs font-bold text-gold-deep">{review.customerInitials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-0.5">
                    <h4 className="text-sm font-semibold text-royal">{review.customerName}</h4>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star key={j} size={10} className={j < review.rating ? 'text-gold fill-gold' : 'text-charcoal/15'} />
                      ))}
                    </div>
                    <span className="text-[10px] text-secondary-text">{timeAgo(review.date)}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary-text leading-relaxed line-clamp-2">
                    {review.text}
                  </p>
                  <p className="text-[10px] text-gold-deep font-semibold mt-1 uppercase tracking-wider">
                    {review.serviceName}
                  </p>
                </div>
                {i < recentReviews.length - 1 && (
                  <div className="absolute left-[18px] top-10 w-0.5 h-full bg-gold-deep/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
