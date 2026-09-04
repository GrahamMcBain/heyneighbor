import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.heyneighborlabs.com'),
  title: { default: 'Hey Neighbor | Turn Your Neighborhood Into a Community', template: '%s | Hey Neighbor' },
  description: 'Free, practical resources for meeting your neighbors, hosting a first gathering, and building a community where you live. Start with one invitation.',
  keywords: ['how to meet neighbors', 'neighborhood community', 'block party', 'community building'],
  openGraph: {
    siteName: 'Hey Neighbor',
    type: 'website',
    title: 'Turn Your Neighborhood Into a Community',
    description: 'A practical 10-step guide for bringing neighbors together.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
