import type { Metadata } from 'next'
import Image from 'next/image'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ContextCTA from '@/components/ContextCTA'

export const metadata: Metadata = { title: 'Real Neighborhood Stories', description: 'Real photographs and first-party stories from ordinary people bringing neighbors together.', alternates: { canonical: '/stories' } }

const photos = [
  ['/photos/dodson-neighbors.jpg', 'Neighbors gathering together'],
  ['/photos/WhatsApp Image 2025-09-27 at 20.21.12.jpeg', 'A real neighborhood gathering'],
  ['/photos/WhatsApp Image 2025-10-05 at 17.17.21.jpeg', 'Neighbors sharing time outside'],
  ['/photos/WhatsApp Image 2025-10-26 at 12.38.08.jpeg', 'A neighborhood event in progress'],
  ['/photos/WhatsApp Image 2025-11-01 at 06.56.03.jpeg', 'Neighbors creating a local tradition'],
]

export default function StoriesPage() {
  return <SiteFrame>
    <PageHero eyebrow="Proof" title="The honest story is the useful story." description="Hey Neighbor stories show what life was like before, the small action someone took, what they feared, and what actually grew afterward." cta={{ label: 'Share your story', href: '/share' }} secondary={{ label: 'Start your own', href: '/start' }} />
    <section className="section"><div className="site-container">
      <div className="section-header"><p className="eyebrow">From the neighborhoods</p><h2>Real photos, with the full stories still to come.</h2><p>We are publishing only first-party details that can be verified. No composite testimonials, invented attendance, or generic “success story” copy.</p></div>
      <div className="story-photo-grid">{photos.map(([src, caption]) => <figure key={src}><Image src={src} alt={caption} width={600} height={450} /><figcaption>{caption}</figcaption></figure>)}</div>
    </div></section><ContextCTA type="story" />
  </SiteFrame>
}
