'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      rounded = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium
      transition-all duration-200
    `

    const variants = {
      success: `
        bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400
        border border-green-200 dark:border-green-800
      `,
      warning: `
        bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400
        border border-yellow-200 dark:border-yellow-800
      `,
      danger: `
        bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400
        border border-red-200 dark:border-red-800
      `,
      info: `
        bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400
        border border-blue-200 dark:border-blue-800
      `,
      default: `
        bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
        border border-gray-200 dark:border-gray-700
      `,
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    }

    const roundedStyles = rounded ? 'rounded-full' : 'rounded-md'

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          roundedStyles,
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
