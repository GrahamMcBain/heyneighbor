'use client'

import { FormEvent, useState } from 'react'

export default function StoryForm() {
  const [status, setStatus] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const lines = ['Hey Neighbor story submission', '', ...Array.from(data.entries()).map(([key, value]) => `${key}: ${String(value)}`)]
    const recipient = process.env.NEXT_PUBLIC_STORY_EMAIL || 'hello@heyneighbor.org'
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent('My Hey Neighbor story')}&body=${encodeURIComponent(lines.join('\n'))}`
    setStatus('Your email app should open with the story details. Add photos there before sending.')
  }
  return (
    <form className="story-form" onSubmit={submit}>
      <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="Name" required /></div>
      <div className="form-field"><label htmlFor="location">City, state, or country</label><input id="location" name="Location" required /></div>
      <div className="form-field form-field-full"><label htmlFor="before">What was the neighborhood like before?</label><textarea id="before" name="Before" required /></div>
      <div className="form-field form-field-full"><label htmlFor="action">What did you try first?</label><textarea id="action" name="First action" required /></div>
      <div className="form-field"><label htmlFor="attendance">Attendance, if known</label><input id="attendance" name="Attendance" /></div>
      <div className="form-field"><label htmlFor="surprise">What surprised you?</label><input id="surprise" name="Surprise" /></div>
      <div className="form-field form-field-full"><label htmlFor="after">What happened afterward?</label><textarea id="after" name="What happened next" required /></div>
      <div className="form-field form-field-full"><label htmlFor="advice">What would you tell another neighbor?</label><textarea id="advice" name="Advice" /></div>
      <div className="form-field form-field-full"><label htmlFor="permission">Publishing permission</label><select id="permission" name="Permission" required defaultValue=""><option value="" disabled>Choose one</option><option>I give Hey Neighbor permission to contact me about publishing this story.</option><option>Please contact me before using any part of this submission.</option></select></div>
      <div className="form-field form-field-full"><button className="action-link action-link-primary" type="submit">Prepare my story email →</button><p className="form-note">Photos and video can be attached in your email app. {status}</p></div>
    </form>
  )
}
