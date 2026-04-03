import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, IBM_Plex_Mono, Inter } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-pjs',
  display: 'swap',
})

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kormik — কর্মীক | Digital Labour Infrastructure Platform',
  description:
    "Verified identity, QR attendance, and job-matching for Bangladesh's 36 million informal workers. Piloting in Dhaka.",
  keywords: [
    'informal labour Bangladesh',
    'worker identity',
    'QR attendance',
    'construction workers Dhaka',
    'labour platform',
    'কর্মীক',
  ],
  openGraph: {
    title: 'Kormik — কর্মীক',
    description: "Bangladesh's verified labour infrastructure. Make your work count.",
    url: 'https://kormik.com.bd',
    siteName: 'Kormik',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
  metadataBase: new URL('https://kormik.com.bd'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${ibmMono.variable} ${inter.variable}`}
    >
      <body className="font-body bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
