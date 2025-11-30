import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0'
  
  const variants = {
    primary: 'bg-hn-apricot text-hn-blue hover:bg-hn-apricot/90 focus:ring-hn-apricot shadow-lg shadow-hn-apricot/30 hover:shadow-xl hover:shadow-hn-apricot/40',
    secondary: 'border-2 border-hn-blue text-hn-blue bg-transparent hover:bg-hn-blue hover:text-white focus:ring-hn-blue',
    ghost: 'text-hn-blue hover:text-hn-blue hover:bg-hn-apricot/20 focus:ring-hn-apricot',
    accent: 'bg-hn-cyan text-hn-blue hover:bg-hn-cyan/90 focus:ring-hn-cyan shadow-lg shadow-hn-cyan/25'
  }
  
  const sizes = {
    sm: 'px-5 py-2.5 text-sm rounded-xl',
    md: 'px-7 py-3.5 text-base rounded-xl',
    lg: 'px-9 py-4 text-lg rounded-2xl'
  }
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
