import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ActionLink from '@/components/ActionLink'
import ContextCTA from '@/components/ContextCTA'
import { resourceCards } from '@/content/site'

export const metadata: Metadata = { title: 'Free Neighborhood Resources', description: 'Free neighborhood flyers, scripts, checklists, and planning tools that help you take action.', alternates: { canonical: '/resources' } }

export default function ResourcesPage() {
  return (
    <SiteFrame>
      <PageHero eyebrow="Free resources" title="Use something. Meet someone." description="Every resource exists to make a real-world neighborhood connection easier—not to become another download you never open." cta={{ label: 'Get the First Block Party Kit', href: '/resources/first-block-party-kit' }} />
      <section className="section">
        <div className="site-container card-grid">
          {resourceCards.map((resource) => (
            <article className="content-card" key={resource.title}>
              <p className="eyebrow">Available now</p><h3>{resource.title}</h3><p>{resource.description}</p>
              <ActionLink href={resource.href} variant="text">{resource.label}</ActionLink>
            </article>
          ))}
        </div>
      </section>
      <ContextCTA type="start" />
    </SiteFrame>
  )
}
