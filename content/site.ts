export type GuideStep = {
  number: number
  title: string
  slug: string
  phase: 1 | 2
  summary: string
  principle: string
  actions: string[]
  resources: string[]
}

export const guideSteps: GuideStep[] = [
  {
    number: 1,
    title: 'Define Your Neighborhood',
    slug: 'define-your-neighborhood',
    phase: 1,
    summary: 'Choose a human-sized area so you know exactly who you are trying to know.',
    principle: 'A neighborhood community needs a boundary. Smaller is fine; roughly 200 homes is the working maximum.',
    actions: ['Use walkability and natural boundaries', 'Walk the area and notice where people already gather', 'Write down the homes you will invite'],
    resources: ['Neighborhood boundary worksheet', 'Invitation-count guide'],
  },
  {
    number: 2,
    title: 'Be Friendly & Vulnerable',
    slug: 'be-friendly-and-vulnerable',
    phase: 1,
    summary: 'Break the normal social script by saying plainly why you want to know the people around you.',
    principle: 'Friendly is good. Friendly plus honest motivation gives other people permission to reciprocate.',
    actions: ['Introduce yourself without an agenda', 'Ask about a garden, a pet, or how long someone has lived here—and remember the answer', 'Name your real motivation in conversation and on your invitation'],
    resources: ['Vulnerability statement builder', 'Neighbor conversation starters'],
  },
  {
    number: 3,
    title: 'Host Your First Block Party',
    slug: 'host-your-first-block-party',
    phase: 1,
    summary: 'Create a low-stakes, neutral-territory gathering and invite people face to face.',
    principle: 'Keep it simple enough to repeat, knock on doors, and know the date of gathering two before gathering one begins.',
    actions: ['Choose neutral, walkable territory', 'Knock on doors with a flyer', 'Announce the next date while everyone is together'],
    resources: ['First Block Party Kit', 'Door-knocking script', 'Block-party checklist'],
  },
  {
    number: 4,
    title: 'Make One-on-One Connections',
    slug: 'make-one-on-one-connections',
    phase: 1,
    summary: 'Turn a crowd into relationships by connecting between gatherings and introducing neighbors to one another.',
    principle: 'Success is not the organizer knowing everyone. It is everybody beginning to know everybody else.',
    actions: ['Notice a potential first ally: someone who stays to chat, asks questions, or helps clean up', 'Invite one neighbor for a walk, coffee, or another small activity', 'Make thoughtful introductions around shared interests'],
    resources: ['Easy neighbor hangout ideas', 'Neighbor introduction prompts'],
  },
  {
    number: 5,
    title: 'Create a Virtual Hub',
    slug: 'create-a-neighborhood-group',
    phase: 1,
    summary: 'Give the neighborhood one simple communication channel without confusing the tool for the community.',
    principle: 'The virtual hub supports real-world relationships and prevents one person from becoming the communications bottleneck.',
    actions: ['Ask which communication tool your neighbors already use', 'Set three clear rules', 'Use the group to make in-person connection easier'],
    resources: ['Copy-and-paste group rules', 'Facebook vs. WhatsApp comparison'],
  },
  {
    number: 6,
    title: 'Host an Annual Planning Party',
    slug: 'annual-neighborhood-planning-party',
    phase: 2,
    summary: 'Turn “you know what we should do?” into shared ideas with clear owners and dates.',
    principle: 'Phase Two converts your project into our neighborhood.',
    actions: ['Bring snacks and big paper; make it a celebration, not a business meeting', 'Let neighbors claim ideas they are excited to host', 'Publish a shared annual calendar'],
    resources: ['Planning-party agenda', 'Annual neighborhood calendar'],
  },
  {
    number: 7,
    title: 'Create Traditions & Rituals',
    slug: 'neighborhood-traditions',
    phase: 2,
    summary: 'Repeat what people love until gatherings become part of the neighborhood identity.',
    principle: 'Traditions remove planning friction and create the feeling that “of course we do this together.”',
    actions: ['Choose something you genuinely enjoy hosting', 'Agree on a predictable monthly or seasonal rhythm', 'Give the tradition a simple name'],
    resources: ['Seasonal tradition ideas', 'Repeatable-event planner'],
  },
  {
    number: 8,
    title: 'Give People Micro-Roles',
    slug: 'neighborhood-micro-roles',
    phase: 2,
    summary: 'Offer small, useful ways to contribute that do not require hosting a whole event.',
    principle: 'Belonging increases when people are needed.',
    actions: ['Offer specific jobs: bring chairs, deliver flyers, or greet arrivals', 'Invite people by interest and strength', 'Keep roles small enough to say yes to'],
    resources: ['Neighborhood Roles Menu', 'Event ownership sheet'],
  },
  {
    number: 9,
    title: 'Welcome New Neighbors',
    slug: 'welcome-new-neighbors',
    phase: 2,
    summary: 'Make joining the community an explicit, repeatable process instead of leaving it to chance.',
    principle: 'A durable neighborhood has a front door for the people who arrive next.',
    actions: ['Choose a welcome person', 'Share the group and upcoming calendar', 'Introduce newcomers to nearby neighbors'],
    resources: ['New Neighbor Welcome Kit', 'Welcome-letter template'],
  },
  {
    number: 10,
    title: 'Share Your Story',
    slug: 'share-your-story',
    phase: 2,
    summary: 'Show the next ordinary person that this can work where they live too.',
    principle: 'A real story closes the loop: one neighborhood becomes proof and permission for another.',
    actions: ['Describe what you hoped for and what made you nervous before starting', 'Record the first action and what actually happened', 'Share practical advice; include photos or video only with permission'],
    resources: ['Neighborhood story prompts', 'Photo and publishing checklist'],
  },
]

