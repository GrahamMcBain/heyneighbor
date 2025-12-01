'use client'

import React, { useEffect, useRef } from 'react'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const container = containerRef.current
    if (!container) return

    const form = container.querySelector('.newsletter-form') as HTMLFormElement
    const formInput = container.querySelector('.newsletter-form-input') as HTMLInputElement
    const success = container.querySelector('.newsletter-success') as HTMLElement
    const errorContainer = container.querySelector('.newsletter-error') as HTMLElement
    const errorMessage = container.querySelector('.newsletter-error-message') as HTMLElement
    const backButton = container.querySelector('.newsletter-back-button') as HTMLElement
    const submitButton = container.querySelector('.newsletter-form-button') as HTMLElement
    const loadingButton = container.querySelector('.newsletter-loading-button') as HTMLElement

    const rateLimit = () => {
      errorContainer.style.display = 'flex'
      errorMessage.innerText = 'Too many signups, please try again in a little while'
      submitButton.style.display = 'none'
      formInput.style.display = 'none'
      backButton.style.display = 'block'
    }

    const time = new Date()
    const timestamp = time.valueOf()
    const previousTimestamp = localStorage.getItem('loops-form-timestamp')

    if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
      rateLimit()
      return
    }
    localStorage.setItem('loops-form-timestamp', String(timestamp))

    submitButton.style.display = 'none'
    loadingButton.style.display = 'flex'

    const formBody = 'userGroup=&mailingLists=&email=' + encodeURIComponent(formInput.value)

    try {
      const res = await fetch('https://app.loops.so/api/newsletter-form/cmigl07qwrxiq4o0jikxyf18h', {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      if (res.ok) {
        success.style.display = 'flex'
        form.reset()
      } else {
        const data = await res.json()
        errorContainer.style.display = 'flex'
        errorMessage.innerText = data.message || res.statusText
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Failed to fetch') {
        rateLimit()
        return
      }
      errorContainer.style.display = 'flex'
      if (error instanceof Error && error.message) {
        errorMessage.innerText = error.message
      }
      localStorage.setItem('loops-form-timestamp', '')
    } finally {
      formInput.style.display = 'none'
      loadingButton.style.display = 'none'
      backButton.style.display = 'block'
    }
  }

  const resetForm = () => {
    const container = containerRef.current
    if (!container) return

    const formInput = container.querySelector('.newsletter-form-input') as HTMLElement
    const success = container.querySelector('.newsletter-success') as HTMLElement
    const errorContainer = container.querySelector('.newsletter-error') as HTMLElement
    const errorMessage = container.querySelector('.newsletter-error-message') as HTMLElement
    const backButton = container.querySelector('.newsletter-back-button') as HTMLElement
    const submitButton = container.querySelector('.newsletter-form-button') as HTMLElement

    success.style.display = 'none'
    errorContainer.style.display = 'none'
    errorMessage.innerText = 'Oops! Something went wrong, please try again'
    backButton.style.display = 'none'
    formInput.style.display = 'flex'
    submitButton.style.display = 'flex'
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-hn-blue/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-hn-parchment rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-hn-blue/60 hover:text-hn-blue transition-colors rounded-full hover:bg-hn-blue/10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-hn-apricot rounded-2xl flex items-center justify-center shadow-lg shadow-hn-apricot/30 rotate-3">
            <span className="text-3xl">👋</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-hn-blue mb-2">
            Join the Community!
          </h2>
          <p className="text-hn-blue/70">
            Get the free 10-step plan and weekly tips to build community on your block.
          </p>
        </div>

        {/* Loops Form */}
        <div className="newsletter-form-container" ref={containerRef}>
          <form 
            className="newsletter-form" 
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <input 
              className="newsletter-form-input w-full px-4 py-3 rounded-xl border border-hn-grey/50 bg-white text-hn-blue placeholder-hn-blue/50 focus:outline-none focus:ring-2 focus:ring-hn-apricot focus:border-transparent mb-3"
              placeholder="you@example.com" 
              required 
              type="email" 
              name="newsletter-form-input"
            />
            <button 
              type="submit" 
              className="newsletter-form-button w-full bg-hn-apricot text-hn-blue font-semibold py-3 px-6 rounded-xl shadow-lg shadow-hn-apricot/30 hover:shadow-xl hover:shadow-hn-apricot/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              Join the Community!
            </button>
            <button 
              type="button" 
              className="newsletter-loading-button w-full bg-hn-apricot/70 text-hn-blue font-semibold py-3 px-6 rounded-xl hidden items-center justify-center"
            >
              Please wait...
            </button>
          </form>
          
          <div 
            className="newsletter-success hidden items-center justify-center w-full text-center py-4"
          >
            <p className="newsletter-success-message text-hn-blue text-lg font-medium">
              🎉 Check your email for the 10 step plan and links to join the community!
            </p>
          </div>
          
          <div 
            className="newsletter-error hidden items-center justify-center w-full text-center py-4"
          >
            <p className="newsletter-error-message text-red-600 text-base">
              Oops! Something went wrong, please try again
            </p>
          </div>
          
          <button 
            className="newsletter-back-button hidden mx-auto text-hn-blue/60 hover:text-hn-blue text-sm mt-4 hover:underline"
            type="button"
            onClick={resetForm}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupModal
