import {cn} from '@/lib/utils'
import type {ComponentProps} from 'react'

type DataTableHeaderProps = ComponentProps<'div'>

export function DataTableHeader({
  className,
  children,
  ...props
}: DataTableHeaderProps) {
  return (
    <div
      className={cn('flex items-center justify-between px-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}
