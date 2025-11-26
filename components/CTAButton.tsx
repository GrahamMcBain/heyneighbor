'use client'

import React from 'react'
import Button from './Button'

declare global {
  interface Window {
    DojoMenu?: {
      open: () => void
    }
  }
}

interface CTAButtonProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const CTAButton: React.FC<CTAButtonProps> = ({ size = 'lg', className }) => {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.DojoMenu) {
      window.DojoMenu.open()
    }
  }

  return (
    <Button size={size} className={className} onClick={handleClick}>
      Start Here
    </Button>
  )
}

export default CTAButton
