'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import Button from './Button'

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-hn-blue/5' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="group">
            <Image 
              src="/brand/HN-dark-logo.svg" 
              alt="HeyNeighbor" 
              width={160} 
              height={40}
              className="transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center">
            <Link href="/start">
              <Button size="sm">
                Start Here
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-hn-blue hover:text-hn-cyan transition-colors p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-6 mb-4 border border-hn-grey/30">
            <Link 
              href="/start" 
              onClick={() => setIsOpen(false)}
            >
              <Button className="w-full">
                Start Here
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
