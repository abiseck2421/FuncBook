import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays, Search, X, Eye, CheckCircle2, XCircle,
  Clock, MapPin, Users, IndianRupee, Mail, Phone, ChevronLeft,
  ChevronRight, MoreVertical, CalendarCheck, AlertTriangle,
  Ban, FileText,
} from 'lucide-react'
import BookingDatePicker from '../../components/BookingDatePicker'
import HostModalShell from '../../components/HostModalShell'

type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
type PaymentStatus = 'paid' | 'pending' | 'refunded'

interface TimelineEntry {
  action: string
  date: string
  by: string
}

interface Booking {
  id: string
  customerName: string
  customerInitials: string
  customerEmail: string
  customerPhone: string
  serviceName: string
  eventDate: string
  eventTime: string
  bookingDate: string
  venue: string
  guestCount: number
  amount: number
  paymentStatus: PaymentStatus
  status: BookingStatus
  specialRequests: string
  timeline: TimelineEntry[]
}

const mockBookings: Booking[] = [
  {
    id: 'BK-1024',
    customerName: 'Priya Sharma',
    customerInitials: 'PS',
    customerEmail: 'priya.sharma@email.com',
    customerPhone: '+91 98765 43210',
    serviceName: 'Royal Palace Banquet Hall',
    eventDate: '2026-08-15',
    eventTime: '6:00 PM - 11:00 PM',
    bookingDate: '2026-07-20',
    venue: 'Royal Palace, MG Road, Bangalore',
    guestCount: 250,
    amount: 75000,
    paymentStatus: 'paid',
    status: 'confirmed',
    specialRequests: 'Need extra parking space for 50 vehicles. DJ setup required on the terrace.',
    timeline: [
      { action: 'Booking confirmed', date: '2026-07-21', by: 'Host' },
      { action: 'Payment received', date: '2026-07-20', by: 'System' },
      { action: 'Booking created', date: '2026-07-20', by: 'Customer' },
    ],
  },
  {
    id: 'BK-1023',
    customerName: 'Rahul Verma',
    customerInitials: 'RV',
    customerEmail: 'rahul.verma@email.com',
    customerPhone: '+91 87654 32109',
    serviceName: 'Spice Route Catering',
    eventDate: '2026-08-22',
    eventTime: '7:00 PM - 10:30 PM',
    bookingDate: '2026-07-18',
    venue: 'Grand Hyatt, Andheri West, Mumbai',
    guestCount: 150,
    amount: 127500,
    paymentStatus: 'paid',
    status: 'confirmed',
    specialRequests: 'Vegan options required for 30 guests. Jain food for 20 guests.',
    timeline: [
      { action: 'Booking confirmed', date: '2026-07-19', by: 'Host' },
      { action: 'Payment received', date: '2026-07-18', by: 'System' },
      { action: 'Booking created', date: '2026-07-18', by: 'Customer' },
    ],
  },
  {
    id: 'BK-1022',
    customerName: 'Ananya Gupta',
    customerInitials: 'AG',
    customerEmail: 'ananya.gupta@email.com',
    customerPhone: '+91 76543 21098',
    serviceName: 'Bloom & Bliss Decor',
    eventDate: '2026-07-30',
    eventTime: '10:00 AM - 2:00 PM',
    bookingDate: '2026-07-15',
    venue: 'The Leela Palace, Electronic City, Bangalore',
    guestCount: 100,
    amount: 45000,
    paymentStatus: 'pending',
    status: 'pending',
    specialRequests: 'Theme: Pastel floral. Focus on entrance and stage decoration.',
    timeline: [
      { action: 'Booking created', date: '2026-07-15', by: 'Customer' },
    ],
  },
  {
    id: 'BK-1021',
    customerName: 'Vikram Patel',
    customerInitials: 'VP',
    customerEmail: 'vikram.patel@email.com',
    customerPhone: '+91 65432 10987',
    serviceName: 'Royal Palace Banquet Hall',
    eventDate: '2026-07-25',
    eventTime: '5:00 PM - 10:00 PM',
    bookingDate: '2026-07-10',
    venue: 'Royal Palace, MG Road, Bangalore',
    guestCount: 300,
    amount: 90000,
    paymentStatus: 'paid',
    status: 'completed',
    specialRequests: 'Corporate annual dinner. AV equipment needed.',
    timeline: [
      { action: 'Booking completed', date: '2026-07-26', by: 'Host' },
      { action: 'Booking confirmed', date: '2026-07-11', by: 'Host' },
      { action: 'Payment received', date: '2026-07-10', by: 'System' },
      { action: 'Booking created', date: '2026-07-10', by: 'Customer' },
    ],
  },
  {
    id: 'BK-1020',
    customerName: 'Meera Reddy',
    customerInitials: 'MR',
    customerEmail: 'meera.reddy@email.com',
    customerPhone: '+91 54321 09876',
    serviceName: 'Spice Route Catering',
    eventDate: '2026-07-28',
    eventTime: '12:00 PM - 3:00 PM',
    bookingDate: '2026-07-12',
    venue: 'Taj Falaknuma, Hyderabad',
    guestCount: 80,
    amount: 68000,
    paymentStatus: 'refunded',
    status: 'cancelled',
    specialRequests: 'Wedding lunch buffet. Halal food mandatory.',
    timeline: [
      { action: 'Booking cancelled', date: '2026-07-14', by: 'Customer' },
      { action: 'Refund processed', date: '2026-07-15', by: 'System' },
      { action: 'Booking confirmed', date: '2026-07-13', by: 'Host' },
      { action: 'Payment received', date: '2026-07-12', by: 'System' },
      { action: 'Booking created', date: '2026-07-12', by: 'Customer' },
    ],
  },
  {
    id: 'BK-1019',
    customerName: 'Arjun Nair',
    customerInitials: 'AN',
    customerEmail: 'arjun.nair@email.com',
    customerPhone: '+91 43210 98765',
    serviceName: 'Bloom & Bliss Decor',
    eventDate: '2026-09-05',
    eventTime: '4:00 PM - 9:00 PM',
    bookingDate: '2026-07-22',
    venue: 'Kumarakom Lake Resort, Kerala',
    guestCount: 200,
    amount: 55000,
    paymentStatus: 'pending',
    status: 'pending',
    specialRequests: 'Backwater theme with tropical flowers. Fairy lights on trees.',
    timeline: [
      { action: 'Booking created', date: '2026-07-22', by: 'Customer' },
    ],
  },
  {
    id: 'BK-1018',
    customerName: 'Sneha Iyer',
    customerInitials: 'SI',
    customerEmail: 'sneha.iyer@email.com',
    customerPhone: '+91 32109 87654',
    serviceName: 'Royal Palace Banquet Hall',
    eventDate: '2026-07-20',
    eventTime: '6:00 PM - 11:30 PM',
    bookingDate: '2026-07-05',
    venue: 'Royal Palace, MG Road, Bangalore',
    guestCount: 180,
    amount: 65000,
    paymentStatus: 'paid',
    status: 'completed',
    specialRequests: 'Birthday celebration. Custom cake display area needed.',
    timeline: [
      { action: 'Booking completed', date: '2026-07-21', by: 'Host' },
      { action: 'Booking confirmed', date: '2026-07-06', by: 'Host' },
      { action: 'Payment received', date: '2026-07-05', by: 'System' },
      { action: 'Booking created', date: '2026-07-05', by: 'Customer' },
    ],
  },
  {
    id: 'BK-1017',
    customerName: 'Karthik Menon',
    customerInitials: 'KM',
    customerEmail: 'karthik.menon@email.com',
    customerPhone: '+91 21098 76543',
    serviceName: 'Spice Route Catering',
    eventDate: '2026-08-10',
    eventTime: '7:00 PM - 11:00 PM',
    bookingDate: '2026-07-19',
    venue: 'ITC Gardenia, Residency Road, Bangalore',
    guestCount: 120,
    amount: 102000,
    paymentStatus: 'paid',
    status: 'confirmed',
    specialRequests: 'South Indian traditional feast. Banana leaf service for main course.',
    timeline: [
      { action: 'Booking confirmed', date: '2026-07-20', by: 'Host' },
      { action: 'Payment received', date: '2026-07-19', by: 'System' },
      { action: 'Booking created', date: '2026-07-19', by: 'Customer' },
    ],
  },
  {
    id: 'BK-1016',
    customerName: 'Divya Joshi',
    customerInitials: 'DJ',
    customerEmail: 'divya.joshi@email.com',
    customerPhone: '+91 10987 65432',
    serviceName: 'Bloom & Bliss Decor',
    eventDate: '2026-07-18',
    eventTime: '9:00 AM - 1:00 PM',
    bookingDate: '2026-07-01',
    venue: ' JW Marriott, Juhu, Mumbai',
    guestCount: 60,
    amount: 35000,
    paymentStatus: 'paid',
    status: 'completed',
    specialRequests: 'Minimalist white and gold theme for engagement ceremony.',
    timeline: [
      { action: 'Booking completed', date: '2026-07-19', by: 'Host' },
      { action: 'Booking confirmed', date: '2026-07-02', by: 'Host' },
      { action: 'Payment received', date: '2026-07-01', by: 'System' },
      { action: 'Booking created', date: '2026-07-01', by: 'Customer' },
    ],
  },
  {
    id: 'BK-1015',
    customerName: 'Rohan Desai',
    customerInitials: 'RD',
    customerEmail: 'rohan.desai@email.com',
    customerPhone: '+91 09876 54321',
    serviceName: 'Royal Palace Banquet Hall',
    eventDate: '2026-08-01',
    eventTime: '6:30 PM - 11:00 PM',
    bookingDate: '2026-07-23',
    venue: 'Royal Palace, MG Road, Bangalore',
    guestCount: 400,
    amount: 120000,
    paymentStatus: 'pending',
    status: 'pending',
    specialRequests: 'Grand wedding reception. Multiple food counters. Live cooking stations.',
    timeline: [
      { action: 'Booking created', date: '2026-07-23', by: 'Customer' },
    ],
  },
]

