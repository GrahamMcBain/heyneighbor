import React from 'react'
import { cn } from '@/lib/utils'

interface CalloutCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glow' | 'accent'
}

const CalloutCard: React.FC<CalloutCardProps> = ({ 
  children, 
  className,
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-white border border-hn-grey/30 shadow-xl shadow-hn-blue/5',
    glow: 'bg-white border border-hn-apricot/30 shadow-xl shadow-hn-apricot/20 glow',
    accent: 'bg-gradient-to-br from-hn-apricot/20 to-hn-parchment border border-hn-apricot/30'
  }

  return (
    <div className={cn(
      'rounded-2xl p-8 card-hover',
      variants[variant],
      className
    )}>
      {children}
    </div>
  )
}

export default CalloutCard
