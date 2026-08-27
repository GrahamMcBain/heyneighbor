import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import Breadcrumbs from '@/components/Breadcrumbs'
import ActionLink from '@/components/ActionLink'
import ContextCTA from '@/components/ContextCTA'

export const metadata: Metadata = { title: 'First Block Party Kit', description: 'A simple, practical guide to planning, inviting, hosting, and following up after your first neighborhood gathering.', alternates: { canonical: '/resources/first-block-party-kit' } }

export default function BlockPartyKitPage() {
  const howTo = {
    '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to host your first neighborhood block party',
    step: ['Choose neutral territory', 'Pick a low-stakes format', 'Invite neighbors face to face', 'Host simply', 'Announce the second gathering'].map((name, index) => ({ '@type': 'HowToStep', position: index + 1, name })),
  }
  return (
    <SiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <section className="page-hero"><div className="site-container page-hero-inner">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: 'First Block Party Kit' }]} />
        <p className="eyebrow">Free action kit</p><h1>Your first gathering can be wonderfully simple.</h1>
        <p className="page-hero-copy">Use neutral territory, keep the stakes low, knock on doors, and decide the second date before the first party begins.</p>
      </div></section>
      <section className="section"><div className="site-container kit-grid">
        <article className="kit-panel"><p className="eyebrow">Rule one</p><h2>Neutral territory</h2><p>Choose a front yard, driveway, sidewalk, cul-de-sac, common area, or walkable park. The first gathering should not require strangers to enter a private home.</p></article>
        <article className="kit-panel"><p className="eyebrow">Rule two</p><h2>Low stakes</h2><p>Make it cheap and repeatable. Popsicles, watermelon, lemonade, cider, or hot chocolate are enough. Ask neighbors to bring chairs, drinks, or a snack.</p></article>
        <article className="kit-panel kit-panel-full" id="door-script"><p className="eyebrow">Rule three · The door-knocking script</p><h2>Invite people like a person.</h2>
          <div className="script-box">“Hi, I&apos;m [name] from [house or street]. I realized I know a lot of the cars and dogs around here, but not enough of the people. I want to live somewhere where neighbors actually know one another, so I&apos;m putting together a really simple [popsicle party / driveway meetup] on [date]. No agenda—just a chance to say hello. I&apos;d love for you to come.”</div>
          <p>Bring a flyer and repeat that honest motivation on it. The person at the door may trust you; the flyer helps the rest of the household understand your intent.</p>
        </article>
        <article className="kit-panel"><p className="eyebrow">Before the party</p><h2>Checklist</h2><ul className="check-list"><li>Define the homes you are inviting</li><li>Choose a walkable location</li><li>Pick a simple 60–90 minute format</li><li>Knock on doors with a flyer</li><li>Choose the second gathering date</li></ul></article>
        <article className="kit-panel"><p className="eyebrow">At the party</p><h2>Keep momentum</h2><ul className="check-list"><li>Welcome people by name</li><li>Make useful introductions</li><li>Learn one thing about each household</li><li>Announce the next date</li><li>Invite one small follow-up connection</li></ul></article>
        <article className="kit-panel kit-panel-full"><p className="eyebrow">Keep it nearby</p><h2>Printable companion</h2><p>The current printable includes the complete ten-step method. A designed, standalone party-kit PDF can replace it when supplied.</p><ActionLink href="/docs/HeyNeighbor-10-Step.pdf">Download the 10-Step PDF</ActionLink></article>
      </div></section>
      <ContextCTA type="workshop" />
    </SiteFrame>
  )
}
