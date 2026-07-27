interface BookingStatusItem {
  label: string
  count: number
  color: string
}

interface HostBookingStatusCardProps {
  data: BookingStatusItem[]
  className?: string
}

const colorMap: Record<string, string> = {
  emerald: '#10B981',
  sky: '#0EA5E9',
  amber: '#F59E0B',
  red: '#EF4444',
}

function getStrokeColor(colorClass: string): string {
  const key = colorClass.replace('bg-', '').replace('-500', '')
  return colorMap[key] || '#A3A3A3'
}

export default function HostBookingStatusCard({ data, className = '' }: HostBookingStatusCardProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  const segments = data.reduce<{ offset: number; dash: number; stroke: string }[]>((acc, item) => {
    const pct = (item.count / total) * 100
    acc.push({ offset: acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0, dash: pct, stroke: getStrokeColor(item.color) })
    return acc
  }, [])

  return (
    <div className={`bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 flex flex-col ${className}`}>
      <h2 className="font-heading text-lg sm:text-xl font-bold text-royal mb-6">Booking Status</h2>

      <div className="flex-1 flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke={seg.stroke}
                strokeWidth="3.5"
                strokeDasharray={`${seg.dash} ${100 - seg.dash}`}
                strokeDashoffset={`${-seg.offset}`}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-2xl font-bold text-royal">{total}</span>
            <span className="text-[10px] text-secondary-text uppercase tracking-wider">Total</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span className="text-sm text-charcoal">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-royal">{item.count}</span>
              <span className="text-[11px] text-secondary-text w-10 text-right">
                {Math.round((item.count / total) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
