import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ContextCTA from '@/components/ContextCTA'
import ActionLink from '@/components/ActionLink'

export const metadata: Metadata = { title: 'How to Host a Block Party', description: 'Plan a simple neighborhood block party with practical rules for location, invitations, food, follow-up, and permits.', alternates: { canonical: '/block-party' } }

const topics = ['Choose the right location', 'Invite neighbors personally', 'Keep food and cost simple', 'Plan for kids and weather', 'Know what permits may apply', 'Follow up before momentum fades']

export default function BlockPartyPage() {
  return <SiteFrame>
    <PageHero eyebrow="The first gathering" title="Host a block party people can actually repeat." description="A first party is not a production. It is a low-pressure reason for the people nearby to become people you know." cta={{ label: 'Open the free party kit', href: '/resources/first-block-party-kit' }} />
    <section className="section"><div className="site-container">
      <div className="section-header"><p className="eyebrow">The useful essentials</p><h2>Six decisions. One real connection.</h2></div>
      <div className="card-grid">{topics.map((topic, index) => <article className="content-card" key={topic}><span className="step-number">{index + 1}</span><h3>{topic}</h3><p>{index === 4 ? 'Local rules genuinely vary. Only rely on current, verified information from the relevant city or venue.' : 'Use the complete kit for direct guidance, sample language, and the next action.'}</p><ActionLink href="/resources/first-block-party-kit" variant="text">Use the guide</ActionLink></article>)}</div>
    </div></section><ContextCTA type="party" />
  </SiteFrame>
}
