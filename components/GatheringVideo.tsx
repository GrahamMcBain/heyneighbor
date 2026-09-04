import { gatheringClips } from '@/content/community'

type Props = { clip: typeof gatheringClips[number]; id: string; featured?: boolean }

export default function GatheringVideo({ clip, id, featured = false }: Props) {
  return <figure className={`gathering-video${featured ? ' gathering-video-featured' : ''}`}>
    <video controls playsInline muted preload="none" poster={clip.poster} width={clip.width} height={clip.height} aria-label={clip.title} aria-describedby={`${id}-caption`}>
      <source src={clip.src} type="video/mp4" />
      Your browser does not support this video. <a href={clip.src}>Open the clip</a>.
    </video>
    <figcaption id={`${id}-caption`}>
      <strong>{clip.title}</strong>
      <span>{clip.description}</span>
      <span className="clip-detail">{clip.duration} · Silent clip · Press play to watch</span>
      <a className="inline-link clip-direct-link" href={clip.src}>Open video directly</a>
    </figcaption>
  </figure>
}
