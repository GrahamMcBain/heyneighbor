'use client'

import React, { useState } from 'react'
import Button from './Button'
import SignupModal from './SignupModal'

interface CTAButtonProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const CTAButton: React.FC<CTAButtonProps> = ({ size = 'lg', className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button size={size} className={className} onClick={() => setIsModalOpen(true)}>
        Start Here
      </Button>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default CTAButton
