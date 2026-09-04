import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import StoryForm from '@/components/StoryForm'
import ContextCTA from '@/components/ContextCTA'
import { storyEmail } from '@/lib/contact'

export const metadata: Metadata = { title: 'Share Your Neighborhood Story', description: 'Tell Hey Neighbor what your neighborhood was like before, what you tried, and what happened next.', alternates: { canonical: '/share' } }

export default function SharePage() {
  return <SiteFrame>
    <PageHero eyebrow="Close the loop" title="Your story can help someone else knock on the first door." description="Specific, honest details matter more than polish. Tell us what you tried, what surprised you, and what changed afterward." />
    <section className="section"><div className="site-container guide-layout"><div><StoryForm recipient={storyEmail} /></div><aside className="side-card"><h3>Your story, your choice</h3><p>A written story is enough. Photos, videos, flyers, and calendars are optional.</p><p>You choose whether we may follow up. Publication needs separate approval, including permission from the people pictured.</p><p>Remove private contact details from any materials you choose to share.</p></aside></div></section>
    <ContextCTA type="start" />
  </SiteFrame>
}
