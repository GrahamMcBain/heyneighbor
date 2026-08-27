'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { navItems } from '@/content/site'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [isOpen])

  return (
    <header className="site-header">
      <div className="site-container nav-inner">
        <BrandLogo />
        <nav aria-label="Primary navigation" className="desktop-nav">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link href="/guide" className="nav-cta">Start the guide</Link>
        <button type="button" className="menu-button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? 'Close navigation' : 'Open navigation'}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav">
          <div className="site-container">
            {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</Link>)}
            <Link href="/guide" className="mobile-start" onClick={() => setIsOpen(false)}>Start the guide →</Link>
          </div>
        </nav>
      )}
    </header>
  )
}
