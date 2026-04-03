import { LucideIcon } from 'lucide-react'

interface PricingCardProps {
  badge: string
  icon: LucideIcon
  title: string
  body: string
}

export function PricingCard({ badge, icon: Icon, title, body }: PricingCardProps) {
  return (
    <div className="relative group bg-bg-2 border border-border rounded-xl p-8 card-glow">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-10" />

      <span className="inline-block font-mono text-[10px] text-brand bg-brand/10 border border-brand/20 rounded px-2 py-0.5 mb-5">
        {badge}
      </span>

      <div className="w-10 h-10 rounded-full bg-bg-3 border border-border flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-text-secondary group-hover:text-brand transition-colors" />
      </div>

      <h3 className="font-body text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="font-body text-sm text-text-secondary leading-relaxed">{body}</p>
    </div>
  )
}
