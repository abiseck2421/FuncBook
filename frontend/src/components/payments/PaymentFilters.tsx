import { ChevronDown, Download } from 'lucide-react'

interface Props {
  dateRange: string
  methodFilter: string
  statusFilter: string
  dateRangeOptions: readonly string[]
  paymentMethodOptions: readonly string[]
  statusOptions: readonly string[]
  onDateRangeChange: (v: string) => void
  onMethodFilterChange: (v: string) => void
  onStatusFilterChange: (v: string) => void
  onExport: () => void
}

const selectClass =
  'appearance-none w-full h-[44px] px-4 pr-9 rounded-xl border border-gold-deep/15 bg-white text-sm text-royal font-semibold focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors cursor-pointer'

export default function PaymentFilters({
  dateRange, methodFilter, statusFilter, dateRangeOptions, paymentMethodOptions, statusOptions,
  onDateRangeChange, onMethodFilterChange, onStatusFilterChange, onExport,
}: Props) {
  const renderSelect = (
    value: string,
    options: readonly string[],
    onChange: (v: string) => void,
  ) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none" />
    </div>
  )

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex-1 min-w-[140px] max-w-[200px]">
        {renderSelect(dateRange, dateRangeOptions, onDateRangeChange)}
      </div>
      <div className="flex-1 min-w-[140px] max-w-[200px]">
        {renderSelect(methodFilter, paymentMethodOptions, onMethodFilterChange)}
      </div>
      <div className="flex-1 min-w-[120px] max-w-[200px]">
        {renderSelect(statusFilter, statusOptions, onStatusFilterChange)}
      </div>
      <button
        type="button"
        onClick={onExport}
        className="h-[44px] inline-flex items-center gap-2 px-5 rounded-xl text-sm font-semibold text-gold-deep bg-gold/10 border border-gold/20 hover:bg-gold-deep hover:text-white hover:border-gold-deep transition-all duration-250 ml-auto shrink-0"
      >
        <Download size={14} />
        Export CSV
      </button>
    </div>
  )
}
