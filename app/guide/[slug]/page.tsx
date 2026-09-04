import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteFrame from '@/components/SiteFrame'
import Breadcrumbs from '@/components/Breadcrumbs'
import ActionLink from '@/components/ActionLink'
import ContextCTA from '@/components/ContextCTA'
import { guideSteps } from '@/content/site'

export function generateStaticParams() { return guideSteps.map((step) => ({ slug: step.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const step = guideSteps.find((item) => item.slug === slug)
  if (!step) return {}
  return {
    title: `Step ${step.number}: ${step.title}`,
    description: step.summary,
    alternates: { canonical: `/guide/${step.slug}` },
    openGraph: { title: `Step ${step.number}: ${step.title}`, description: step.summary },
  }
}

export default async function GuideStepPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const step = guideSteps.find((item) => item.slug === slug)
  if (!step) notFound()
  const next = guideSteps[step.number] || null
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: '10-Step Guide', item: '/guide' },
      { '@type': 'ListItem', position: 3, name: step.title },
    ],
  }
  return (
    <SiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: '10-Step Guide', href: '/guide' }, { label: step.title }]} />
          <p className="eyebrow">Phase {step.phase} · Step {step.number} of 10</p>
          <h1>{step.title}</h1>
          <p className="page-hero-copy">{step.summary}</p>
        </div>
      </section>
      <section className="section">
        <div className="site-container guide-layout">
          <article className="article-copy">
            <p className="eyebrow">The core principle</p>
            <div className="principle-card">{step.principle}</div>
            <h2>What to do next</h2>
            <ul className="action-list">{step.actions.map((action) => <li key={action}>{action}</li>)}</ul>
            {step.number === 1 && <p>Use walkability, major streets, parks, walls, waterways, and the geography people already understand. The goal is not governmental accuracy. The goal is answering: <strong>Who are the people I am trying to know?</strong></p>}
            {step.number === 2 && <p>People may wonder whether you are selling something, recruiting for something, or carrying a hidden agenda. A plain statement such as “I want to live somewhere where I actually know the people around me” resolves that uncertainty.</p>}
            {step.number === 3 && <p>Neutral territory, a low-cost format, and personal invitations matter. Bring a flyer when you knock, repeat your honest motivation on it, and announce the next date while the first gathering still has energy.</p>}
            {step.number === 4 && <p>Choose a few people you would genuinely enjoy seeing again. Take a walk, get coffee, arrange a playdate, or watch a game. At the next gathering, become a temporary switchboard and introduce people around shared interests.</p>}
            {step.number === 5 && <p>The tool is not the community. Choose the platform your neighbors already use, even if it is not your favorite. Whether you choose WhatsApp, Facebook, or a group text, use three rules: no sales, no politics, and no vague complaints about neighbors.</p>}
            {step.number === 6 && <p>When someone says “you know what we should do,” collect the idea and ask when they would enjoy hosting it. The opportunity to contribute is not a burden; it is how the neighborhood becomes everyone&apos;s.</p>}
            {step.number === 7 && <p>When an event works, repeat it at a predictable time. Traditions create identity and remove the work of deciding from scratch every year.</p>}
            {step.number === 8 && <p>Not everyone wants to host. Many people will happily coordinate a book club, welcome newcomers, organize a tool share, lead a walking group, or take one small job at an event.</p>}
            {step.number === 9 && <p>Choose a welcome person and give every newcomer the same essentials: a short welcome, the virtual-group link, upcoming dates, useful local information, and introductions to people nearby.</p>}
            {step.number === 10 && <p>Capture the honest arc: what life was like before, what someone tried, what they feared, what happened, and what grew afterward. You can write a few notes or film yourself before and after a gathering. Ask permission before recording or sharing other people, especially children, and leave private contact details out of flyers you share. Sending a story does not grant publication permission.</p>}
            <div className="button-row">
              {step.number === 3 && <ActionLink href="/resources/first-block-party-kit">Open the First Block Party Kit</ActionLink>}
              {step.number === 10 && <ActionLink href="/share">Share your neighborhood story</ActionLink>}
              {next && <ActionLink href={`/guide/${next.slug}`} variant="secondary">Next: {next.title}</ActionLink>}
            </div>
          </article>
          <aside className="side-card">
            <h3>Helpful resources</h3>
            <ul>{step.resources.map((resource) => <li key={resource}>{resource}</li>)}</ul>
            <ActionLink href={step.number === 3 ? '/resources/first-block-party-kit' : '/resources'} variant="dark">Browse resources</ActionLink>
          </aside>
        </div>
      </section>
      <ContextCTA type={step.number < 3 ? 'party' : step.number === 10 ? 'story' : 'workshop'} />
    </SiteFrame>
  )
}
