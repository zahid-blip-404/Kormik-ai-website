interface StatCellProps {
  value: string
  label: string
  last?: boolean
}

export function StatCell({ value, label, last = false }: StatCellProps) {
  return (
    <div
      className={`text-center px-8 py-10 ${
        !last ? 'border-r border-border' : ''
      }`}
    >
      <span className="block font-body text-5xl font-bold text-brand leading-none mb-2">
        {value}
      </span>
      <span className="font-mono text-[11px] text-text-secondary tracking-wide uppercase">
        {label}
      </span>
    </div>
  )
}
