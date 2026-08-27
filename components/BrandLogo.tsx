import Image from 'next/image'
import Link from 'next/link'

export default function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Hey Neighbor home" className="brand-logo">
      <Image src="/brand/figma/house-icon.png" alt="" width={38} height={48} className="brand-logo-house" priority />
      <span className={light ? 'brand-logo-copy brand-logo-copy-light' : 'brand-logo-copy'}>
        <span>HEY</span>
        <span>NEIGHBOR</span>
      </span>
    </Link>
  )
}
