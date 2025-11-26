import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import Button from '@/components/Button'

export const metadata = {
  title: 'Start a Chapter - HeyNeighbor',
  description: 'Bring people together in your neighborhood with a simple weekly rhythm and zero pressure.',
}

export default function StartPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      
      <Section className="py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-hn-blue mb-6">
            Start a HeyNeighbor Chapter
          </h1>
          <p className="text-lg md:text-xl text-hn-blue/80 leading-relaxed mb-12">
            Bring people together in your neighborhood with a simple weekly rhythm and zero pressure.
          </p>
          
          <div className="bg-hn-parchment rounded-lg p-8 mb-12">
            <h2 className="font-poppins font-semibold text-2xl text-hn-blue mb-6">
              What you get:
            </h2>
            <ul className="text-left space-y-4 max-w-xl mx-auto">
              <li className="flex items-start">
                <span className="text-hn-cyan mr-3">•</span>
                <span className="text-hn-blue">The 10-step HeyNeighbor playbook</span>
              </li>
              <li className="flex items-start">
                <span className="text-hn-cyan mr-3">•</span>
                <span className="text-hn-blue">The Chapter Lead Starter Kit</span>
              </li>
              <li className="flex items-start">
                <span className="text-hn-cyan mr-3">•</span>
                <span className="text-hn-blue">Access to the private WhatsApp group for leads</span>
              </li>
              <li className="flex items-start">
                <span className="text-hn-cyan mr-3">•</span>
                <span className="text-hn-blue">Weekly support calls</span>
              </li>
              <li className="flex items-start">
                <span className="text-hn-cyan mr-3">•</span>
                <span className="text-hn-blue">Templates, scripts, and event ideas</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href={process.env.NEXT_PUBLIC_CHAPTER_START_URL || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Apply to Start a Chapter
              </Button>
            </a>
            <a 
              href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Join the Leads WhatsApp Group
              </Button>
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
