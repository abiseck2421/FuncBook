const STORAGE_KEY = 'funcbook_customer_bookings'

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled'

export interface StoredBooking {
  id: string
  serviceId: string
  serviceName: string
  category: string
  image: string
  location: string
  venue: string
  date: string
  startTime: string
  endTime: string
  guestCount: number
  eventType: string
  specialRequirements: string
  customerName: string
  phone: string
  email: string
  price: number
  status: Exclude<BookingStatus, 'completed'>
  createdAt: string
}

export type Booking = Omit<StoredBooking, 'status'> & { status: BookingStatus }

export type NewBooking = Omit<StoredBooking, 'id' | 'status' | 'createdAt'>

export function generateBookingId(): string {
  const year = new Date().getFullYear()
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let id = ''
  for (let i = 0; i < 5; i++) id += chars.charAt(Math.floor(Math.random() * chars.length))
  return `FB-${year}-${id}`
}

export function saveBooking(booking: NewBooking): StoredBooking {
  const record: StoredBooking = {
    ...booking,
    id: generateBookingId(),
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  }
  const existing = rawBookings()
  localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]))
  return record
}

export function cancelBooking(bookingId: string): void {
  const updated = rawBookings().map((b) =>
    b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

function rawBookings(): StoredBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StoredBooking[]
  } catch {
    return []
  }
}

export function getBookings(): Booking[] {
  return rawBookings()
    .map((b) => ({ ...b, status: resolveStatus(b) }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

function resolveStatus(booking: StoredBooking): BookingStatus {
  if (booking.status === 'cancelled') return 'cancelled'
  const eventDay = new Date(`${booking.date}T23:59:59`)
  return eventDay.getTime() < Date.now() ? 'completed' : 'upcoming'
}
