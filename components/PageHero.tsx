import ActionLink from './ActionLink'

type Props = {
  eyebrow: string
  title: string
  description: string
  cta?: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export default function PageHero({ eyebrow, title, description, cta, secondary }: Props) {
  return (
    <section className="page-hero">
      <div className="site-container page-hero-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-copy">{description}</p>
        {(cta || secondary) && (
          <div className="button-row">
            {cta && <ActionLink href={cta.href}>{cta.label}</ActionLink>}
            {secondary && <ActionLink href={secondary.href} variant="secondary">{secondary.label}</ActionLink>}
          </div>
        )}
      </div>
    </section>
  )
}
