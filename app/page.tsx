import Image from 'next/image'
import Link from 'next/link'
import SiteFrame from '@/components/SiteFrame'
import ActionLink from '@/components/ActionLink'
import ContextCTA from '@/components/ContextCTA'
import { guideSteps, resourceCards } from '@/content/site'
import { communityPhotos, gatheringClips } from '@/content/community'
import GatheringVideo from '@/components/GatheringVideo'

const photos = communityPhotos.slice(0, 3)

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Hey Neighbor',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.heyneighborlabs.com',
    description: 'Free, practical resources for meeting your neighbors and building community.',
  }

  return (
    <SiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <section className="hero">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">One neighbor can start something real</p>
            <h1>Hey Neighbor</h1>
            <p className="hero-headline">Meet your neighbors.<br />Build a community.</p>
            <p>A free, practical guide to turning nearby strangers into people you know. Start with one invitation.</p>
            <div className="button-row">
              <ActionLink href="/resources/first-block-party-kit">Get the free block party kit</ActionLink>
              <ActionLink href="/guide" variant="secondary">Explore the 10-step guide</ActionLink>
            </div>
            <p className="hero-access-note">Free to read, use, and download. No email signup required.</p>
          </div>
          <div className="hero-gathering">
            <GatheringVideo clip={gatheringClips[0]} id="home-gathering" featured />
            <Link href="/stories" className="hero-story-link">More moments from the neighborhoods →</Link>
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
            {photos.map((photo) => (
              <div className="photo-card" key={photo.src}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) 60vw, 350px" /></div>
            ))}
          </div>
          <div className="proof-copy">
            <p className="eyebrow">Real streets. Real gatherings.</p>
            <h2>Ordinary places. A reason to gather.</h2>
            <p>Take a look at the moments neighbors have shared, from a table of food to a circle of chairs. Read one host&apos;s account of bringing people together for the first time.</p>
            <p>A front yard, a few chairs, something to share. Your first invitation can be that simple.</p>
            <ActionLink href="/stories" variant="secondary">See neighborhood stories</ActionLink>
          </div>
        </div>
      </section>

      <section className="section steps-wrap">
        <div className="site-container">
          <div className="section-header">
            <p className="eyebrow">Use something today</p>
            <h2>Free tools for your first invitation.</h2>
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
            <p className="eyebrow eyebrow-light">Free neighborhood workshop</p>
            <h2>Bring the thing that&apos;s keeping you stuck.</h2>
            <p>The free workshop turns awkward questions, practical obstacles, and good intentions into one clear next action.</p>
          </div>
          <ActionLink href="/workshop" variant="dark">Explore the free workshop</ActionLink>
        </div>
      </section>
      <section className="section">
        <div className="site-container partner-invitation">
          <div>
            <p className="eyebrow">Partner with us</p>
            <h2>Help more neighbors find each other.</h2>
            <p>We are seeking sponsors and property partners to support free resources and real-world gatherings.</p>
          </div>
          <ActionLink href="/partners" variant="secondary">Explore partnership opportunities</ActionLink>
        </div>
      </section>
      <div className="section-tight"><ContextCTA type="party" /></div>
    </SiteFrame>
  )
}
