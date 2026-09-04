import type { Metadata } from 'next'
import Image from 'next/image'
import SiteFrame from '@/components/SiteFrame'
import PageHero from '@/components/PageHero'
import ContextCTA from '@/components/ContextCTA'
import ActionLink from '@/components/ActionLink'
import GatheringVideo from '@/components/GatheringVideo'
import InvitationExamples from '@/components/InvitationExamples'
import { communityPhotos, gatheringClips, socialClips } from '@/content/community'

export const metadata: Metadata = { title: 'Real Neighborhood Stories', description: 'Real photographs and first-party stories from ordinary people bringing neighbors together.', alternates: { canonical: '/stories' } }

export default function StoriesPage() {
  return <SiteFrame>
    <PageHero eyebrow="Neighbors together" title="Every gathering starts with an invitation." description="A glimpse of neighbors making time for one another. Have a story of your own? Tell us about your first invitation and what happened next." cta={{ label: 'Share your story', href: '/share' }} secondary={{ label: 'Get the free block party kit', href: '/resources/first-block-party-kit' }} />
    <section className="section" id="first-gathering"><div className="site-container first-story">
      <figure className="first-story-photo"><Image src="/photos/community/first-courtyard-gathering.webp" alt="A small group gathered outside between apartment buildings, photographed from above" width={1200} height={1600} sizes="(max-width: 760px) 100vw, 45vw" /><figcaption>A photo shared alongside a host&apos;s first-gathering update.</figcaption></figure>
      <div><p className="eyebrow">A first neighborhood hang</p><h2>They wanted to meet again.</h2><p>In an update shared with Hey Neighbor, a host described their very first neighborhood gathering.</p><dl className="story-arc"><div><dt>The starting point</dt><dd>Taking the step to organize a first neighborhood hang.</dd></div><div><dt>The first action</dt><dd>Bringing neighbors together outside.</dd></div><div><dt>What the host reported</dt><dd>About 20 people showed up, and almost everyone said they would love to meet again soon.</dd></div></dl><p>Want to try a first gathering where you live? The free kit helps you choose a place, write an invitation, and plan a simple follow-up.</p><ActionLink href="/resources/first-block-party-kit">Plan your first gathering</ActionLink></div>
    </div></section>
    <section className="section steps-wrap" id="gathering-clips"><div className="site-container"><div className="section-header"><p className="eyebrow">A glimpse of gathering</p><h2>This is what showing up can look like.</h2><p>A table on the lawn, a few chairs, and people making time for one another. Press play for two short moments shared with Hey Neighbor.</p></div><div className="gathering-clips">{gatheringClips.map((clip, index) => <GatheringVideo key={clip.src} clip={clip} id={`story-clip-${index}`} />)}</div></div></section>
    <section className="section"><div className="site-container">
      <div className="section-header"><p className="eyebrow">From the neighborhoods</p><h2>Making room for one another.</h2><p>Gather inspiration for your own first hello. You can start small: choose a place, invite the people nearby, and spend a little time together.</p></div>
      <div className="story-photo-grid">{communityPhotos.map(photo => <figure key={photo.src}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) 100vw, 33vw" /><figcaption>{photo.caption}</figcaption></figure>)}</div>
    </div></section>
    <InvitationExamples showKitLink />
    <section className="section" id="social-clips"><div className="site-container"><div className="section-header"><p className="eyebrow">Keep watching</p><h2>More from Hey Neighbor.</h2><p>Watch the short videos on YouTube and Instagram, then bring an idea back to your own neighborhood.</p></div><div className="social-clip-grid">{socialClips.map(clip => <article className="content-card" key={clip.href}><p className="eyebrow">{clip.platform}</p><h3>{clip.title}</h3><ActionLink href={clip.href} variant="text">Watch on {clip.platform}</ActionLink></article>)}</div></div></section>
    <ContextCTA type="story" />
  </SiteFrame>
}
