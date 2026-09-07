import { CheckCircle2 } from 'lucide-react'

type SuccessBannerProps = {
  message: string
}

export default function SuccessBanner({ message }: SuccessBannerProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium animate-slide-in">
      <CheckCircle2 size={16} className="shrink-0" />
      {message}
    </div>
  )
}