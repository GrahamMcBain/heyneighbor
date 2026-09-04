import EmailDraftForm from './EmailDraftForm'

export default function PartnerForm({ recipient }: { recipient?: string }) {
  return <EmailDraftForm recipient={recipient} subject="Hey Neighbor partnership inquiry" label="Draft partnership email">
    <div className="form-field"><label htmlFor="partner-name">Name (required)</label><input id="partner-name" name="Name" autoComplete="name" maxLength={100} required /></div>
    <div className="form-field"><label htmlFor="partner-email">Work email (required)</label><input id="partner-email" name="Work email" type="email" autoComplete="email" maxLength={254} required /></div>
    <div className="form-field"><label htmlFor="partner-organization">Organization (required)</label><input id="partner-organization" name="Organization" autoComplete="organization" maxLength={160} required /></div>
    <div className="form-field"><label htmlFor="partner-type">Partnership type (required)</label><select id="partner-type" name="Partnership type" defaultValue="" required><option value="" disabled>Select a partnership type</option><option>Sponsorship</option><option>Property community pilot</option><option>Both / let&apos;s explore</option></select></div>
    <div className="form-field form-field-full"><label htmlFor="partner-description">Tell us about your proposed support or property (required)</label><textarea id="partner-description" name="Proposed support or property" maxLength={2000} aria-describedby="partner-description-note" required /><p id="partner-description-note" className="form-note">A short overview is enough. Please leave out residents&apos; names, addresses, and other private details.</p></div>
    <div className="form-field"><label htmlFor="partner-location">City or region (optional)</label><input id="partner-location" name="City or region" maxLength={160} /></div>
    <div className="form-field"><label htmlFor="partner-budget">Budget range (optional)</label><input id="partner-budget" name="Budget range" maxLength={100} /></div>
  </EmailDraftForm>
}
