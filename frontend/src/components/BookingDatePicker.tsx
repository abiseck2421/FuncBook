import { useState, useEffect, useRef, useCallback } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface BookingDatePickerProps {
  value: string
  onChange: (date: string) => void
  minDate?: string
  maxDate?: string
  placeholder?: string
  disabled?: boolean
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDateDisplay(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function toDateString(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

function isDateDisabled(dateStr: string, minDate?: string, maxDate?: string) {
  if (minDate && dateStr < minDate) return true
  if (maxDate && dateStr > maxDate) return true
  return false
}

export default function BookingDatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = 'Select date',
  disabled = false,
}: BookingDatePickerProps) {
  const now = new Date()
  const [isOpen, setIsOpen] = useState(false)
  const [viewYear, setViewYear] = useState(value ? new Date(value + 'T00:00:00').getFullYear() : now.getFullYear())
  const [viewMonth, setViewMonth] = useState(value ? new Date(value + 'T00:00:00').getMonth() : now.getMonth())
  const [hoverDate, setHoverDate] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      const d = new Date(value + 'T00:00:00')
      setViewYear(d.getFullYear())
      setViewMonth(d.getMonth())
    }
  }, [value])

  const closePicker = useCallback(() => {
    setIsOpen(false)
    setHoverDate(null)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closePicker()
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePicker()
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closePicker])

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const handleYearChange = (year: number) => {
    setViewYear(year)
  }

  const handleMonthChange = (month: number) => {
    setViewMonth(month)
  }

  const handleDateSelect = (day: number) => {
    const dateStr = toDateString(viewYear, viewMonth, day)
    if (isDateDisabled(dateStr, minDate, maxDate)) return
    onChange(dateStr)
    closePicker()
  }

  const handleClear = () => {
    onChange('')
    closePicker()
  }

  const todayStr = toDateString(now.getFullYear(), now.getMonth(), now.getDate())
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const prevMonthDays = viewMonth === 0 ? getDaysInMonth(viewYear - 1, 11) : getDaysInMonth(viewYear, viewMonth - 1)

  const calendarDays: { day: number; currentMonth: boolean; dateStr: string }[] = []

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    const m = viewMonth === 0 ? 11 : viewMonth - 1
    const y = viewMonth === 0 ? viewYear - 1 : viewYear
    calendarDays.push({ day, currentMonth: false, dateStr: toDateString(y, m, day) })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ day, currentMonth: true, dateStr: toDateString(viewYear, viewMonth, day) })
  }

  const remaining = 42 - calendarDays.length
  for (let day = 1; day <= remaining; day++) {
    const m = viewMonth === 11 ? 0 : viewMonth + 1
    const y = viewMonth === 11 ? viewYear + 1 : viewYear
    calendarDays.push({ day, currentMonth: false, dateStr: toDateString(y, m, day) })
  }

  const yearOptions = []
  const startYear = minDate ? new Date(minDate + 'T00:00:00').getFullYear() : now.getFullYear() - 5
  const endYear = maxDate ? new Date(maxDate + 'T00:00:00').getFullYear() : now.getFullYear() + 5
  for (let y = startYear; y <= endYear; y++) {
    yearOptions.push(y)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Input */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full rounded-xl border border-gold-deep/15 bg-ivory/50 px-4 py-2.5 text-sm text-left transition-all duration-200 flex items-center justify-between gap-2 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/40'
        } ${isOpen ? 'ring-2 ring-gold/40 border-gold/40' : ''}`}
      >
        <span className={!value ? 'text-charcoal/30' : 'text-royal'}>
          {value ? formatDateDisplay(value) : placeholder}
        </span>
        <CalendarDays size={16} className="text-gold-deep shrink-0" />
      </button>

      {/* Clear Button */}
      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded-lg text-charcoal/30 hover:text-royal hover:bg-ivory transition-colors"
        >
          <X size={14} />
        </button>
      )}

      {/* Calendar Popup */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-[340px] bg-white rounded-2xl border border-[#E8E2D4] shadow-[0_16px_48px_rgba(0,0,0,0.12)] animate-slide-in overflow-hidden">
          {/* Gold Gradient Header */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ background: 'linear-gradient(90deg, #A66A00 0%, #B8860B 30%, #C99700 65%, #D4A017 100%)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <CalendarDays size={14} className="text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <select
                  value={viewMonth}
                  onChange={(e) => handleMonthChange(Number(e.target.value))}
                  className="bg-white/15 text-white text-xs font-semibold rounded-lg px-2 py-1 border-none outline-none cursor-pointer appearance-none hover:bg-white/25 transition-colors"
                  style={{ WebkitAppearance: 'none' }}
                >
                  {MONTHS.map((m, i) => (
                    <option key={i} value={i} className="text-royal bg-white">{m}</option>
                  ))}
                </select>
                <select
                  value={viewYear}
                  onChange={(e) => handleYearChange(Number(e.target.value))}
                  className="bg-white/15 text-white text-xs font-semibold rounded-lg px-2 py-1 border-none outline-none cursor-pointer appearance-none hover:bg-white/25 transition-colors"
                  style={{ WebkitAppearance: 'none' }}
                >
                  {yearOptions.map((y) => (
                    <option key={y} value={y} className="text-royal bg-white">{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 px-3 pt-3">
            {SHORT_DAYS.map((day) => (
              <div key={day} className="text-center text-[10px] font-semibold uppercase tracking-wider text-secondary-text py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 px-3 pb-3 gap-0.5">
            {calendarDays.map((cell, i) => {
              const isToday = cell.dateStr === todayStr
              const isSelected = cell.dateStr === value
              const isDisabled = isDateDisabled(cell.dateStr, minDate, maxDate)
              const isHovered = cell.dateStr === hoverDate

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isDisabled}
                  onMouseEnter={() => setHoverDate(cell.dateStr)}
                  onMouseLeave={() => setHoverDate(null)}
                  onClick={() => handleDateSelect(cell.day)}
                  className={`relative w-full aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-150 ${
                    !cell.currentMonth
                      ? 'text-charcoal/20 cursor-default'
                      : isDisabled
                        ? 'text-charcoal/25 cursor-not-allowed'
                        : isSelected
                          ? 'bg-gold-deep text-white shadow-[0_2px_8px_rgba(184,134,11,0.3)]'
                          : isToday
                            ? 'text-gold-deep font-bold ring-1 ring-gold-deep/40'
                            : isHovered
                              ? 'bg-gold/10 text-gold-deep'
                              : 'text-charcoal hover:bg-ivory'
                  }`}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>

        </div>
      )}
    </div>
  )
}
