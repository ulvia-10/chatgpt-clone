import {cn} from '@/lib/utils'
import type {ComponentProps} from 'react'

type DataTablePaginationProps = ComponentProps<'div'>

export function DataTablePagination({
  className,
  children,
  ...props
}: DataTablePaginationProps) {
  return (
    <div
      className={cn('flex items-center justify-between px-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}
