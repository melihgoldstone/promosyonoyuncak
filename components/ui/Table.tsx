'use client'

import { HTMLAttributes, forwardRef, ThHTMLAttributes, TdHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Table Container
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  striped?: boolean
  hoverable?: boolean
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, striped = false, hoverable = true, ...props }, ref) => {
    return (
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table
          ref={ref}
          className={cn(
            'w-full text-left text-sm',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Table.displayName = 'Table'

// Table Header
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn(
        'bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    />
  )
})

TableHeader.displayName = 'TableHeader'

// Table Body
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn(
        'divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800',
        className
      )}
      {...props}
    />
  )
})

TableBody.displayName = 'TableBody'

// Table Row
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  hoverable?: boolean
  selected?: boolean
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hoverable = true, selected = false, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'transition-colors',
          hoverable && 'hover:bg-gray-50 dark:hover:bg-gray-700/50',
          selected && 'bg-primary-50 dark:bg-primary-900/20',
          className
        )}
        {...props}
      />
    )
  }
)

TableRow.displayName = 'TableRow'

// Table Head Cell
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sorted?: 'asc' | 'desc' | false
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable = false, sorted = false, children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
          sortable && 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {sortable && sorted && (
            <span className="text-gray-400">
              {sorted === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
      </th>
    )
  }
)

TableHead.displayName = 'TableHead'

// Table Data Cell
export const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn(
        'px-4 py-3 text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    />
  )
})

TableCell.displayName = 'TableCell'

// Table Footer
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn(
        'bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    />
  )
})

TableFooter.displayName = 'TableFooter'

export default Table
