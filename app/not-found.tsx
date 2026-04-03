import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen flex items-center justify-center px-4 text-center"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #1A0800 0%, #0A0A0A 65%)',
        }}
      >
        <div className="absolute inset-0 grid-texture pointer-events-none opacity-40" />
        <div className="relative max-w-[480px]">
          <div className="font-mono text-[120px] font-bold text-brand/15 leading-none select-none mb-4">
            404
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Page not found.
          </h1>
          <p className="font-body text-base text-text-secondary leading-relaxed mb-8">
            The page you&apos;re looking for doesn&apos;t exist — or it may have moved.
            Let&apos;s get you back on track.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold font-body text-sm px-6 py-3 rounded-[8px] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
