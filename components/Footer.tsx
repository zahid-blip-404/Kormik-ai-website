import Link from 'next/link'
import { Logo } from './ui/Logo'

const workerLinks  = [
  { label: 'For Workers',       href: '/for-workers' },
  { label: 'For Sardars',       href: '/for-sardars' },
]
const businessLinks = [
  { label: 'For Contractors',   href: '/for-contractors' },
  { label: 'For Organizations', href: '/for-enterprise' },
]
const companyLinks = [
  { label: 'How It Works',      href: '/how-it-works' },
  { label: 'Impact',            href: '/impact' },
  { label: 'About',             href: '/about' },
  { label: 'Blog',              href: '/blog' },
  { label: 'Contact',           href: '/contact' },
]
const legalLinks = [
  { label: 'Privacy Policy',    href: '/privacy' },
  { label: 'Terms of Service',  href: '/terms' },
]

const socials = [
  { name: 'LinkedIn', href: '#', icon: 'in' },
  { name: 'Facebook', href: '#', icon: 'f'  },
  { name: 'WhatsApp', href: '#', icon: 'wa' },
]

function FooterCol({ title, links }: { title: string; links: typeof companyLinks }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-widest text-text-ghost mb-4">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-body text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="glass-dark border-t border-border-subtle py-16 px-4 md:px-8">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-3" />
            <p className="font-mono text-[10px] text-text-ghost mb-1">
              কর্মীক — Digital Labour Infrastructure
            </p>
            <p className="font-body text-sm text-text-muted mt-3 leading-relaxed">
              Bangladesh&apos;s verified worker platform. Making labour visible.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-8 h-8 rounded-lg glass-sm flex items-center justify-center font-mono text-[10px] text-text-muted hover:text-text-secondary hover:border-brand/30 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Workers"  links={workerLinks} />
          <FooterCol title="Business" links={businessLinks} />
          <FooterCol title="Company"  links={companyLinks} />
          <FooterCol title="Legal"    links={legalLinks} />
        </div>

        <div className="border-t border-border-subtle mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-text-ghost">
            Piloting in Mohammadpur · Adabor · Mirpur · Dhaka, Bangladesh
          </p>
          <p className="font-mono text-[10px] text-text-ghost">
            © 2026 Kormik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
