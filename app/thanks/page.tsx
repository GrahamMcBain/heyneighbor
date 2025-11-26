import React from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import Button from '@/components/Button'

export const metadata = {
  title: 'Thanks! - HeyNeighbor',
  description: 'Your 10-step guide is on its way to your inbox.',
}

export default function ThanksPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      
      <Section className="py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-hn-blue mb-6">
            You're In!
          </h1>
          <p className="text-lg md:text-xl text-hn-blue/80 leading-relaxed mb-12">
            Your 10-step guide is on its way to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/docs/HeyNeighbor-10-Step.pdf" download>
              <Button size="lg" className="w-full sm:w-auto">
                Download the PDF
              </Button>
            </a>
            <Link href="/start">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Start a Chapter
              </Button>
            </Link>
            <a 
              href={process.env.NEXT_PUBLIC_MEETING_URL || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                Join the Weekly Call
              </Button>
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
