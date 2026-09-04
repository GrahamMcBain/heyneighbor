import type { Metadata } from 'next'
import Link from 'next/link'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ContextCTA from '@/components/ContextCTA'
import ActionLink from '@/components/ActionLink'
import { guideSteps, teachingSlidesUrl } from '@/content/site'

export const metadata: Metadata = {
  title: 'The Complete 10-Step Guide',
  description: 'Learn how to meet your neighbors, host a first gathering, and build a lasting neighborhood community in ten practical steps.',
  alternates: { canonical: '/guide' },
}

export default function GuidePage() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'How to build community in your neighborhood',
    itemListElement: guideSteps.map((step) => ({ '@type': 'ListItem', position: step.number, name: step.title, url: `/guide/${step.slug}` })),
  }
  return (
    <SiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero eyebrow="The Hey Neighbor method" title="Build a real community where you live." description="Ten practical steps move a neighborhood from polite distance to real relationships, then from one organizer to shared ownership." cta={{ label: 'Start Step One', href: '/guide/define-your-neighborhood' }} secondary={{ label: 'Find my best starting point', href: '/start' }} />
      <section className="section steps-wrap">
        <div className="site-container">
          <div className="section-header">
            <p className="eyebrow">Anyone can start</p>
            <h2>No special skills. No hidden agenda.</h2>
            <p>Start with one honest intention: getting to know the people around you. A gathering is not a sales pitch, political campaign, or recruitment opportunity. Small, consistent invitations are enough to begin.</p>
            <ActionLink href={teachingSlidesUrl} variant="text">View Graham&apos;s free teaching deck</ActionLink>
          </div>
          {[1, 2].map((phase) => (
            <div key={phase} className="guide-phase">
              <div className="section-header">
                <p className="eyebrow">Phase {phase} · {phase === 1 ? 'Start' : 'Grow'}</p>
                <h2>{phase === 1 ? 'Bootstrap the community.' : 'Give the neighborhood ownership.'}</h2>
                <p>{phase === 1 ? 'One person creates enough momentum for relationships to begin.' : 'People, roles, ideas, and traditions spread across the neighborhood.'}</p>
              </div>
              <div className="steps-grid">
                {guideSteps.filter((step) => step.phase === phase).map((step) => (
                  <Link href={`/guide/${step.slug}`} key={step.slug} className="step-card">
                    <span className="step-number">{step.number}</span>
                    <h3>{step.title}</h3><p>{step.summary}</p><span className="step-card-arrow">Read step →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="section-tight"><ContextCTA type="party" /></div>
    </SiteFrame>
  )
}
