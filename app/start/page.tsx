import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ActionLink from '@/components/ActionLink'
import ContextCTA from '@/components/ContextCTA'

export const metadata: Metadata = {
  title: 'Start Here',
  description: 'Find the right next step for building community with your neighbors.',
  alternates: { canonical: '/start' },
}

const paths = [
  { quote: 'I barely know my neighbors.', text: 'Begin by choosing a clear, human-sized neighborhood and introducing yourself with honest motivation.', label: 'Start Step 1', href: '/guide/define-your-neighborhood' },
  { quote: 'I know some neighbors, but we have never gotten together.', text: 'Skip straight to a simple first gathering. The kit gives you the location rules, invitation script, and checklist.', label: 'Plan a first block party', href: '/resources/first-block-party-kit' },
  { quote: 'We have had a couple of neighborhood events.', text: 'Turn occasional attendance into actual relationships and a simple communication hub.', label: 'Build real connections', href: '/guide/make-one-on-one-connections' },
  { quote: 'We have a community, but I organize everything.', text: 'Phase Two distributes ideas, events, traditions, and micro-roles so the neighborhood can own itself.', label: 'Move to Phase Two', href: '/guide/annual-neighborhood-planning-party' },
]

export default function StartPage() {
  return (
    <SiteFrame>
      <PageHero eyebrow="Your best next action" title="Start where your neighborhood actually is." description="You do not have to earn your way through a course. Choose the statement that sounds most like your street today." />
      <section className="section">
        <div className="site-container diagnostic-grid">
          {paths.map((path, index) => (
            <article className="diagnostic-card" key={path.quote}>
              <p className="eyebrow">Path {index + 1}</p>
              <p className="quote">“{path.quote}”</p>
              <p>{path.text}</p>
              <ActionLink href={path.href} variant="text">{path.label}</ActionLink>
            </article>
          ))}
        </div>
      </section>
      <ContextCTA type="workshop" />
    </SiteFrame>
  )
}
