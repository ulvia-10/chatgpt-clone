import {CustomInput} from '@/components/atoms/custom-input'
import {cn} from '@/lib/utils'
import type {Table} from '@tanstack/react-table'
import {Search} from 'lucide-react'
import type {ComponentProps} from 'react'

interface DataTableSearchProps<TData>
  extends ComponentProps<typeof CustomInput> {
  table: Table<TData>
}

export function DataTableSearch<TData>({
  table,
  className,
  ...props
}: DataTableSearchProps<TData>) {
  return (
    <CustomInput
      addonLeft={<Search className="h-4 w-4 text-gray-400" />}
      className={cn('w-64 bg-[#F6F6F6] border-none', className)}
      placeholder="Search"
      onChange={e => table.setGlobalFilter(e.target.value)}
      {...props}
    />
  )
}
