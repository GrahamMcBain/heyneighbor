// Public contact supplied by the owner for this website update.
const confirmedEmail = 'heyneighborhub@gmail.com'

// Explicit empty/invalid environment overrides still disable email drafting.
function emailAddress(value: string | undefined) {
  const address = value?.trim()
  return address && /^[^\s@,;?&#]+@[^\s@,;?&#]+\.[^\s@,;?&#]+$/.test(address) ? address : undefined
}

export const partnerEmail = emailAddress(process.env.NEXT_PUBLIC_PARTNER_EMAIL ?? confirmedEmail)
export const storyEmail = emailAddress(process.env.NEXT_PUBLIC_STORY_EMAIL ?? confirmedEmail)
export const workshopEmail = emailAddress(process.env.NEXT_PUBLIC_WORKSHOP_EMAIL ?? confirmedEmail)
export const workshopRegistrationUrl = registrationUrl(process.env.NEXT_PUBLIC_WORKSHOP_URL ?? 'https://luma.com/heyneighbor')

export function registrationUrl(value: string | undefined) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password && url.hostname !== 'example.com' ? url.href : undefined
  } catch {
    return undefined
  }
}
