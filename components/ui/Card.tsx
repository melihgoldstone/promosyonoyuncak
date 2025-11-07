'use client'

import { HTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'bordered'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-xl transition-all duration-200'

    const variants = {
      default: `
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-sm
      `,
      glass: `
        bg-white/70 dark:bg-gray-800/70
        backdrop-blur-md
        border border-white/20 dark:border-gray-700/50
        shadow-lg
      `,
      elevated: `
        bg-white dark:bg-gray-800
        border border-gray-100 dark:border-gray-700
        shadow-xl
      `,
      bordered: `
        bg-white dark:bg-gray-800
        border-2 border-gray-300 dark:border-gray-600
      `,
    }

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    }

    const hoverStyles = hover
      ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
      : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header Component
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700',
          className
        )}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

// Card Body Component
export const CardBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('py-4', className)} {...props} />
})

CardBody.displayName = 'CardBody'

// Card Footer Component
export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'pt-4 border-t border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    />
  )
})

CardFooter.displayName = 'CardFooter'

export default Card
