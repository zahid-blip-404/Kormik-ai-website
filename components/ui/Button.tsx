import { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'icon'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit'
  'aria-label'?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-brand to-brand-hover text-white border-transparent ' +
    'shadow-brand-md hover:shadow-brand-lg hover:-translate-y-0.5 ' +
    'transition-all duration-200',
  secondary:
    'glass-sm text-text-secondary hover:border-brand/30 hover:text-white ' +
    'hover:-translate-y-0.5 transition-all duration-200',
  ghost:
    'bg-transparent border border-border-subtle text-text-muted ' +
    'hover:border-border-strong hover:text-text-secondary transition-colors duration-200',
  icon:
    'glass-brand !p-0 flex items-center justify-center ' +
    'hover:-translate-y-0.5 hover:shadow-brand-sm transition-all duration-200',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

const iconSize: Record<Size, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isIcon = variant === 'icon'
  const base = `inline-flex items-center gap-2 font-display font-semibold rounded-btn border whitespace-nowrap cursor-pointer`
  const sizeClass = isIcon ? iconSize[size] : sizes[size]
  const classes = `${base} ${variants[variant]} ${sizeClass} ${className}`

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
