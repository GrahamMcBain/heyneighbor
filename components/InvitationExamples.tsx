import { invitationExamples } from '@/content/community'
import ActionLink from './ActionLink'

export default function InvitationExamples({ showKitLink = false }: { showKitLink?: boolean }) {
  return <section className="section steps-wrap" id="invitation-examples"><div className="site-container">
    <div className="section-header"><p className="eyebrow">From real neighbor invitations</p><h2>A few words can open the door.</h2><p>These examples are adapted from flyers neighbors shared with us. Borrow the idea, add your own place and time, and make it yours.</p></div>
    <div className="invitation-grid">{invitationExamples.map(example => <article className="invitation-card" key={example.title}><p className="eyebrow">You&apos;re invited</p><h3>{example.title}</h3><blockquote>{example.invitation}</blockquote><p>{example.idea}</p></article>)}</div>
    {showKitLink && <div className="button-row"><ActionLink href="/resources/first-block-party-kit#door-script" variant="secondary">Use the free invitation script</ActionLink></div>}
  </div></section>
}
