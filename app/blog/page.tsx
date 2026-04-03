import type { Metadata } from 'next'
import { InnerPageLayout } from '@/components/InnerPageLayout'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { EmailCapture } from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'Blog — Kormik',
  description:
    "Stories from the field, product updates, and insights on Bangladesh's informal labour sector.",
}

export default function BlogPage() {
  return (
    <InnerPageLayout
      showCTA={false}
      heroBadge="Blog"
      heroTitle="Stories from"
      heroAccent="the field."
      heroSub="Product updates, field insights, and stories from Bangladesh's informal labour sector."
    >
      <section
        className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-24"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #1A0800 0%, #0A0A0A 65%)',
        }}
      >
        <div className="absolute inset-0 grid-texture pointer-events-none opacity-50" />
        <div className="relative text-center max-w-[600px]">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mt-2 mb-6">
            Stories are{' '}
            <em className="text-brand not-italic">coming.</em>
          </h1>
          <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed mb-10">
            We&apos;ll be sharing field reports, product updates, and research on
            Bangladesh&apos;s informal labour sector. Subscribe to get notified when we publish.
          </p>
          <EmailCapture />
          <p className="font-mono text-[10px] text-text-muted mt-4">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </section>
    </InnerPageLayout>
  )
}
