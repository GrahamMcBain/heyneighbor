import ActionLink from './ActionLink'

const variants = {
  start: { eyebrow: 'Ready to know your neighbors?', title: 'Start with one human-sized action.', body: 'The guide begins by helping you define who your neighborhood actually is.', label: 'Start Step One', href: '/guide/define-your-neighborhood' },
  party: { eyebrow: 'Make it real', title: 'Host your first neighborhood gathering.', body: 'Use the practical kit to choose a place, invite people, and keep momentum going.', label: 'Get the First Block Party Kit', href: '/resources/first-block-party-kit' },
  workshop: { eyebrow: 'Want help doing this?', title: 'Join the live Friday workshop.', body: 'Bring your questions and leave with a clear next action for your neighborhood.', label: 'See the Workshop', href: '/workshop' },
  story: { eyebrow: 'Already tried this?', title: 'Your story can help the next neighbor begin.', body: 'Tell us what you did, what surprised you, and what happened afterward.', label: 'Share Your Story', href: '/share' },
}

export default function ContextCTA({ type = 'start' }: { type?: keyof typeof variants }) {
  const content = variants[type]
  return (
    <section className="context-cta">
      <div>
        <p className="eyebrow eyebrow-light">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p>{content.body}</p>
      </div>
      <ActionLink href={content.href} variant="dark">{content.label}</ActionLink>
    </section>
  )
}
