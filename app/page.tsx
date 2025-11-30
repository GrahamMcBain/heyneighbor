'use client'

import React from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import CTAButton from '@/components/CTAButton'
import CalloutCard from '@/components/CalloutCard'
import PhotoCarousel from '@/components/PhotoCarousel'
import WaveDivider from '@/components/WaveDivider'

const colors = {
  parchment: '#F4EDEA',
  white: '#FFFFFF',
  blue: '#12263A',
  apricot: '#F4D1AE'
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-hn-parchment">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative bg-hn-apricot/30 overflow-hidden pt-28 pb-16">
        {/* Background decorations - warmer colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-hn-apricot/50 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-[300px] h-[300px] bg-hn-parchment rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-[200px] h-[200px] bg-hn-apricot/40 rounded-full blur-2xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hn-blue leading-tight text-balance">
                Make your block feel like 
                <span className="block mt-2">
                  <span className="gradient-text">summer camp.</span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-hn-blue/80 leading-relaxed max-w-lg">
                Hey Neighbor gives you simple weekly prompts to knock on doors, share food, and turn the people next door into real friends.
              </p>
              
              <div className="pt-4">
                <CTAButton size="lg" />
              </div>
            </div>
            
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="relative">
                {/* Warm backdrop instead of cyan */}
                <div className="absolute -inset-4 bg-hn-apricot/40 rounded-[2.5rem] blur-xl" />
                
                <div className="relative blob-shape w-72 h-72 md:w-80 md:h-80 bg-hn-blue flex items-center justify-center shadow-2xl shadow-hn-blue/30">
                  <Image 
                    src="/brand/HN-white-svg.svg" 
                    alt="HeyNeighbor" 
                    width={200} 
                    height={200}
                    className="opacity-90"
                  />
                </div>
                
                {/* Small polaroid photos around the blob */}
                <div className="absolute -top-4 -left-8 w-20 h-20 rounded-xl border-4 border-hn-parchment overflow-hidden shadow-lg rotate-[-8deg]">
                  <Image src="/photos/dodson-neighbors.jpg" alt="Neighbors" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-4 w-24 h-24 rounded-xl border-4 border-hn-parchment overflow-hidden shadow-lg rotate-[6deg]">
                  <Image src="/photos/WhatsApp Image 2025-10-05 at 17.17.21.jpeg" alt="Block party" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider topColor={colors.apricot + '4D'} bottomColor={colors.white} />

      {/* What HeyNeighbor Is */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative max-w-md mx-auto">
              {/* Decorative tape pieces */}
              <div className="absolute -top-3 left-8 w-16 h-6 bg-hn-apricot/70 rounded rotate-[-4deg] shadow-sm" />
              <div className="absolute -bottom-3 right-12 w-14 h-5 bg-hn-apricot/60 rounded rotate-[3deg] shadow-sm" />
              <div className="polaroid rotate-[-1deg]">
                <PhotoCarousel />
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-hn-apricot font-semibold text-sm mb-2 tracking-wide">little steps, big community</p>
            <h2 className="text-3xl md:text-4xl font-bold text-hn-blue mb-6">
              Turning 10,000 neighborhoods into little camps
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-hn-blue/70 mb-6">
              Join neighbors around the country who are throwing porch potlucks, firepit nights, and block parties with the Hey Neighbor plan.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-hn-blue">
              Knock on a door today, <span className="hand-underline">and start a story you'll still be telling next summer.</span>
            </p>
          </div>
        </div>
      </Section>

      <WaveDivider topColor={colors.white} bottomColor={colors.parchment} />

      {/* Weekly Call */}
      <Section background="parchment">
        <div className="max-w-2xl mx-auto">
          <CalloutCard variant="glow" className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-hn-apricot rounded-2xl flex items-center justify-center shadow-lg shadow-hn-apricot/30 rotate-3">
              <span className="text-3xl">🏕️</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-hn-blue mb-4">
              Our Weekly Campfire Call
            </h2>
            <p className="text-hn-blue/70 mb-8 leading-relaxed text-lg">
              Every week, community builders hop on a casual call to swap stories, share what worked (and what didn't), and cheer each other on.
            </p>
            <CTAButton size="lg" />
          </CalloutCard>
        </div>
      </Section>

      <WaveDivider topColor={colors.parchment} bottomColor={colors.white} />

      {/* Socials Section */}
      <Section background="white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-hn-blue mb-4">
            Come hang out with us online
          </h2>
          <p className="text-hn-blue/70 mb-12 max-w-xl mx-auto text-lg">
            Behind-the-scenes neighbor stories, silly moments, and ideas you can steal for your block.
          </p>
          
          <div className="flex justify-center gap-8 mb-12">
            <a 
              href="https://www.tiktok.com/@hey_neighbor_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-hn-blue rounded-2xl flex items-center justify-center shadow-lg shadow-hn-blue/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-300">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-hn-blue font-medium">Instagram</span>
            </a>
          </div>
          
          <CTAButton size="lg" />
        </div>
      </Section>

      <WaveDivider topColor={colors.white} bottomColor={colors.apricot} />

      {/* Final CTA Section - warmer gradient instead of blue */}
      <Section background="parchment" className="relative bg-gradient-to-br from-hn-parchment via-hn-apricot/40 to-hn-parchment">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-hn-apricot/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-hn-parchment rounded-full blur-3xl" />
        </div>
        
        <div className="text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-hn-blue mb-4">
            Ready to meet your neighbors?
          </h2>
          <p className="text-hn-blue/70 mb-10 text-lg max-w-xl mx-auto">
            Whether you're starting from "we just wave in the driveway" or already hosting potlucks, we'll give you simple steps to grow a real community.
          </p>
          
          <CTAButton size="lg" />
        </div>
      </Section>

      <Footer />
    </div>
  )
}