export const teachingSlidesUrl = 'https://docs.google.com/presentation/d/1ZVVa5aqDG12LWO4vGnZL3l0oRywGYGITejt7cbJC68o/preview'

export const resourceCards = [
  { title: 'Printable 10-Step Guide', description: 'Keep the complete method nearby and work through it one action at a time.', href: '/docs/HeyNeighbor-10-Step.pdf', label: 'Download the PDF', available: true },
  { title: '10-Step Teaching Slides', description: 'Follow Graham’s presentation from the first invitation to shared neighborhood ownership. Free to view in Google Slides.', href: teachingSlidesUrl, label: 'View the slide deck', available: true },
  { title: 'First Block Party Kit', description: 'A practical plan, invitation language, checklist, and follow-up rhythm.', href: '/resources/first-block-party-kit', label: 'Open the free kit', available: true },
  { title: 'Door-Knocking Script', description: 'What to say, why it works, and how to leave the invitation without pressure.', href: '/resources/first-block-party-kit#door-script', label: 'Use the script', available: true },
  { title: 'Neighborhood Group Rules', description: 'Three rules that keep a digital group useful and connected to real life.', href: '/guide/create-a-neighborhood-group', label: 'Copy the rules', available: true },
]

export const ideaCategories = [
  { title: 'First gatherings', items: ['Popsicle party', 'Driveway drinks', 'Front-yard coffee', 'Park meetup'], tone: 'lime' },
  { title: 'Food competitions', items: ['Chili cook-off', 'Pie bake-off', 'Salsa contest', 'Mocktail competition'], tone: 'yellow' },
  { title: 'Families', items: ['Bike parade', 'Chalk contest', 'Movie night', 'Neighborhood field day'], tone: 'pink' },
  { title: 'Traditions', items: ['Halloween together', 'Summer games', 'Annual picnic', 'Holiday gathering'], tone: 'green' },
]

export const navItems = [
  { label: 'Start Here', href: '/start' },
  { label: '10-Step Guide', href: '/guide' },
  { label: 'Party Ideas', href: '/ideas' },
  { label: 'Free Resources', href: '/resources' },
  { label: 'Stories', href: '/stories' },
  { label: 'Workshop', href: '/workshop' },
  { label: 'Partner with us', href: '/partners' },
]
