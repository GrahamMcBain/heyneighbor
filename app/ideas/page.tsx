import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ContextCTA from '@/components/ContextCTA'
import { ideaCategories } from '@/content/site'

export const metadata: Metadata = { title: 'Neighborhood Party Ideas', description: 'Simple neighborhood event ideas designed to help neighbors talk, connect, and build repeatable traditions.', alternates: { canonical: '/ideas' } }

export default function IdeasPage() {
  return <SiteFrame>
    <PageHero eyebrow="Party ideas" title="Choose connection, not production value." description="A good neighborhood activity gives people something easy to do together and enough room to actually talk." cta={{ label: 'Plan a first gathering', href: '/resources/first-block-party-kit' }} />
    <section className="section"><div className="site-container">
      <div className="section-header"><p className="eyebrow">Start with the format</p><h2>Ideas that make conversation easier.</h2><p>Every idea should be evaluated by the connection it creates: cost, host effort, group size, repeatability, and whether strangers can comfortably join.</p></div>
      <div className="card-grid">{ideaCategories.map((category) => <article className="content-card idea-card" key={category.title}><h3>{category.title}</h3><ul>{category.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
    </div></section><ContextCTA type="party" />
  </SiteFrame>
}
