import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ActionLink from '@/components/ActionLink'
import ContextCTA from '@/components/ContextCTA'
import EmailDraftForm from '@/components/EmailDraftForm'
import { workshopRegistrationUrl, workshopEmail } from '@/lib/contact'

export const metadata: Metadata = { title: 'Free Neighborhood Workshop', description: 'Explore free, practical workshop support for meeting neighbors and planning a first neighborhood gathering.', alternates: { canonical: '/workshop' } }

export default function WorkshopPage() {
  const workshopUrl = workshopRegistrationUrl
  const schedule = process.env.NEXT_PUBLIC_WORKSHOP_SCHEDULE?.trim()
  return <SiteFrame>
    <PageHero eyebrow="Free neighborhood workshop" title="Bring the awkward question. Find your next action." description="Practical support for people who want to know their neighbors but are unsure how to begin—or how to keep momentum going." cta={{ label: workshopUrl ? 'Find a workshop on Luma' : 'Ask about a free workshop', href: workshopUrl || '#workshop-inquiry' }} />
    <section className="section" id="workshop-details"><div className="site-container guide-layout">
      <div className="article-copy"><p className="eyebrow">What we can work through</p><h2>Bring your neighborhood questions.</h2><ul className="action-list"><li>Choosing the right neighborhood boundary</li><li>Inviting people without feeling weird</li><li>Planning a simple first gathering</li><li>Handling “what if nobody comes?”</li><li>Getting other neighbors to take ownership</li></ul><p>Start with the free kit while you explore workshop options. It includes invitation language, a simple checklist, and ideas for keeping the connection going.</p><ActionLink href="/resources/first-block-party-kit" variant="secondary">Open the free kit</ActionLink></div>
      <aside className="side-card"><h3>Free workshop details</h3>{workshopUrl ? <><p>{schedule || 'Visit the Hey Neighbor calendar on Luma for current sessions. Choose an event to see its date, time zone, format, and registration details.'}</p><ActionLink href={workshopUrl} variant="dark">View the Luma calendar</ActionLink><p>Complete registration on the event page. Opening the calendar does not reserve a place.</p>{workshopEmail && <p>Questions? <a className="inline-link" href={`mailto:${workshopEmail}`}>Email Hey Neighbor</a>.</p>}</> : <><p>No workshop date is currently announced. Ask about future free sessions and tell us what you would like help with.</p><p>An inquiry is not a reservation.</p></>}</aside>
    </div></section>
    {!workshopUrl && <section className="section steps-wrap" id="workshop-inquiry"><div className="site-container guide-layout"><div><div className="section-header"><p className="eyebrow">Get in touch</p><h2>Ask about a free workshop.</h2><p>Send a one-time inquiry about future sessions. This does not subscribe you to marketing.</p></div><EmailDraftForm recipient={workshopEmail} subject="Free Hey Neighbor workshop inquiry" label="Draft workshop inquiry email"><div className="form-field form-field-full"><label htmlFor="workshop-name">Name (required)</label><input id="workshop-name" name="Name" autoComplete="name" maxLength={100} required /></div><div className="form-field form-field-full"><label htmlFor="workshop-question">What would you like help with? (optional)</label><textarea id="workshop-question" name="Workshop question" maxLength={2000} /></div><div className="form-field form-field-full"><label htmlFor="workshop-timezone">Time zone (optional)</label><input id="workshop-timezone" name="Time zone" maxLength={100} /></div></EmailDraftForm></div></div></section>}
    <ContextCTA type="start" />
  </SiteFrame>
}
