import Nav from './Nav'
import Footer from './Footer'

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-hn-cream text-hn-brown">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
