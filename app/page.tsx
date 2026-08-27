import Image from 'next/image'
import Link from 'next/link'
import SiteFrame from '@/components/SiteFrame'
import ActionLink from '@/components/ActionLink'
import ContextCTA from '@/components/ContextCTA'
import { guideSteps, resourceCards } from '@/content/site'

const photos = [
  '/photos/dodson-neighbors.jpg',
  '/photos/WhatsApp Image 2025-10-05 at 17.17.21.jpeg',
  '/photos/WhatsApp Image 2025-10-26 at 12.38.08.jpeg',
]

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Hey Neighbor',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://heyneighbor.org',
    description: 'A practical method for turning neighborhoods into real communities.',
  }

  return (
    <SiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <section className="hero">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">One neighbor can start something real</p>
            <h1>Turn your neighborhood <em>into a community.</em></h1>
            <p>You don&apos;t need an HOA, committee, or elaborate event. You need a few neighbors willing to start—and a practical way to take the first step.</p>
            <div className="button-row">
              <ActionLink href="/start">Start here</ActionLink>
              <ActionLink href="/workshop" variant="secondary">Join Friday&apos;s free workshop</ActionLink>
            </div>
          </div>
          <div className="hero-art" aria-label="Hey Neighbor hand-drawn house">
            <Image src="/brand/figma/house-icon.png" alt="A cheerful hand-drawn neighborhood house" width={520} height={760} className="hero-house" priority />
            <div className="hero-note">You can live 30 feet apart for years. One invitation can change that.</div>
          </div>
        </div>
      </section>

      <section className="promise-strip">
        <div className="site-container promise-grid">
          <strong>This is fixable.</strong>
          <p>Building community does not require becoming “the neighborhood organizer.” It begins with one warm, low-stakes action that another person can say yes to.</p>
        </div>
      </section>

      <section className="section">
        <div className="site-container problem-grid">
          <div>
            <p className="eyebrow">The modern neighborhood</p>
            <h2>Close enough to wave. Too far apart to call.</h2>
          </div>
          <div className="problem-list">
            <div><span>We recognize</span> each other&apos;s cars.</div>
            <div><span>We know</span> which dogs live where.</div>
            <div><span>We pass</span> each other every week.</div>
            <div><span>But many of us</span> still don&apos;t know one another.</div>
          </div>
        </div>
      </section>

      <section className="section steps-wrap">
        <div className="site-container">
          <div className="section-header">
            <p className="eyebrow">The complete method</p>
            <h2>Ten steps from strangers to shared ownership.</h2>
            <p>Phase One starts real relationships. Phase Two gives the neighborhood enough ownership to keep going without one person carrying everything.</p>
          </div>
          {[1, 2].map((phase) => (
            <div key={phase}>
              <p className="phase-label">Phase {phase} — {phase === 1 ? 'Bootstrap the community' : 'Give the neighborhood ownership'}</p>
              <div className="steps-grid">
                {guideSteps.filter((step) => step.phase === phase).map((step) => (
                  <Link href={`/guide/${step.slug}`} key={step.slug} className="step-card">
                    <span className="step-number">{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.summary}</p>
                    <span className="step-card-arrow" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="button-row"><ActionLink href="/guide">Start Step One</ActionLink></div>
        </div>
      </section>

      <section className="section">
        <div className="site-container proof-grid">
          <div className="photo-stack">
            {photos.map((src, index) => (
              <div className="photo-card" key={src}><Image src={src} alt={`Neighbors spending time together, photograph ${index + 1}`} width={480} height={360} /></div>
            ))}
          </div>
          <div className="proof-copy">
            <p className="eyebrow">Real streets. Real gatherings.</p>
            <h2>Ordinary people can do this.</h2>
            <p>The method is deliberately simple: define the people around you, explain why you care, invite them personally, and make the next connection easier.</p>
            <blockquote>Proof should show the whole arc: before → action → result. Hey Neighbor never invents attendance numbers, testimonials, or impact metrics.</blockquote>
            <ActionLink href="/stories" variant="secondary">See neighborhood stories</ActionLink>
          </div>
        </div>
      </section>

      <section className="section steps-wrap">
        <div className="site-container">
          <div className="section-header">
            <p className="eyebrow">Use something today</p>
            <h2>Practical resources, not vague inspiration.</h2>
          </div>
          <div className="card-grid">
            {resourceCards.map((resource) => (
              <div className="content-card" key={resource.title}>
                <h3>{resource.title}</h3><p>{resource.description}</p>
                <ActionLink href={resource.href} variant="text">{resource.label}</ActionLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section workshop-band">
        <div className="site-container workshop-grid">
          <div>
            <p className="eyebrow eyebrow-light">Live on Fridays</p>
            <h2>Bring the thing that&apos;s keeping you stuck.</h2>
            <p>The free workshop turns awkward questions, practical obstacles, and good intentions into one clear next action.</p>
          </div>
          <ActionLink href="/workshop" variant="dark">Join the workshop</ActionLink>
        </div>
      </section>
      <div className="section-tight"><ContextCTA type="party" /></div>
    </SiteFrame>
  )
}
