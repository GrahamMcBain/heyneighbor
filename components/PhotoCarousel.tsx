'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const photos = [
  '/photos/dodson-neighbors.jpg',
  '/photos/WhatsApp Image 2025-09-27 at 20.21.12.jpeg',
  '/photos/WhatsApp Image 2025-10-05 at 17.17.21.jpeg',
  '/photos/WhatsApp Image 2025-10-26 at 12.38.08.jpeg',
  '/photos/WhatsApp Image 2025-11-01 at 06.56.03.jpeg',
]

const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-hn-blue/20">
        {photos.map((photo, index) => (
          <div
            key={photo}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={photo}
              alt={`Community photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-hn-cyan w-6' 
                : 'bg-hn-grey hover:bg-hn-blue/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PhotoCarousel
