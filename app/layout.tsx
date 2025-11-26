import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'HeyNeighbor - Meet your neighbors. Change your block.',
  description: 'HeyNeighbor gives you a simple playbook and weekly support to turn strangers into an actual community right where you live.',
  keywords: ['community', 'neighbors', 'local', 'meetups', 'neighborhood'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-inter text-hn-blue bg-hn-parchment antialiased">
        {children}
        <Script 
          id="mcjs" 
          strategy="lazyOnload"
          src="https://chimpstatic.com/mcjs-connected/js/users/2e0da63a1ddb9e0385e40b5ad/ba17db64d81bcb275b14a5db8.js"
        />
      </body>
    </html>
  )
}
