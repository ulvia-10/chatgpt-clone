import {cn} from '@/lib/utils'
import type {ComponentProps} from 'react'

export function DataTableContainer({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div className={cn('space-y-2 py-2', className)} {...props}>
      {children}
    </div>
  )
}
