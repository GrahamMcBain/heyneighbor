# September 4, 2026 website update

Implemented in the existing Next.js site. No deployment or production changes have been made.

## Changes

- Homepage leads with the free online block party kit and existing 10-step guide. Direct guide and PDF access remains available without signup.
- Added `/partners`, navigation/footer links, and a homepage invitation. Sponsorships and property pilots are presented as opportunities to discuss, with proposed participation, disclosure, and privacy commitments.
- Removed editorial instructions from the homepage, stories gallery, and party kit. The PDF is accurately described as the 10-step guide.
- Connected the workshop to the owner-supplied `https://luma.com/heyneighbor` calendar. Visitors select an event and complete registration on Luma; no date or reservation is promised by this site.
- Added labeled email-draft forms with required-field validation, accurate draft status, and a copyable fallback. Drafts are not sent or persisted by the website and are not counted as completed inquiries or registrations.
- Story follow-up and publication choices are separate. Sending a story grants no publication permission. Media is optional and requires appropriate permissions, including for recognizable participants and children. Sponsored reuse requires separate permission.
- Added keyboard focus styles, a skip link, reduced-motion support, responsive partner layouts, and improved button/text contrast.
- Added `/partners` to the sitemap and corrected the default metadata/sitemap/robots domain to the supplied `www.heyneighborlabs.com` address. Existing environment overrides remain supported.
- Updated the obsolete `next lint` command and ESLint config for the installed Next.js 16 / ESLint 9 versions. Three existing JSX apostrophes were escaped to make the full app lint pass.
- Featured a real seven-second gathering clip in the homepage hero. Added two click-to-play silent clips, a curated seven-photo gallery, three adapted invitation examples, and the supplied YouTube/Instagram links. No third-party video embeds or automatic playback were added.
- Added a first-gathering account based on the supplied host message: about 20 people attended and almost everyone wanted to meet again. These are explicitly host-reported details, paired with the matching courtyard photo. The private messaging screenshot is not published.
- Web photos preserve the full supplied image and omit EXIF metadata. Video copies are H.264 MP4 with sound removed and fast-start playback; the original Downloads files are untouched. Source provenance is recorded in `content/MEDIA_SOURCES.md`.
- Reviewed the owner-supplied “HeyNeighbor Slide Deck” (22 slides, including a blank final slide). Added a free viewer link to the guide and resources; Google Drive reports anyone-with-link reader access. Retained the existing ten steps and URLs while incorporating the deck’s practical prompts: walk the boundary, find a first ally, use neighbors’ preferred platform, celebrate while planning, choose enjoyable traditions, and offer specific small jobs. Reinforced the no-hidden-agenda principle and consent-aware story capture. Named story captions were not expanded into unsupported case studies. The source deck was not modified and the existing PDF was not replaced.

## Confirmed details and remaining scope

1. The supplied public inbox is `heyneighborhub@gmail.com`, explicitly confirmed for partnerships. It is the default for partnership and story drafts and workshop questions. Separate destinations can be configured with `NEXT_PUBLIC_PARTNER_EMAIL`, `NEXT_PUBLIC_STORY_EMAIL`, and `NEXT_PUBLIC_WORKSHOP_EMAIL`; explicit empty values disable drafting.
2. The event destination is `https://luma.com/heyneighbor`, as corrected by the owner. Current dates, time zones, and availability remain on Luma. `NEXT_PUBLIC_WORKSHOP_URL` and `NEXT_PUBLIC_WORKSHOP_SCHEDULE` remain available as overrides.
3. The owner supplied the new media as flyers and social proof for this update. Adapted flyer text omits private addresses, phone numbers, emails, and group QR codes. Social posts use only the exact supplied destinations, with Instagram share parameters removed; no profile URLs or post claims were guessed.
4. Commercial services and partnership commitments remain framed as exploratory opportunities and proposed terms. The owner has not confirmed established packages, clients, delivery capacity, or outcomes.

Public contact configuration is read at build time. Rebuild after changing it. `.env.example` documents the settings; local secrets and hosting configuration were not changed.

## Validation

- Production build and TypeScript checks passed using the bundled Node 24 runtime. The shell default Node 20.5 is below this project's required Node 20.9 minimum.
- Full app/components/content/lib ESLint check passed.
- Browser checks passed at desktop and 375px mobile widths across 10 main pages, plus 21 internal links/downloads: no horizontal overflow, labeled fields, required and whitespace validation, correct email draft contents, separate story permission choices, no browser storage of form details, honest workshop wording, skip-link and mobile navigation keyboard behavior, reduced motion, and no browser exceptions.
- After the owner supplied contact details and media, the final production build passed focused browser checks across six updated pages at 375px, 768px, and 1440px. Verified 13 rendered asset URLs, both videos playing with controls and no autoplay, MP4 byte-range delivery, EXIF removal, the confirmed partner draft recipient, the Luma calendar links, all three social post links, host-report attribution, and absence of browser exceptions. The final homepage, story, and invitation layouts were visually inspected.
- Initial form tests used reserved `example.invalid` destinations. Follow-up checks validate the real confirmed partnership recipient without sending email. Test input values are not saved in the source or production configuration.
- Existing regional CMS requests report connection refused locally during the otherwise successful build. CMS content and actual recipient delivery could not be verified. No new analytics service was added.
- `git diff --check` passed. All changes are available as a local reviewable diff.
- Deck follow-up: build, TypeScript, lint, and browser checks passed for seven pages at 375px, 768px, and 1440px, all ten guide routes, the three deck links, and story-consent wording. Guide and resource layouts were visually checked; the source presentation remains unchanged.
