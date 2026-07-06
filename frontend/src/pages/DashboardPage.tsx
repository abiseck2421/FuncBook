import { Bell, CalendarDays, ChevronRight, Eye, Menu, Pencil, Star, Users } from 'lucide-react'

type ServiceRow = {
  title: string
  subtitle: string
  rating: string
  views: string
  queue: string
  completed: string
  cancelled: string
  price: string
}

const serviceRows: ServiceRow[] = [
  {
    title: 'On-Demand Services for Busy Lifestyles',
    subtitle: 'Premium event support and vendor coordination',
    rating: '4.7 (475)',
    views: '75,030',
    queue: '17',
    completed: '1,554',
    cancelled: '105',
    price: '$70.00',
  },
  {
    title: 'On-Demand Services for Every Need',
    subtitle: 'Flexible planning for homes, weddings, and venues',
    rating: '4.7 (475)',
    views: '75,030',
    queue: '34',
    completed: '2,670',
    cancelled: '207',
    price: '$70.00',
  },
  {
    title: 'Sparkle Ease Cleaning Solutions',
    subtitle: 'Trusted support before and after every event',
    rating: '4.7 (475)',
    views: '75,030',
    queue: '45',
    completed: '1,960',
    cancelled: '132',
    price: '$70.00',
  },
  {
    title: 'Celebrating Successes in Service',
    subtitle: 'Premium helpers for smooth execution',
    rating: '4.7 (475)',
    views: '75,030',
    queue: '27',
    completed: '1,645',
    cancelled: '124',
    price: '$70.00',
  },
]

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const calendarDays = [
  '28', '29', '30', '31', '1', '2', '3',
  '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17',
  '18', '19', '20', '21', '22', '23', '24',
  '25', '26', '27', '28', '29', '30', '31',
  '1', '2', '3', '4', '5', '6', '7',
]

const dashboardNavItems = [
  { label: 'Dashboard', active: true },
  { label: 'Services', active: false },
  { label: 'Payout History', active: false },
  { label: 'Wishlist', active: false },
  { label: 'Review', active: false },
]

function StatChip({ label, value, tone }: { label: string; value: string; tone: 'blue' | 'gold' | 'rose' }) {
  const toneClasses = {
    blue: 'bg-[#EAF2FF] text-[#2563EB]',
    gold: 'bg-[#FFF4D9] text-gold-deep',
    rose: 'bg-[#FDECEC] text-[#EF4444]',
  }

  return (
    <div className={`rounded-2xl px-4 py-3 ${toneClasses[tone]} shadow-[0_8px_18px_rgba(17,17,17,0.04)]`}>
      <div className="text-xl font-bold leading-none">{value}</div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] opacity-80">{label}</div>
    </div>
  )
}

