import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'dark' | 'text'
  className?: string
}

export default function ActionLink({ href, children, variant = 'primary', className }: Props) {
  return (
    <Link href={href} className={cn('action-link', `action-link-${variant}`, className)}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={18} strokeWidth={2.5} />
    </Link>
  )
}
