import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import StoryForm from '@/components/StoryForm'
import ContextCTA from '@/components/ContextCTA'

export const metadata: Metadata = { title: 'Share Your Neighborhood Story', description: 'Tell Hey Neighbor what your neighborhood was like before, what you tried, and what happened next.', alternates: { canonical: '/share' } }

export default function SharePage() {
  return <SiteFrame>
    <PageHero eyebrow="Close the loop" title="Your story can help someone else knock on the first door." description="Specific, honest details matter more than polish. Tell us what you tried, what surprised you, and what changed afterward." />
    <section className="section"><div className="site-container guide-layout"><div><StoryForm /></div><aside className="side-card"><h3>Helpful additions</h3><ul><li>The invitation or flyer you used</li><li>Photos from the first gathering</li><li>Any follow-up calendar</li><li>An optional short video</li><li>Practical advice for the next person</li></ul><p className="form-note">Never include a child&apos;s identifiable photo without appropriate permission.</p></aside></div></section>
    <ContextCTA type="start" />
  </SiteFrame>
}
