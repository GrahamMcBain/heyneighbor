import EmailDraftForm from './EmailDraftForm'

export default function StoryForm({ recipient }: { recipient?: string }) {
  return (
    <EmailDraftForm recipient={recipient} subject="My Hey Neighbor story" label="Draft story email">
      <div className="form-field"><label htmlFor="name">Your name (required)</label><input id="name" name="Name" autoComplete="name" maxLength={100} required /></div>
      <div className="form-field"><label htmlFor="location">City, state, or country (optional)</label><input id="location" name="Location" maxLength={160} /><p className="form-note">Please leave out home addresses and neighbors&apos; private details.</p></div>
      <div className="form-field form-field-full"><label htmlFor="before">What was the neighborhood like before? (required)</label><textarea id="before" name="Before" maxLength={1500} required /></div>
      <div className="form-field form-field-full"><label htmlFor="action">What did you try first? (required)</label><textarea id="action" name="First action" maxLength={1500} required /></div>
      <div className="form-field"><label htmlFor="attendance">Attendance, if known (optional)</label><input id="attendance" name="Attendance" maxLength={100} /></div>
      <div className="form-field"><label htmlFor="surprise">What surprised you? (optional)</label><input id="surprise" name="Surprise" maxLength={500} /></div>
      <div className="form-field form-field-full"><label htmlFor="after">What happened afterward? (required)</label><textarea id="after" name="What happened next" maxLength={1500} required /></div>
      <div className="form-field form-field-full"><label htmlFor="advice">What would you tell another neighbor? (optional)</label><textarea id="advice" name="Advice" maxLength={1000} /></div>
      <div className="form-field form-field-full"><label htmlFor="contact-permission">May we reply to your email to discuss your story? (required)</label><select id="contact-permission" name="Permission to follow up" required defaultValue=""><option value="" disabled>Choose one</option><option value="Yes, you may contact me about this story.">Yes, you may contact me about this story</option><option value="No, please do not follow up.">No, please do not follow up</option></select></div>
      <div className="form-field form-field-full"><label htmlFor="publish-permission">May we publish your written story? (required)</label><select id="publish-permission" name="Written story publication permission" required defaultValue=""><option value="" disabled>Choose one</option><option value="No publication permission. Please keep my story private.">Keep my story private</option><option value="Ask for my approval of the final text and name credit before publication.">Ask me to approve the final text and name credit first</option></select><p className="form-note">Sending a story does not give permission to publish it. These choices do not subscribe you to marketing or authorize media publication or sponsored reuse.</p></div>
      <div className="form-field form-field-full"><h3>Photos and video are optional</h3><p className="form-note">You can tell your whole story in words. Only attach media in your email if you have permission to share it from the rights holder and each recognizable participant, including appropriate parent or guardian permission for children. Your own consent does not cover other people. Publishing media or using it in sponsored content requires separate, specific permission.</p></div>
    </EmailDraftForm>
  )
}
