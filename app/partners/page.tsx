import type { Metadata } from 'next'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ActionLink from '@/components/ActionLink'
import PartnerForm from '@/components/PartnerForm'
import { partnerEmail } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Partner With Us',
  description: 'Explore sponsorships and property community pilots that support free resources and real-world neighborhood gatherings.',
  alternates: { canonical: '/partners' },
}

export default function PartnersPage() {
  return <SiteFrame>
    <PageHero eyebrow="Partner with us" title="Help more neighbors find each other." description="We are seeking sponsors and property partners to support free resources and real-world gatherings. Let’s explore what we could make possible together." cta={{ label: 'Discuss a sponsorship', href: '#sponsorship' }} secondary={{ label: 'Discuss a community pilot', href: '#community-pilot' }} />
    <section className="section"><div className="site-container">
      <div className="section-header"><p className="eyebrow">The knowledge stays free</p><h2>Support the work that brings people together.</h2><p>Anyone can read, use, and share the practical method. Partnership funding could help it reach more neighbors and support the planning, facilitation, and delivery of local gatherings.</p></div>
      <div className="kit-grid partner-options">
        <article className="kit-panel" id="sponsorship">
          <p className="eyebrow">For sponsors</p><h2>Make the next invitation possible.</h2>
          <p>We would love to discuss support for:</p>
          <ul className="check-list"><li>Creating and sharing free guides and practical resources</li><li>A clearly disclosed series of real neighborhood stories</li><li>Accessible gatherings with simple supplies and host support</li></ul>
          <p>We can agree on recognition suited to the work, such as a named acknowledgment on a resource or a sponsor credit on a story. Scope, funding, and recognition would be agreed together.</p>
          <ActionLink href="#partner-inquiry" variant="secondary">Discuss a sponsorship</ActionLink>
        </article>
        <article className="kit-panel" id="community-pilot">
          <p className="eyebrow">For property owners and operators</p><h2>Help shared spaces become meeting places.</h2>
          <p>For multifamily and mixed-use properties, we could design a scoped community pilot around residents and the surrounding neighborhood.</p>
          <ul className="check-list"><li>Understand the property and residents&apos; needs</li><li>Support volunteer hosts and plan welcoming gatherings</li><li>Facilitate agreed activities and review participation and voluntary feedback</li></ul>
          <p>The property team would provide a point of contact, suitable shared space, permissions, and an agreed delivery budget. Together, we would set the scope, responsibilities, and measures before starting.</p>
          <p>A commercial fee would cover agreed implementation work. The method itself remains free and public.</p>
          <ActionLink href="#partner-inquiry" variant="secondary">Discuss a community pilot</ActionLink>
        </article>
      </div>
    </div></section>
    <section className="section steps-wrap"><div className="site-container">
      <div className="section-header"><p className="eyebrow">A foundation for partnership</p><h2>Start with the neighbors.</h2><p>These are the commitments we propose building into each partnership:</p></div>
      <ul className="partnership-principles">
        <li><h3>Free access and clear funding</h3><p>Keep practical information free and identify sponsored content and who funds an activity. No purchases required to take part.</p></li>
        <li><h3>Participation is a choice</h3><p>Keep gatherings independent of filming and marketing sign-ups. Residents help shape their gatherings and shared spaces.</p></li>
        <li><h3>Privacy comes first</h3><p>Do not sell or disclose resident contact lists, home addresses, or private neighborhood discussions to partners. Agree on aggregate participation measures and voluntary feedback without identifying residents in reports or analytics.</p></li>
      </ul>
    </div></section>
    <section className="section" id="partner-inquiry"><div className="site-container guide-layout">
      <div><div className="section-header"><p className="eyebrow">Let&apos;s talk</p><h2>What could we do together?</h2><p>Tell us a little about your organization and what you have in mind. This starts a conversation about fit and scope.</p></div><PartnerForm recipient={partnerEmail} /></div>
      <aside className="side-card"><h3>A place to begin</h3><p>These are opportunities to discuss. Scope, timing, fees, and any recognition would be agreed before work begins.</p><p>Planning a gathering for your own neighbors?</p><ActionLink href="/resources/first-block-party-kit" variant="dark">Get the free kit</ActionLink></aside>
    </div></section>
  </SiteFrame>
}
