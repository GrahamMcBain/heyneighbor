'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Button from './Button'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  honeypot: z.string().max(0, 'Bot detected')
})

type EmailFormData = z.infer<typeof emailSchema>

interface EmailCaptureProps {
  source: 'hero' | 'program' | 'footer'
  variant?: 'inline' | 'footer'
  placeholder?: string
  buttonText?: string
  className?: string
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ 
  source, 
  variant = 'inline',
  placeholder = "Enter your email",
  buttonText = "Send it to me",
  className = ""
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema)
  })

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          source
        }),
      })

      if (response.ok) {
        reset()
        if (source === 'program') {
          router.push('/thanks')
        } else {
          setMessage('Thanks! Check your email.')
        }
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isFooter = variant === 'footer'

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          {...register('honeypot')}
          type="text"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />
        
        <input
          {...register('email')}
          type="email"
          placeholder={placeholder}
          className={`
            flex-1 px-5 py-3 rounded-xl transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-hn-cyan focus:ring-offset-2
            ${isFooter 
              ? 'bg-white/10 border border-hn-parchment/20 text-hn-parchment placeholder-hn-parchment/50 focus:bg-white/15' 
              : 'bg-white border border-hn-grey/30 text-hn-blue placeholder-hn-blue/40 shadow-lg shadow-hn-blue/5'
            }
          `}
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          variant={isFooter ? 'accent' : 'primary'}
          size="md"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : buttonText}
        </Button>
      </form>
      
      {errors.email && (
        <p className={`text-sm mt-3 ${isFooter ? 'text-hn-apricot' : 'text-red-500'}`}>
          {errors.email.message}
        </p>
      )}
      
      {message && (
        <p className={`text-sm mt-3 ${
          message.includes('Thanks') 
            ? isFooter ? 'text-hn-cyan' : 'text-hn-cyan' 
            : isFooter ? 'text-hn-apricot' : 'text-red-500'
        }`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default EmailCapture
