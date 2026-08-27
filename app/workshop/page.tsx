import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ActionLink from '@/components/ActionLink'
import ContextCTA from '@/components/ContextCTA'

export const metadata: Metadata = { title: 'Friday Neighborhood Workshop', description: 'Join the free Friday workshop for practical help meeting neighbors and planning a first neighborhood gathering.', alternates: { canonical: '/workshop' } }

export default function WorkshopPage() {
  const workshopUrl = process.env.NEXT_PUBLIC_WORKSHOP_URL || '#workshop-details'
  return <SiteFrame>
    <PageHero eyebrow="Live Friday workshop" title="Bring the awkward question. Leave with a next action." description="The workshop is practical support for people who want to know their neighbors but are unsure how to begin—or how to keep momentum going." cta={{ label: 'Reserve a free place', href: workshopUrl }} />
    <section className="section" id="workshop-details"><div className="site-container guide-layout">
      <div className="article-copy"><p className="eyebrow">What we work through</p><h2>Real situations, not a generic presentation.</h2><ul className="action-list"><li>Choosing the right neighborhood boundary</li><li>Inviting people without feeling weird</li><li>Planning a simple first gathering</li><li>Handling “what if nobody comes?”</li><li>Getting other neighbors to take ownership</li></ul><p>Questions from the workshop also help Hey Neighbor improve its guides, resources, and answer library using the language real people use.</p></div>
      <aside className="side-card"><h3>Friday workshop</h3><p>The confirmed time, time zone, meeting platform, and registration destination will appear here once connected.</p><ActionLink href={workshopUrl} variant="dark">Reserve a place</ActionLink></aside>
    </div></section><ContextCTA type="start" />
  </SiteFrame>
}
