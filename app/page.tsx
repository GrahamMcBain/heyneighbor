import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import Button from '@/components/Button'
import CalloutCard from '@/components/CalloutCard'
import PhotoCarousel from '@/components/PhotoCarousel'
import WaveDivider from '@/components/WaveDivider'

const colors = {
  parchment: '#F4EDEA',
  white: '#FFFFFF',
  blue: '#12263A'
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-hn-parchment">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative bg-hn-parchment overflow-hidden pt-28 pb-16">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-hn-cyan/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-[300px] h-[300px] bg-hn-apricot/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-[200px] h-[200px] bg-hn-grey/30 rounded-full blur-2xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-hn-blue leading-[1.1] text-balance">
                Change your neighborhood, 
                <span className="block mt-2">
                  <span className="gradient-text">change the world.</span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-hn-blue/70 leading-relaxed max-w-lg">
                Hey Neighbor gives you a simple playbook and weekly support to turn your neighborhood into the community you're missing.
              </p>
              
              <div className="pt-4">
                <Link href="/start">
                  <Button size="lg">
                    Start Here
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-hn-cyan/20 rounded-3xl blur-2xl transform rotate-6" />
                <div className="relative blob-shape w-72 h-72 md:w-80 md:h-80 bg-hn-blue flex items-center justify-center shadow-2xl shadow-hn-blue/30">
                  <Image 
                    src="/brand/HN-white-svg.svg" 
                    alt="HeyNeighbor" 
                    width={200} 
                    height={200}
                    className="opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider topColor={colors.parchment} bottomColor={colors.white} />

      {/* What HeyNeighbor Is */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <PhotoCarousel />
          </div>
          
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-hn-blue mb-6">
              We're turning 10,000 neighborhoods into communities
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-hn-blue/70 mb-6">
              Join the hundreds of people around the country who are using the Hey Neighbor plan to build deep meaningful relationships with their neighbors.
            </p>
            <p className="text-xl md:text-2xl font-poppins font-semibold text-hn-blue">
              Knock on doors, <span className="text-hn-apricot">and change the lives of the people around you.</span>
            </p>
          </div>
        </div>
      </Section>

      <WaveDivider topColor={colors.white} bottomColor={colors.parchment} />

      {/* Weekly Call */}
      <Section background="parchment">
        <div className="max-w-2xl mx-auto">
          <CalloutCard variant="glow" className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-hn-cyan to-hn-cyan/70 rounded-2xl flex items-center justify-center shadow-lg shadow-hn-cyan/25">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-hn-blue mb-4">
              Join the Weekly Call
            </h2>
            <p className="text-hn-blue/70 mb-8 leading-relaxed text-lg">
              Every week, chapter leads and community builders hop on a casual call to share wins, ask questions, and get support.
            </p>
            <Link href="/start">
              <Button size="lg">
                Start Here
              </Button>
            </Link>
          </CalloutCard>
        </div>
      </Section>

      <WaveDivider topColor={colors.parchment} bottomColor={colors.white} />

      {/* Socials Section */}
      <Section background="white">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-hn-blue mb-4">
            Follow Hey Neighbor on Socials
          </h2>
          <p className="text-hn-blue/70 mb-12 max-w-xl mx-auto text-lg">
            Join the community and stay up to date
          </p>
          
          <div className="flex justify-center gap-8 mb-12">
            <a 
              href="https://www.tiktok.com/@hey_neighbor_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-hn-blue rounded-2xl flex items-center justify-center shadow-lg shadow-hn-blue/20 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <span className="text-hn-blue font-medium">TikTok</span>
            </a>
            
            <a 
              href="https://www.instagram.com/hey_neighbor_guy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-hn-blue font-medium">Instagram</span>
            </a>
          </div>
          
          <Link href="/start">
            <Button size="lg">
              Start Here
            </Button>
          </Link>
        </div>
      </Section>

      <WaveDivider topColor={colors.white} bottomColor={colors.blue} />

      {/* Dual CTA Section */}
      <Section background="blue" className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-hn-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-hn-apricot/10 rounded-full blur-3xl" />
        </div>
        
        <div className="text-center relative z-10">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-hn-parchment mb-4">
            Ready to build community?
          </h2>
          <p className="text-hn-parchment/70 mb-10 text-lg max-w-xl mx-auto">
            Whether you want to start something new or join an existing chapter, we're here to help.
          </p>
          
          <Link href="/start">
            <Button size="lg">
              Start Here
            </Button>
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
