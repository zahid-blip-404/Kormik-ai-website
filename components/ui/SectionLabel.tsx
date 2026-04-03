interface SectionLabelProps {
  children: string
  dot?: boolean
}

export function SectionLabel({ children, dot = false }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand mb-3">
      <span className="w-6 h-px bg-brand/40" />
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-success animate-live-pulse" />}
      {children}
      <span className="w-6 h-px bg-brand/40" />
    </div>
  )
}
