'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white' | 'current'
  label?: string
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size = 'md',
      variant = 'primary',
      label,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    }

    const variants = {
      primary: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-secondary-600 dark:text-secondary-400',
      white: 'text-white',
      current: 'text-current',
    }

    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center gap-2', className)}
        {...props}
      >
        <Loader2 className={cn(sizes[size], variants[variant], 'animate-spin')} />
        {label && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        )}
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'

export default Spinner
