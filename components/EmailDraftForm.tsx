'use client'

import { FormEvent, ReactNode, useId, useState } from 'react'
import Link from 'next/link'

type Props = { recipient?: string; subject: string; label: string; children: ReactNode }

export default function EmailDraftForm({ recipient, subject, label, children }: Props) {
  const noteId = useId()
  const [draft, setDraft] = useState<{ body: string; href: string }>()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!recipient) return
    const form = event.currentTarget
    for (const control of Array.from(form.elements)) {
      if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
        control.setCustomValidity(control.required && !control.value.trim() ? 'Please fill out this field.' : '')
      }
    }
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const lines = Array.from(data.entries()).map(([key, value]) => `${key}: ${String(value).trim() || 'Not provided'}`)
    const body = [subject, '', ...lines].join('\n\n')
    const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setDraft({ body, href })
    window.location.href = href
  }

  if (!recipient) {
    return <div className="inquiry-unavailable"><h3>Email inquiries are temporarily unavailable.</h3><p>Please check back to get in touch. In the meantime, all of our guides and resources are free to use.</p><Link className="action-link action-link-secondary" href="/resources">Explore free resources →</Link></div>
  }

  return (
    <form className="story-form" onSubmit={submit} aria-describedby={noteId} onInput={(event) => {
      const control = event.target
      if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) control.setCustomValidity('')
      setDraft(undefined)
    }}>
      {children}
      <div className="form-field form-field-full">
        <p id={noteId} className="form-note">This opens a draft addressed to <a href={`mailto:${recipient}`}>{recipient}</a> in your email app. Review it and press send there. This website does not send or save your form details.</p>
        <button className="action-link action-link-primary" type="submit">{label} →</button>
        <div role="status" aria-live="polite">{draft && <p className="form-note">Your email app should open with a draft. Nothing has been sent by this website. Review and send the email to complete your inquiry.</p>}</div>
        {draft && <details className="email-fallback"><summary>Email app didn&apos;t open?</summary><p>Copy the text below into an email to <a href={`mailto:${recipient}`}>{recipient}</a>, or <a href={draft.href}>open the draft again</a>.</p><label htmlFor={`${noteId}-draft`}>Your email draft</label><textarea id={`${noteId}-draft`} value={draft.body} readOnly rows={10} /></details>}
      </div>
    </form>
  )
}
