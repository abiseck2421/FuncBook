import { useState } from 'react'
import {
  HelpCircle, ChevronDown, Search, MessageCircle,
  Phone, Mail, CreditCard, CalendarDays,
  Star, Shield, ArrowRight, Send, CheckCircle2, XCircle,
} from 'lucide-react'

type FaqCategory = 'Booking' | 'Payment' | 'Cancellation' | 'Account' | 'Reviews'

interface FAQ {
  question: string
  answer: string
  category: FaqCategory
}

const faqs: FAQ[] = [
  {
    question: 'How do I book a service?',
    answer: 'Browse our services, select the one you like, choose your preferred date and time, and proceed to checkout. You\'ll receive a confirmation once the booking is complete.',
    category: 'Booking',
  },
  {
    question: 'How do I reschedule a booking?',
    answer: 'Go to My Bookings, find your upcoming booking, and click the reschedule option. You can reschedule up to 48 hours before the event date at no extra charge.',
    category: 'Booking',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI, credit/debit cards, net banking, and popular wallets. All transactions are secured with industry-standard encryption.',
    category: 'Payment',
  },
  {
    question: 'How do I request a refund?',
    answer: 'Refunds are processed within 5-7 business days for eligible cancellations. You can request a refund from the Payment History page. Cancellations made more than 7 days before the event receive a full refund.',
    category: 'Refund',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'You can cancel a booking up to 48 hours before the scheduled date for a full refund. Cancellations within 48 hours may incur a 20% fee. No-shows are non-refundable.',
    category: 'Cancellation',
  },
  {
    question: 'Can I cancel a confirmed booking?',
    answer: 'Yes, you can cancel any upcoming booking from the My Bookings page. The refund amount depends on when you cancel relative to the event date.',
    category: 'Cancellation',
  },
  {
    question: 'How do I leave a review?',
    answer: 'After a completed booking, you\'ll receive a prompt to leave a review. You can also visit the My Reviews page to write or edit your reviews at any time.',
    category: 'Reviews',
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Absolutely. We use industry-standard encryption and never share your personal data with third parties without your explicit consent. Read our Privacy Policy for full details.',
    category: 'Account',
  },
  {
    question: 'How do I update my profile information?',
    answer: 'Go to Settings from the sidebar, select the Profile tab, and click Edit. You can update your name, email, phone, location, and bio. Don\'t forget to save your changes.',
    category: 'Account',
  },
  {
    question: 'How do I become a host/service provider?',
    answer: 'Click "Become a Host" from the navigation menu. Fill out the application form with your service details, and our team will review it within 3-5 business days.',
    category: 'Account',
  },
]

