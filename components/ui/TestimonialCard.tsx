interface TestimonialCardProps {
  quote: string
  quoteTranslation?: string
  initials: string
  attribution: string
  large?: boolean
}

export function TestimonialCard({
  quote,
  quoteTranslation,
  initials,
  attribution,
  large = false,
}: TestimonialCardProps) {
  if (large) {
    return (
      <div className="relative glass-md rounded-xl p-8 card-glow">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top left, rgba(255,92,26,0.06) 0%, transparent 60%)',
          }}
        />
        <div className="absolute top-4 left-6 font-display text-[120px] text-brand/10 leading-none select-none pointer-events-none">
          "
        </div>
        <div className="relative">
          <p className="font-body text-lg text-white leading-relaxed mb-2 mt-8">
            {quote}
          </p>
          {quoteTranslation && (
            <p className="font-body text-sm text-text-muted italic mb-6">
              {quoteTranslation}
            </p>
          )}
          <div className="flex items-center gap-3 mt-6">
            <div className="w-9 h-9 rounded-full bg-brand/20 text-brand font-bold text-sm flex items-center justify-center shrink-0">
              {initials}
            </div>
            <span className="font-body text-sm text-white">{attribution}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-md rounded-xl p-6 card-glow">
      <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brand/20 text-brand font-bold text-xs flex items-center justify-center shrink-0">
          {initials}
        </div>
        <span className="font-body text-sm text-white">{attribution}</span>
      </div>
    </div>
  )
}
