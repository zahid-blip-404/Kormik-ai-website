import { ReactNode } from 'react'
import { Navbar }     from './Navbar'
import { Footer }     from './Footer'
import { CTASection } from './CTASection'

interface InnerPageLayoutProps {
  children:   ReactNode
  showCTA?:   boolean
  heroTitle:  string
  heroAccent: string
  heroBadge:  string
  heroSub:    string
}

export function InnerPageLayout({
  children,
  showCTA = true,
  heroTitle,
  heroAccent,
  heroBadge,
  heroSub,
}: InnerPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main>
        {/* Branded inner-page hero header */}
        <section className="relative pt-32 pb-16 px-4 md:px-8 text-center overflow-hidden bg-bg">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255,92,26,0.09) 0%, transparent 60%)' }}
          />
          <div className="absolute inset-0 grid-texture pointer-events-none opacity-50" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 glass-brand rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-live-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand">
                {heroBadge}
              </span>
            </div>
            <h1
              className="font-display font-extrabold text-white mb-4"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-2.5px', lineHeight: 1.02 }}
            >
              {heroTitle}{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg,#FF5C1A,#FF9F4A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {heroAccent}
              </span>
            </h1>
            <p className="font-body text-base md:text-lg text-text-secondary max-w-[500px] mx-auto leading-relaxed">
              {heroSub}
            </p>
          </div>
        </section>

        {children}
        {showCTA && <CTASection />}
      </main>
      <Footer />
    </>
  )
}
