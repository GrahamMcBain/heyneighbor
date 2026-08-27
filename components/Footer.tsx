import Link from 'next/link'
import BrandLogo from './BrandLogo'
import { navItems } from '@/content/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <BrandLogo light />
          <p className="footer-mission">Helping ordinary people turn the place where they live into a real community.</p>
        </div>
        <div>
          <p className="footer-label">Take action</p>
          <Link href="/guide">Start the 10-Step Guide</Link>
          <Link href="/resources/first-block-party-kit">Get the First Block Party Kit</Link>
          <Link href="/workshop">Join the Friday Workshop</Link>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          {navItems.slice(2, 5).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link href="/share">Share your story</Link>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} Hey Neighbor</span>
        <span>Warm · Practical · Human · Hopeful</span>
      </div>
    </footer>
  )
}