function ServiceCard({ service }: { service: ServiceRow }) {
  return (
    <article className="grid gap-4 rounded-[28px] bg-white p-3 shadow-[0_14px_40px_rgba(17,17,17,0.06)] ring-1 ring-black/5 lg:grid-cols-[168px_1fr_220px] lg:items-stretch">
      <div className="overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,rgba(185,134,11,0.18),rgba(255,255,255,0.65))]">
        <div className="flex h-full min-h-[164px] items-end justify-start bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),rgba(255,255,255,0.25))] p-4">
          <div className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-royal shadow-sm ring-1 ring-black/5">
            Featured
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between py-1 lg:py-2">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-secondary-text">
            <span className="inline-flex items-center gap-1 text-gold-deep">
              <Star size={14} className="fill-gold-deep text-gold-deep" />
              {service.rating}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye size={14} />
              {service.views}
            </span>
          </div>
          <h3 className="mt-3 max-w-2xl text-[1.1rem] font-semibold tracking-tight text-royal sm:text-[1.35rem]">
            {service.title}
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-6 text-secondary-text">{service.subtitle}</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 sm:max-w-[460px]">
          <StatChip label="In Queue" value={service.queue} tone="blue" />
          <StatChip label="Completed" value={service.completed} tone="gold" />
          <StatChip label="Cancelled" value={service.cancelled} tone="rose" />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-[22px] bg-ivory/70 px-5 py-5 ring-1 ring-black/5">
        <div className="text-right">
          <p className="text-sm font-semibold text-charcoal">Starting From:</p>
          <p className="mt-1 text-2xl font-bold text-gold-deep">{service.price}</p>
          <p className="mt-3 text-sm font-medium text-charcoal">On/Off Service:</p>
          <div className="mt-2 inline-flex h-8 w-14 items-center rounded-full bg-white p-1 shadow-inner ring-1 ring-black/10">
            <span className="h-6 w-6 rounded-full bg-[#D1D5DB]" />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2FF] text-[#2563EB] transition hover:scale-105">
            <Pencil size={16} />
          </button>
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0E8] text-[#F97316] transition hover:scale-105">
            <Menu size={16} />
          </button>
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4D9] text-gold-deep transition hover:scale-105">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-ivory text-royal">
      <header className="fixed top-0 left-0 right-0 z-50 bg-ivory shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
        <div className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6">
          <div className="flex min-h-[72px] items-center justify-between gap-4 py-4 sm:py-4">
            <span className="font-heading text-[26px] font-bold tracking-tight text-royal shrink-0">
              Func<span className="text-gold">Book</span>
            </span>

            <nav className="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-10">
              {dashboardNavItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                    item.active
                      ? 'text-royal bg-white/80 shadow-[0_4px_18px_rgba(0,0,0,0.06)]'
                      : 'text-charcoal hover:text-royal hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-white text-secondary-text ring-1 ring-black/5 transition hover:text-royal">
                <Bell size={18} />
              </button>
              <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 ring-1 ring-black/5">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gold-deep text-sm font-bold text-white">AK</div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-royal">Akhil</p>
                  <p className="text-xs text-secondary-text">Premium organizer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden pb-1">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-charcoal">
              {dashboardNavItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`rounded-full px-3 py-2 transition-colors ${item.active ? 'bg-royal text-white' : 'bg-transparent hover:text-royal'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[min(95%,1400px)] gap-4 px-4 pt-18 sm:px-6 sm:pt-24 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-[30px] bg-[#F9F7F1] p-4 sm:p-5 lg:p-6">
            <div className="rounded-[26px] bg-white p-4 shadow-[0_12px_30px_rgba(17,17,17,0.05)] ring-1 ring-black/5 sm:p-5">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
                <div className="grid gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="inline-flex items-center gap-2 text-sm font-medium text-secondary-text">
                        <Star size={14} className="fill-gold-deep text-gold-deep" />
                        4.7 (475)
                      </p>
                      <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-secondary-text">
                        <Users size={14} />
                        75,030 views this month
                      </p>
                    </div>

                    <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#EAF2FF] px-4 py-2 text-sm font-semibold text-[#2563EB] transition hover:brightness-95">
                      <Pencil size={14} />
                      Edit dashboard
                    </button>
                  </div>

                  <div>
                    <h2 className="font-heading text-3xl font-bold text-royal sm:text-4xl">On-Demand Services for Busy Lifestyles</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-secondary-text sm:text-base">
                      A refined workspace for tracking vendor activity, managing service availability, and reviewing performance from one place.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <StatChip label="In Queue" value="17" tone="blue" />
                    <StatChip label="Completed" value="1,554" tone="gold" />
                    <StatChip label="Cancelled" value="105" tone="rose" />
                  </div>
                </div>

                <aside className="rounded-[24px] bg-ivory/80 p-4 ring-1 ring-black/5">
                  <p className="text-sm font-semibold text-charcoal">Starting From:</p>
                  <p className="mt-1 text-3xl font-bold text-gold-deep">$70.00</p>
                  <p className="mt-3 text-sm font-medium text-charcoal">On/Off Service:</p>
                  <div className="mt-2 inline-flex h-9 w-16 items-center rounded-full bg-white p-1 shadow-inner ring-1 ring-black/10">
                    <span className="h-7 w-7 rounded-full bg-gold-deep" />
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-[#EAF2FF] text-[#2563EB] transition hover:scale-105">
                      <Pencil size={16} />
                    </button>
                    <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-[#FFF0E8] text-[#F97316] transition hover:scale-105">
                      <Menu size={16} />
                    </button>
                    <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-[#FFF4D9] text-gold-deep transition hover:scale-105">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </aside>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {serviceRows.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </section>

          <aside className="grid gap-4">
            <section className="rounded-[30px] bg-white p-4 shadow-[0_12px_30px_rgba(17,17,17,0.05)] ring-1 ring-black/5 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-royal">Month 2024</p>
                  <p className="text-xs text-secondary-text">Calendar overview</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-gold-deep ring-1 ring-black/5">
                  <CalendarDays size={18} />
                </div>
              </div>

              <div className="mt-4 rounded-[24px] bg-ivory/70 p-4 ring-1 ring-black/5">
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary-text">
                  {weekDays.map((day) => (
                    <span key={day} className="py-1">{day}</span>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-1 text-center text-sm font-medium text-charcoal">
                  {calendarDays.map((day, index) => {
                    const isToday = index === 16
                    const muted = index < 4 || index > 34

                    return (
                      <span
                        key={`${day}-${index}`}
                        className={`grid h-9 place-items-center rounded-full ${isToday ? 'bg-gold-deep text-white shadow-[0_10px_20px_rgba(185,134,11,0.28)]' : muted ? 'text-secondary-text/60' : 'hover:bg-white'}`}
                      >
                        {day}
                      </span>
                    )
                  })}
                </div>
              </div>
            </section>

            <section className="rounded-[30px] bg-white p-5 shadow-[0_12px_30px_rgba(17,17,17,0.05)] ring-1 ring-black/5">
              <p className="text-sm font-semibold text-royal">Quick Summary</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-[22px] bg-[#EAF2FF] px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563EB]">Pending</p>
                  <p className="mt-1 text-2xl font-bold text-royal">27</p>
                </div>
                <div className="rounded-[22px] bg-[#FFF4D9] px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">Completed</p>
                  <p className="mt-1 text-2xl font-bold text-royal">1,645</p>
                </div>
                <div className="rounded-[22px] bg-[#FDECEC] px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EF4444]">Cancelled</p>
                  <p className="mt-1 text-2xl font-bold text-royal">124</p>
                </div>
              </div>

              <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-royal transition hover:text-gold-deep">
                View full report
                <ChevronRight size={16} />
              </button>
            </section>
          </aside>
      </main>
    </div>
  )
}