const categoryConfig: Record<FaqCategory, { icon: typeof HelpCircle; color: string }> = {
  Booking: { icon: CalendarDays, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  Payment: { icon: CreditCard, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  Cancellation: { icon: XCircle, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  Reviews: { icon: Star, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  Account: { icon: Shield, color: 'bg-gold/10 text-gold-deep border-gold/20' },
}

const faqCategories: FaqCategory[] = ['Booking', 'Payment', 'Cancellation', 'Account', 'Reviews']

const inputClass = 'w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors'
const labelClass = 'block text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/60 mb-2'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<FaqCategory | 'All'>('All')

  const [formSubject, setFormSubject] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formErrors, setFormErrors] = useState<{ subject?: string; message?: string }>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  function validateForm(): boolean {
    const next: typeof formErrors = {}
    if (!formSubject.trim()) next.subject = 'Subject is required'
    if (!formMessage.trim()) next.message = 'Message is required'
    else if (formMessage.trim().length < 10) next.message = 'Message must be at least 10 characters'
    setFormErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateForm()) return
    setFormStatus('submitting')
    setTimeout(() => {
      setFormStatus('success')
      setFormSubject('')
      setFormMessage('')
      setTimeout(() => setFormStatus('idle'), 5000)
    }, 1200)
  }

  return (
    <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
          Support
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-royal">
          Help & Support
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary-text max-w-lg">
          Find answers to common questions or reach out to our team
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 sm:mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
        <input
          type="text"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl border border-black/10 bg-white text-sm sm:text-base text-royal font-medium placeholder:text-charcoal/30 focus:outline-none focus:border-gold-deep/40 focus:ring-2 focus:ring-gold/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all"
        />
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
        {[
          { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our support team', detail: 'Available 9 AM - 9 PM IST', color: 'bg-emerald-50 text-emerald-700' },
          { icon: Phone, title: 'Call Us', desc: '+91 1800-123-4567', detail: 'Mon - Sat, 10 AM - 7 PM IST', color: 'bg-blue-50 text-blue-700' },
          { icon: Mail, title: 'Email', desc: 'support@funcbook.com', detail: 'Response within 24 hours', color: 'bg-amber-50 text-amber-700' },
        ].map((contact) => {
          const Icon = contact.icon
          return (
            <div
              key={contact.title}
              className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6 hover:border-gold-deep/25 hover:shadow-[0_8px_32px_rgba(184,134,11,0.08)] transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${contact.color} flex items-center justify-center mb-3`}>
                <Icon size={18} />
              </div>
              <h3 className="font-heading text-base font-bold text-royal">{contact.title}</h3>
              <p className="text-sm text-secondary-text mt-1">{contact.desc}</p>
              <p className="text-xs text-charcoal/40 mt-2">{contact.detail}</p>
            </div>
          )
        })}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
        <button
          onClick={() => setActiveCategory('All')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
            activeCategory === 'All'
              ? 'bg-royal text-white border-royal'
              : 'bg-white text-charcoal border-black/10 hover:border-gold-deep/30 hover:text-royal'
          }`}
        >
          All
        </button>
        {faqCategories.map((cat) => {
          const cfg = categoryConfig[cat]
          const Icon = cfg.icon
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                isActive
                  ? 'bg-royal text-white border-royal'
                  : `${cfg.color} hover:opacity-80`
              }`}
            >
              <Icon size={12} />
              {cat}
            </button>
          )
        })}
      </div>

      {/* FAQ + Contact Form side by side on desktop */}
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6">
        {/* FAQ Section */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] overflow-hidden">
          <div className="p-5 sm:p-8 border-b border-black/5">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-secondary-text mt-1">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'} found
            </p>
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="divide-y divide-black/5">
              {filteredFaqs.map((faq, index) => {
                const isExpanded = expandedIndex === index
                const cfg = categoryConfig[faq.category]
                const CatIcon = cfg.icon
                return (
                  <div key={index} className="px-5 sm:px-8">
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="w-full flex items-start gap-3 sm:gap-4 py-4 sm:py-5 text-left group"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CatIcon size={16} className="text-gold-deep" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-royal group-hover:text-gold-deep transition-colors pr-4">
                          {faq.question}
                        </h3>
                        <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.color}`}>
                          {faq.category}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-charcoal/30 shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pb-5 sm:pb-6 pl-11 sm:pl-13">
                        <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-8 sm:p-10 md:p-16 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/10 border border-gold/20 mb-4 sm:mb-5">
                <HelpCircle size={24} className="text-gold-deep sm:hidden" />
                <HelpCircle size={28} className="text-gold-deep hidden sm:block" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-royal">
                No results found
              </h3>
              <p className="text-secondary-text text-xs sm:text-sm mt-2 max-w-sm mx-auto">
                Try different keywords or contact our support team directly.
              </p>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div className="lg:w-96 shrink-0 bg-white rounded-2xl sm:rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal mb-2">
            Contact Us
          </h2>
          <p className="text-sm text-secondary-text mb-6">
            Send us a message and we'll get back to you shortly.
          </p>

          {formStatus === 'success' && (
            <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
              <CheckCircle2 size={16} />
              Message sent successfully! We'll reply within 24 hours.
            </div>
          )}

          {formStatus === 'error' && (
            <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-medium">
              <XCircle size={16} />
              Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Subject</label>
              <input
                type="text"
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                placeholder="e.g. Booking issue, Refund request"
                className={`${inputClass} ${formErrors.subject ? 'border-red-400' : ''}`}
              />
              {formErrors.subject && <p className="text-xs text-red-500 mt-1">{formErrors.subject}</p>}
            </div>

            <div>
              <label className={labelClass}>Message</label>
              <textarea
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Describe your issue or question in detail..."
                rows={5}
                className={`${inputClass} resize-none ${formErrors.message ? 'border-red-400' : ''}`}
              />
              {formErrors.message && <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_8px_20px_rgba(184,134,11,0.25)] hover:bg-royal hover:shadow-[0_8px_20px_rgba(17,17,17,0.25)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-400"
            >
              {formStatus === 'submitting' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Still Need Help */}
      <div className="mt-8 sm:mt-10 bg-royal rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
          Still need help?
        </h2>
        <p className="text-white/60 text-sm sm:text-base mb-5 sm:mb-6 max-w-md mx-auto">
          Our support team is here to assist you with any questions or concerns.
        </p>
        <a
          href="mailto:support@funcbook.com"
          className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_8px_20px_rgba(184,134,11,0.4)] hover:bg-gold hover:shadow-[0_8px_20px_rgba(201,162,39,0.4)] transition-all duration-400"
        >
          Contact Support
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}
