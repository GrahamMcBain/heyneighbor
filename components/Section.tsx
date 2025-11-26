import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'parchment' | 'blue' | 'gradient'
  id?: string
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className, 
  background = 'white',
  id
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    parchment: 'bg-hn-parchment',
    blue: 'bg-hn-blue text-hn-parchment',
    gradient: 'bg-gradient-to-br from-hn-blue via-hn-blue to-hn-cyan/20'
  }
  
  return (
    <section 
      id={id}
      className={cn(
        'py-20 md:py-28 px-4 relative overflow-hidden',
        backgroundClasses[background],
        className
      )}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  )
}

export default Section