const bookingStatusStyles: Record<BookingStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-sky-50 text-sky-700 border-sky-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

const paymentStatusStyles: Record<PaymentStatus, string> = {
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  refunded: 'bg-gray-100 text-gray-600 border-gray-200',
}

const ITEMS_PER_PAGE = 5

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatINR(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

/* ---------- stat card details modals ---------- */
type StatModal = 'total' | 'today' | 'upcoming' | 'completed' | 'cancelled'

function BookingRow({ b, showPayment = false }: { b: Booking; showPayment?: boolean }) {
  return (
    <div className="rounded-xl border border-gold-deep/10 bg-ivory/40 p-3.5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-royal truncate">{b.customerName}</p>
        <div className="flex items-center gap-1.5 shrink-0">
          {showPayment && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${paymentStatusStyles[b.paymentStatus]}`}>
              {b.paymentStatus.charAt(0).toUpperCase() + b.paymentStatus.slice(1)}
            </span>
          )}
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${bookingStatusStyles[b.status]}`}>
            {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary-text">
        <span className="font-semibold text-gold-deep">{b.id}</span>
        <span className="flex items-center gap-1 min-w-0">
          <FileText size={11} className="shrink-0" />
          <span className="truncate max-w-[220px]">{b.serviceName}</span>
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays size={11} className="shrink-0" />
          {formatDate(b.eventDate)} · {b.eventTime}
        </span>
        <span className="flex items-center gap-1 font-semibold text-royal">
          <IndianRupee size={11} />
          {formatINR(b.amount)}
        </span>
      </div>
    </div>
  )
}

function TotalBookingsModal({ onClose, total, confirmed, pending, completed, cancelled, revenue, recent }: {
  onClose: () => void
  total: number
  confirmed: number
  pending: number
  completed: number
  cancelled: number
  revenue: number
  recent: Booking[]
}) {
  const breakdown = [
    { label: 'Confirmed', value: confirmed, status: 'confirmed' as BookingStatus },
    { label: 'Pending', value: pending, status: 'pending' as BookingStatus },
    { label: 'Completed', value: completed, status: 'completed' as BookingStatus },
    { label: 'Cancelled', value: cancelled, status: 'cancelled' as BookingStatus },
  ]
  return (
    <HostModalShell
      icon={CalendarDays}
      iconClass="bg-gold/10 text-gold-deep"
      title="Total Booking Details"
      subtitle="Overview of every booking across your services."
      onClose={onClose}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold-deep/15 bg-gold/5 px-4 py-3.5 mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text">Total Bookings</p>
          <p className="text-xs text-secondary-text mt-0.5 flex items-center gap-1">
            <IndianRupee size={12} className="text-gold-deep" />
            <span className="font-semibold text-royal">{formatINR(revenue)}</span>
            <span>booking value</span>
          </p>
        </div>
        <p className="font-heading text-2xl sm:text-3xl font-bold text-royal">{total}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {breakdown.map((b) => (
          <div key={b.label} className="rounded-2xl border border-gold-deep/15 p-3.5">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border mb-2.5 ${bookingStatusStyles[b.status]}`}>
              {b.label}
            </span>
            <p className="font-heading text-xl font-bold text-royal">{b.value}</p>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Recent Bookings</p>
      <div className="max-h-[280px] overflow-y-auto custom-scrollbar space-y-2.5 pr-1">
        {recent.map((b) => <BookingRow key={b.id} b={b} />)}
      </div>
    </HostModalShell>
  )
}

function TodayBookingsModal({ onClose, items }: { onClose: () => void; items: Booking[] }) {
  return (
    <HostModalShell
      icon={CalendarCheck}
      iconClass="bg-emerald-50 text-emerald-600"
      title="Today's Booking Details"
      subtitle="Everything scheduled for today, at a glance."
      onClose={onClose}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-3.5 mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text">Today's Bookings</p>
          <p className="text-xs text-secondary-text mt-0.5">Events scheduled for today</p>
        </div>
        <p className="font-heading text-2xl sm:text-3xl font-bold text-royal">{items.length}</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-gold-deep/15 bg-ivory/40 p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-3">
            <CalendarCheck size={20} className="text-gold-deep" />
          </div>
          <p className="text-sm font-semibold text-royal">No bookings today</p>
          <p className="text-xs text-secondary-text mt-1">You're all clear. New bookings will appear here.</p>
        </div>
      ) : (
        <div className="max-h-[380px] overflow-y-auto custom-scrollbar space-y-2.5 pr-1">
          {items.map((b) => <BookingRow key={b.id} b={b} showPayment />)}
        </div>
      )}
    </HostModalShell>
  )
}

function UpcomingBookingsModal({ onClose, items, next }: { onClose: () => void; items: Booking[]; next: Booking | null }) {
  return (
    <HostModalShell
      icon={Clock}
      iconClass="bg-sky-50 text-sky-600"
      title="Upcoming Booking Details"
      subtitle="All bookings that are pending confirmation or confirmed ahead."
      onClose={onClose}
      tall
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-sky-50/50 px-4 py-3.5 mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text">Upcoming Bookings</p>
          <p className="text-xs text-secondary-text mt-0.5">Pending & confirmed events</p>
        </div>
        <p className="font-heading text-2xl sm:text-3xl font-bold text-royal">{items.length}</p>
      </div>

      {next && (
        <div className="rounded-2xl border border-gold-deep/15 bg-gold/5 p-4 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Next Upcoming Event</p>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-royal truncate">{next.customerName}</p>
              <p className="text-xs text-secondary-text mt-0.5 truncate">{next.serviceName}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${bookingStatusStyles[next.status]}`}>
              {next.status.charAt(0).toUpperCase() + next.status.slice(1)}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
            <div className="rounded-lg bg-white/70 border border-gold-deep/10 px-3 py-2">
              <p className="text-[10px] text-secondary-text uppercase tracking-wider">Event Date</p>
              <p className="text-sm font-semibold text-royal mt-0.5">{formatDate(next.eventDate)}</p>
            </div>
            <div className="rounded-lg bg-white/70 border border-gold-deep/10 px-3 py-2">
              <p className="text-[10px] text-secondary-text uppercase tracking-wider">Event Time</p>
              <p className="text-sm font-semibold text-royal mt-0.5">{next.eventTime}</p>
            </div>
            <div className="rounded-lg bg-white/70 border border-gold-deep/10 px-3 py-2">
              <p className="text-[10px] text-secondary-text uppercase tracking-wider">Amount</p>
              <p className="text-sm font-semibold text-royal mt-0.5">{formatINR(next.amount)}</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">All Upcoming Bookings</p>
      <div className="max-h-[300px] overflow-y-auto custom-scrollbar space-y-2.5 pr-1">
        {items.map((b) => <BookingRow key={b.id} b={b} />)}
      </div>
    </HostModalShell>
  )
}

function CompletedBookingsModal({ onClose, count, revenue, latest, items }: {
  onClose: () => void
  count: number
  revenue: number
  latest: Booking | null
  items: Booking[]
}) {
  return (
    <HostModalShell
      icon={CheckCircle2}
      iconClass="bg-emerald-50 text-emerald-600"
      title="Completed Booking Details"
      subtitle="Bookings that have been fulfilled and their earnings."
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-1">Completed</p>
          <p className="font-heading text-xl font-bold text-royal">{count}</p>
        </div>
        <div className="rounded-2xl border border-gold-deep/15 bg-gold/5 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-1">Completed Revenue</p>
          <p className="font-heading text-xl font-bold text-royal">{formatINR(revenue)}</p>
        </div>
      </div>

      {latest && (
        <div className="rounded-2xl border border-gold-deep/15 bg-ivory/40 p-4 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Latest Completed Booking</p>
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-royal truncate">{latest.customerName}</p>
              <p className="text-xs text-secondary-text mt-0.5 truncate">{latest.serviceName}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${paymentStatusStyles[latest.paymentStatus]}`}>
              {latest.paymentStatus.charAt(0).toUpperCase() + latest.paymentStatus.slice(1)}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="rounded-lg bg-white/70 border border-gold-deep/10 px-3 py-2">
              <p className="text-[10px] text-secondary-text uppercase tracking-wider">Event Date</p>
              <p className="text-sm font-semibold text-royal mt-0.5">{formatDate(latest.eventDate)}</p>
            </div>
            <div className="rounded-lg bg-white/70 border border-gold-deep/10 px-3 py-2">
              <p className="text-[10px] text-secondary-text uppercase tracking-wider">Event Time</p>
              <p className="text-sm font-semibold text-royal mt-0.5">{latest.eventTime}</p>
            </div>
            <div className="rounded-lg bg-white/70 border border-gold-deep/10 px-3 py-2">
              <p className="text-[10px] text-secondary-text uppercase tracking-wider">Amount</p>
              <p className="text-sm font-semibold text-royal mt-0.5">{formatINR(latest.amount)}</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text mb-3">Completed Bookings</p>
      <div className="max-h-[240px] overflow-y-auto custom-scrollbar space-y-2.5 pr-1">
        {items.map((b) => <BookingRow key={b.id} b={b} showPayment />)}
      </div>
    </HostModalShell>
  )
}

function CancelledBookingsModal({ onClose, items }: { onClose: () => void; items: Booking[] }) {
  return (
    <HostModalShell
      icon={XCircle}
      iconClass="bg-red-50 text-red-500"
      title="Cancelled Booking Details"
      subtitle="Bookings that were cancelled and their refund status."
      onClose={onClose}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50/50 px-4 py-3.5 mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-text">Cancelled Bookings</p>
          <p className="text-xs text-secondary-text mt-0.5">Total cancellations</p>
        </div>
        <p className="font-heading text-2xl sm:text-3xl font-bold text-royal">{items.length}</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-gold-deep/15 bg-ivory/40 p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-3">
            <CheckCircle2 size={20} className="text-emerald-600" />
          </div>
          <p className="text-sm font-semibold text-royal">No cancelled bookings</p>
          <p className="text-xs text-secondary-text mt-1">Cancelled bookings will appear here.</p>
        </div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar space-y-2.5 pr-1">
          {items.map((b) => {
            const cancelEntry = b.timeline.find((t) => t.action.toLowerCase().includes('cancel'))
            return (
              <div key={b.id} className="rounded-xl border border-gold-deep/10 bg-ivory/40 p-3.5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-royal truncate">{b.customerName}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${paymentStatusStyles[b.paymentStatus]}`}>
                    {b.paymentStatus.charAt(0).toUpperCase() + b.paymentStatus.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary-text">
                  <span className="font-semibold text-gold-deep">{b.id}</span>
                  <span className="flex items-center gap-1 min-w-0">
                    <FileText size={11} className="shrink-0" />
                    <span className="truncate max-w-[220px]">{b.serviceName}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={11} className="shrink-0" />
                    {formatDate(b.eventDate)}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-royal">
                    <IndianRupee size={11} />
                    {formatINR(b.amount)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-gold-deep/10 text-xs text-red-600">
                  <AlertTriangle size={12} className="shrink-0" />
                  {cancelEntry
                    ? `Cancelled by ${cancelEntry.by} · ${formatDate(cancelEntry.date)}`
                    : 'Cancelled'}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </HostModalShell>
  )
}

export default function HostBookingsPage() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
  const [dateFilter, setDateFilter] = useState('')
  const [page, setPage] = useState(1)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [statModal, setStatModal] = useState<StatModal | null>(null)
  const [confirmModal, setConfirmModal] = useState<{ type: 'confirm' | 'complete' | 'cancel'; booking: Booking } | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBookings(mockBookings)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch = search === '' ||
        b.customerName.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase()) ||
        b.serviceName.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'all' || b.status === statusFilter
      const matchDate = dateFilter === '' || b.eventDate === dateFilter
      return matchSearch && matchStatus && matchDate
    })
  }, [bookings, search, statusFilter, dateFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return {
      total: bookings.length,
      today: bookings.filter((b) => b.eventDate === today).length,
      upcoming: bookings.filter((b) => b.status === 'pending' || b.status === 'confirmed').length,
      completed: bookings.filter((b) => b.status === 'completed').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    }
  }, [bookings])

  const detailStats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0]
    const confirmed = bookings.filter((b) => b.status === 'confirmed')
    const pending = bookings.filter((b) => b.status === 'pending')
    const completed = bookings.filter((b) => b.status === 'completed')
    const cancelled = bookings.filter((b) => b.status === 'cancelled')
    const upcoming = [...confirmed, ...pending].sort((a, b) => a.eventDate.localeCompare(b.eventDate))
    return {
      confirmed,
      pending,
      completed,
      cancelled,
      upcoming,
      todayBookings: bookings
        .filter((b) => b.eventDate === todayStr)
        .sort((a, b) => b.bookingDate.localeCompare(a.bookingDate)),
      totalRevenue: bookings
        .filter((b) => b.status !== 'cancelled')
        .reduce((s, b) => s + b.amount, 0),
      completedRevenue: completed.reduce((s, b) => s + b.amount, 0),
      recentBookings: [...bookings]
        .sort((a, b) => b.bookingDate.localeCompare(a.bookingDate))
        .slice(0, 5),
      nextUpcoming: upcoming[0] ?? null,
      latestCompleted: [...completed].sort((a, b) => b.eventDate.localeCompare(a.eventDate))[0] ?? null,
    }
  }, [bookings])

  const handleAction = (type: 'confirm' | 'complete' | 'cancel', booking: Booking) => {
    setMenuOpen(null)
    setConfirmModal({ type, booking })
  }

  const executeAction = () => {
    if (!confirmModal) return
    const { type, booking } = confirmModal
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== booking.id) return b
        if (type === 'confirm') return { ...b, status: 'confirmed' as BookingStatus }
        if (type === 'complete') return { ...b, status: 'completed' as BookingStatus }
        return { ...b, status: 'cancelled' as BookingStatus, paymentStatus: 'refunded' as PaymentStatus }
      })
    )
    const messages = {
      confirm: 'Booking confirmed successfully.',
      complete: 'Booking marked as completed.',
      cancel: 'Booking has been cancelled.',
    }
    setToast({ message: messages[type], type: 'success' })
    setConfirmModal(null)
    setSelectedBooking((prev) => {
      if (!prev || prev.id !== booking.id) return prev
      if (type === 'confirm') return { ...prev, status: 'confirmed' }
      if (type === 'complete') return { ...prev, status: 'completed' }
      return { ...prev, status: 'cancelled', paymentStatus: 'refunded' }
    })
  }

  const resetFilters = () => {
    setSearch('')
    setStatusFilter('all')
    setDateFilter('')
    setPage(1)
  }

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  if (loading) {
    return (
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
        <div className="mb-8">
          <div className="h-4 w-24 rounded-full bg-gold/15 mb-3" />
          <div className="h-10 w-64 rounded-2xl bg-charcoal/5 mb-3" />
          <div className="h-4 w-80 rounded-full bg-charcoal/5" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gold-deep/10 p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-charcoal/5" />
                <div className="h-3 w-20 rounded-full bg-charcoal/5" />
              </div>
              <div className="h-8 w-12 rounded-full bg-charcoal/5" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-3xl border border-gold-deep/10 p-6 animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
              <div className="w-10 h-10 rounded-full bg-charcoal/5" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded-full bg-charcoal/5" />
                <div className="h-3 w-1/2 rounded-full bg-charcoal/5" />
              </div>
              <div className="h-6 w-16 rounded-full bg-charcoal/5" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const statCards = [
    { label: 'Total Bookings', value: stats.total, icon: CalendarDays, color: 'text-gold-deep', bg: 'bg-gold/10', modal: 'total' as const },
    { label: "Today's Bookings", value: stats.today, icon: CalendarCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', modal: 'today' as const },
    { label: 'Upcoming', value: stats.upcoming, icon: Clock, color: 'text-sky-600', bg: 'bg-sky-50', modal: 'upcoming' as const },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50', modal: 'completed' as const },
    { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', modal: 'cancelled' as const },
  ]

  return (
    <div className="min-h-screen bg-ivory pb-12">
      {/* Header */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-2 sm:mb-3">
              Manage
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-royal leading-[1.08] tracking-tight">
              Bookings
            </h1>
            <p className="mt-2 text-secondary-text text-base sm:text-lg">
              Manage all customer bookings for your services.
            </p>
          </div>
          <p className="text-sm text-secondary-text shrink-0">{today}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                role="button"
                tabIndex={0}
                onClick={() => setStatModal(stat.modal)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setStatModal(stat.modal)
                  }
                }}
                aria-label={`View ${stat.label} details`}
                className="group bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 sm:p-6 cursor-pointer hover:shadow-[0_8px_28px_rgba(184,134,11,0.12)] hover:-translate-y-0.5 hover:border-gold-deep/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                    <Icon size={18} className={stat.color} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">{stat.label}</span>
                </div>
                <span className="font-heading text-2xl sm:text-3xl font-bold text-royal">{stat.value}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Filters */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            {/* Search */}
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-2">
                Search
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Customer name, booking ID, or service..."
                  className="w-full rounded-xl border border-gold-deep/15 bg-ivory/50 pl-10 pr-4 py-2.5 text-sm text-royal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-44">
              <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value as BookingStatus | 'all'); setPage(1) }}
                className="w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="w-full lg:w-52">
              <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-2">
                Event Date
              </label>
              <BookingDatePicker
                value={dateFilter}
                onChange={(date) => { setDateFilter(date); setPage(1) }}
                placeholder="Select date"
              />
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-charcoal/60 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300 shrink-0"
            >
              <X size={14} />
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 mt-8">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <CalendarDays size={32} className="text-gold-deep" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-royal">
              No bookings yet.
            </h3>
            <p className="mt-3 text-secondary-text text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Bookings for your services will appear here once customers start booking.
            </p>
            <Link
              to="/host/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-500 mt-8"
            >
              Go to My Services
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] overflow-hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full">
                  <thead className="bg-white">
                    <tr className="border-b border-black/5">
                      <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-5 py-3.5 w-[90px] whitespace-nowrap">Booking</th>
                      <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-5 py-3.5">Customer</th>
                      <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-5 py-3.5">Service</th>
                      <th className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-5 py-3.5 whitespace-nowrap">Event Date</th>
                      <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-5 py-3.5 w-[100px] whitespace-nowrap">Amount</th>
                      <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-5 py-3.5 w-[100px] whitespace-nowrap">Payment</th>
                      <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-5 py-3.5 w-[100px] whitespace-nowrap">Status</th>
                      <th className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text px-5 py-3.5 w-[110px] whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-black/5 last:border-0 hover:bg-ivory/30 transition-colors"
                      >
                        <td className="px-5 py-3.5 align-middle whitespace-nowrap">
                          <span className="text-sm font-semibold text-royal">{booking.id}</span>
                        </td>
                        <td className="px-5 py-3.5 align-middle">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-gold-deep">{booking.customerInitials}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-royal truncate" title={booking.customerName}>{booking.customerName}</p>
                              <p className="text-xs text-secondary-text truncate" title={booking.customerEmail}>{booking.customerEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 align-middle">
                          <span className="text-sm text-charcoal truncate block max-w-[180px]" title={booking.serviceName}>{booking.serviceName}</span>
                        </td>
                        <td className="px-5 py-3.5 align-middle whitespace-nowrap">
                          <div className="text-sm text-charcoal">{formatDate(booking.eventDate)}</div>
                          <div className="text-xs text-secondary-text">{booking.eventTime}</div>
                        </td>
                        <td className="px-5 py-3.5 align-middle text-right whitespace-nowrap">
                          <span className="text-sm font-semibold text-royal">₹{booking.amount.toLocaleString('en-IN')}</span>
                        </td>
                        <td className="px-5 py-3.5 align-middle text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${paymentStatusStyles[booking.paymentStatus]}`}>
                            {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 align-middle text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${bookingStatusStyles[booking.status]}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 align-middle text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedBooking(booking)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300"
                            >
                              <Eye size={11} />
                              View
                            </button>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setMenuOpen(menuOpen === booking.id ? null : booking.id)}
                                className="p-1.5 rounded-lg text-charcoal/40 hover:text-royal hover:bg-ivory transition-colors"
                              >
                                <MoreVertical size={14} />
                              </button>
                              {menuOpen === booking.id && (
                                <div className="absolute right-0 mt-1 w-44 rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 py-1.5 z-20 animate-slide-in">
                                  {booking.status === 'pending' && (
                                    <button
                                      type="button"
                                      onClick={() => handleAction('confirm', booking)}
                                      className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-charcoal hover:bg-ivory/70 transition-colors"
                                    >
                                      <CheckCircle2 size={12} className="text-emerald-500" />
                                      Confirm Booking
                                    </button>
                                  )}
                                  {booking.status === 'confirmed' && (
                                    <button
                                      type="button"
                                      onClick={() => handleAction('complete', booking)}
                                      className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-charcoal hover:bg-ivory/70 transition-colors"
                                    >
                                      <CheckCircle2 size={12} className="text-emerald-500" />
                                      Mark Completed
                                    </button>
                                  )}
                                  {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                    <button
                                      type="button"
                                      onClick={() => handleAction('cancel', booking)}
                                      className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-red-600 hover:bg-red-50/60 transition-colors"
                                    >
                                      <Ban size={12} />
                                      Cancel Booking
                                    </button>
                                  )}
                                  <a
                                    href={`mailto:${booking.customerEmail}`}
                                    className="flex items-center gap-2 px-3.5 py-2 text-xs text-charcoal hover:bg-ivory/70 transition-colors"
                                  >
                                    <Mail size={12} className="text-secondary-text" />
                                    Contact Customer
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden space-y-4">
              {paginated.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-gold-deep/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-gold-deep">{booking.customerInitials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-royal">{booking.customerName}</p>
                        <p className="text-xs text-secondary-text">{booking.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${bookingStatusStyles[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center gap-2 text-sm text-charcoal">
                      <FileText size={14} className="text-secondary-text shrink-0" />
                      <span className="truncate">{booking.serviceName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal">
                      <CalendarDays size={14} className="text-secondary-text shrink-0" />
                      <span>{formatDate(booking.eventDate)} · {booking.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal">
                      <MapPin size={14} className="text-secondary-text shrink-0" />
                      <span className="truncate">{booking.venue}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-charcoal">
                        <Users size={14} className="text-secondary-text" />
                        {booking.guestCount} guests
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold text-royal">
                        <IndianRupee size={14} className="text-secondary-text" />
                        ₹{booking.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-black/5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${paymentStatusStyles[booking.paymentStatus]}`}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBooking(booking)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-300"
                      >
                        <Eye size={12} />
                        Details
                      </button>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setMenuOpen(menuOpen === booking.id ? null : booking.id)}
                          className="p-1.5 rounded-lg text-charcoal/40 hover:text-royal hover:bg-ivory transition-colors"
                        >
                          <MoreVertical size={14} />
                        </button>
                        {menuOpen === booking.id && (
                          <div className="absolute right-0 bottom-full mb-1 w-44 rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 py-1.5 z-20 animate-slide-in">
                            {booking.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => handleAction('confirm', booking)}
                                className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-charcoal hover:bg-ivory/70 transition-colors"
                              >
                                <CheckCircle2 size={12} className="text-emerald-500" />
                                Confirm Booking
                              </button>
                            )}
                            {booking.status === 'confirmed' && (
                              <button
                                type="button"
                                onClick={() => handleAction('complete', booking)}
                                className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-charcoal hover:bg-ivory/70 transition-colors"
                              >
                                <CheckCircle2 size={12} className="text-emerald-500" />
                                Mark Completed
                              </button>
                            )}
                            {(booking.status === 'pending' || booking.status === 'confirmed') && (
                              <button
                                type="button"
                                onClick={() => handleAction('cancel', booking)}
                                className="flex w-full items-center gap-2 px-3.5 py-2 text-xs text-red-600 hover:bg-red-50/60 transition-colors"
                              >
                                <Ban size={12} />
                                Cancel Booking
                              </button>
                            )}
                            <a
                              href={`mailto:${booking.customerEmail}`}
                              className="flex items-center gap-2 px-3.5 py-2 text-xs text-charcoal hover:bg-ivory/70 transition-colors"
                            >
                              <Mail size={12} className="text-secondary-text" />
                              Contact Customer
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-secondary-text">
                  Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} bookings
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-xl text-charcoal/40 hover:text-royal hover:bg-ivory disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        page === p
                          ? 'bg-gold-deep text-white shadow-[0_2px_8px_rgba(184,134,11,0.3)]'
                          : 'text-charcoal hover:bg-ivory'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-xl text-charcoal/40 hover:text-royal hover:bg-ivory disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
            onClick={() => setSelectedBooking(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.15)] w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-slide-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-black/5 px-6 sm:px-8 py-5 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal">Booking Details</h3>
                  <p className="text-sm text-secondary-text mt-0.5">{selectedBooking.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${bookingStatusStyles[selectedBooking.status]}`}>
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedBooking(null)}
                    className="p-2 rounded-xl text-charcoal/40 hover:text-royal hover:bg-ivory transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-3">Customer Information</h4>
                <div className="bg-ivory/50 rounded-2xl p-4 border border-gold-deep/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-gold-deep">{selectedBooking.customerInitials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-royal">{selectedBooking.customerName}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1.5 text-xs text-secondary-text">
                          <Mail size={12} />
                          {selectedBooking.customerEmail}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-secondary-text">
                          <Phone size={12} />
                          {selectedBooking.customerPhone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service & Event Details */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-3">Service & Event Details</h4>
                <div className="bg-ivory/50 rounded-2xl p-4 border border-gold-deep/10 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <FileText size={14} className="text-gold-deep shrink-0" />
                    <span className="text-charcoal font-medium">{selectedBooking.serviceName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CalendarDays size={14} className="text-gold-deep shrink-0" />
                    <span className="text-charcoal">{formatDate(selectedBooking.eventDate)} · {selectedBooking.eventTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={14} className="text-gold-deep shrink-0" />
                    <span className="text-charcoal">{selectedBooking.venue}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users size={14} className="text-gold-deep shrink-0" />
                    <span className="text-charcoal">{selectedBooking.guestCount} guests</span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-3">Special Requests</h4>
                  <div className="bg-ivory/50 rounded-2xl p-4 border border-gold-deep/10">
                    <p className="text-sm text-charcoal leading-relaxed">{selectedBooking.specialRequests}</p>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-3">Payment Information</h4>
                <div className="bg-ivory/50 rounded-2xl p-4 border border-gold-deep/10 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-heading font-bold text-royal">₹{selectedBooking.amount.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-secondary-text mt-0.5">Booking amount</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${paymentStatusStyles[selectedBooking.paymentStatus]}`}>
                    {selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>

              {/* Booking Timeline */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary-text mb-3">Booking Timeline</h4>
                <div className="space-y-0">
                  {selectedBooking.timeline.map((entry, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${i === 0 ? 'bg-gold-deep' : 'bg-charcoal/20'}`} />
                        {i < selectedBooking.timeline.length - 1 && (
                          <div className="w-px flex-1 bg-black/10 my-1" />
                        )}
                      </div>
                      <div className="pb-5">
                        <p className="text-sm font-medium text-royal">{entry.action}</p>
                        <p className="text-xs text-secondary-text mt-0.5">{formatDate(entry.date)} · {entry.by}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-black/5">
                {selectedBooking.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => { handleAction('confirm', selectedBooking) }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-deep text-white font-semibold text-sm hover:bg-royal transition-colors duration-300"
                  >
                    <CheckCircle2 size={16} />
                    Confirm Booking
                  </button>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    type="button"
                    onClick={() => { handleAction('complete', selectedBooking) }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors duration-300"
                  >
                    <CheckCircle2 size={16} />
                    Mark Completed
                  </button>
                )}
                {(selectedBooking.status === 'pending' || selectedBooking.status === 'confirmed') && (
                  <button
                    type="button"
                    onClick={() => { handleAction('cancel', selectedBooking) }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-white border-2 border-red-300 hover:bg-red-50 hover:border-red-400 transition-colors duration-300"
                  >
                    <Ban size={16} />
                    Cancel Booking
                  </button>
                )}
                <a
                  href={`mailto:${selectedBooking.customerEmail}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-charcoal/60 border border-black/10 hover:border-gold-deep/30 hover:text-royal hover:bg-gold/5 transition-all duration-300"
                >
                  <Mail size={16} />
                  Contact Customer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stat Card Detail Modals */}
      {statModal === 'total' && (
        <TotalBookingsModal
          onClose={() => setStatModal(null)}
          total={stats.total}
          confirmed={detailStats.confirmed.length}
          pending={detailStats.pending.length}
          completed={detailStats.completed.length}
          cancelled={detailStats.cancelled.length}
          revenue={detailStats.totalRevenue}
          recent={detailStats.recentBookings}
        />
      )}
      {statModal === 'today' && (
        <TodayBookingsModal onClose={() => setStatModal(null)} items={detailStats.todayBookings} />
      )}
      {statModal === 'upcoming' && (
        <UpcomingBookingsModal
          onClose={() => setStatModal(null)}
          items={detailStats.upcoming}
          next={detailStats.nextUpcoming}
        />
      )}
      {statModal === 'completed' && (
        <CompletedBookingsModal
          onClose={() => setStatModal(null)}
          count={detailStats.completed.length}
          revenue={detailStats.completedRevenue}
          latest={detailStats.latestCompleted}
          items={detailStats.completed}
        />
      )}
      {statModal === 'cancelled' && (
        <CancelledBookingsModal onClose={() => setStatModal(null)} items={detailStats.cancelled} />
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
            onClick={() => setConfirmModal(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.15)] p-6 sm:p-8 max-w-md w-full animate-slide-in">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full border mb-5 ${
              confirmModal.type === 'cancel'
                ? 'bg-red-50 border-red-200/60'
                : 'bg-emerald-50 border-emerald-200/60'
            }`}>
              {confirmModal.type === 'cancel' ? (
                <Ban size={24} className="text-red-500" />
              ) : (
                <CheckCircle2 size={24} className="text-emerald-600" />
              )}
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal">
              {confirmModal.type === 'confirm' && 'Confirm Booking?'}
              {confirmModal.type === 'complete' && 'Mark as Completed?'}
              {confirmModal.type === 'cancel' && 'Cancel Booking?'}
            </h3>
            <p className="mt-2 text-sm text-secondary-text leading-relaxed">
              {confirmModal.type === 'confirm' && `Are you sure you want to confirm the booking ${confirmModal.booking.id} for ${confirmModal.booking.customerName}?`}
              {confirmModal.type === 'complete' && `Are you sure you want to mark booking ${confirmModal.booking.id} as completed? This action indicates the event has finished.`}
              {confirmModal.type === 'cancel' && `Are you sure you want to cancel booking ${confirmModal.booking.id}? The customer will be notified and a refund will be processed.`}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="flex-1 px-5 py-3 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-300"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={executeAction}
                className={`flex-1 px-5 py-3 rounded-2xl font-semibold text-sm text-white transition-colors duration-300 ${
                  confirmModal.type === 'cancel'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gold-deep hover:bg-royal'
                }`}
              >
                {confirmModal.type === 'confirm' && 'Confirm'}
                {confirmModal.type === 'complete' && 'Mark Completed'}
                {confirmModal.type === 'cancel' && 'Cancel Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-[100] animate-slide-in">
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium shadow-lg ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-red-50 border-red-200 text-red-600'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            {toast.message}
          </div>
        </div>
      )}
    </div>
  )
}
