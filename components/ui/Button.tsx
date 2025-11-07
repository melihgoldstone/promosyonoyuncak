'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 font-medium
      rounded-lg transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    `

    const variants = {
      primary: `
        bg-primary-600 text-white shadow-sm
        hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5
        focus:ring-primary-500
        active:translate-y-0
      `,
      secondary: `
        bg-secondary-600 text-white shadow-sm
        hover:bg-secondary-700 hover:shadow-md hover:-translate-y-0.5
        focus:ring-secondary-500
        active:translate-y-0
      `,
      outline: `
        border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200
        bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
        hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500
        focus:ring-primary-500
      `,
      ghost: `
        text-gray-700 dark:text-gray-200
        hover:bg-gray-100 dark:hover:bg-gray-800
        focus:ring-gray-500
      `,
      danger: `
        bg-red-600 text-white shadow-sm
        hover:bg-red-700 hover:shadow-md hover:-translate-y-0.5
        focus:ring-red-500
        active:translate-y-0
      `,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
