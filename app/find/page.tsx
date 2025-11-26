import React from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import Button from '@/components/Button'

export const metadata = {
  title: 'Find a Chapter - HeyNeighbor',
  description: 'Find a HeyNeighbor chapter in your area or start your own.',
}

export default function FindPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      
      <Section className="py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-hn-blue mb-6">
            Find a HeyNeighbor Chapter Near You
          </h1>
          <p className="text-lg md:text-xl text-hn-blue/80 leading-relaxed mb-12">
            We're adding new chapters every week. Browse the full directory below or start your own.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a 
              href={process.env.NEXT_PUBLIC_FIND_URL || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Open the Chapter Directory
              </Button>
            </a>
            <Link href="/start">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Start Your Own Chapter
              </Button>
            </Link>
          </div>
          
          {/* Placeholder section for future chapter listings */}
          <div className="bg-hn-parchment rounded-lg p-12">
            <h2 className="font-poppins font-semibold text-2xl text-hn-blue mb-4">
              Coming Soon
            </h2>
            <p className="text-hn-blue/80">
              We're building an interactive map to help you find chapters in your area. 
              In the meantime, check out our directory or join the weekly call to connect with other chapter leads.
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
