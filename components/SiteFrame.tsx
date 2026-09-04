import Nav from './Nav'
import Footer from './Footer'

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-hn-cream text-hn-brown">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  )
}
