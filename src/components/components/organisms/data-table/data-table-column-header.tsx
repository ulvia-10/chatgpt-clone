import {CustomInput} from '@/components/atoms/custom-input'
import {ArrowDownIcon, ArrowUpIcon} from '@/components/atoms/icons'
import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import type {Column} from '@tanstack/react-table'
import type React from 'react'
import type {ReactNode} from 'react'

type FilterInputProps<TData, TValue> = {
  column: Column<TData, TValue>
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string
  column: Column<TData, TValue>
  title: string
  filterInput?: (props: FilterInputProps<TData, TValue>) => ReactNode
}

export function DataTableColumnHeader<TData, TValue>({
  containerClassName,
  column,
  title,
  className,
  filterInput: FilterInput,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const Filter = FilterInput ? FilterInput : CustomInput
  const filterValue = column.getFilterValue()

  return (
    <div
      className={cn(
        'flex flex-col h-full justify-between py-2',
        containerClassName,
      )}
    >
      <div
        className={cn(
          'grid items-center space-x-2 item-start h-full',
          className,
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const currentSort = column.getIsSorted()
            if (currentSort === false) {
              column.toggleSorting(false)
            } else if (currentSort === 'asc') {
              column.toggleSorting(true)
            } else {
              column.clearSorting()
            }
          }}
          className="-ml-3 h-full mb-2 data-[state=open]:bg-transparent justify-start hover:bg-transparent font-bold text-left leading-tight break-words whitespace-normal"
        >
          <span>{title}</span>
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : null}
        </Button>
      </div>
      {column.getCanFilter() ? (
        <Filter
          value={(filterValue as string) ?? ''}
          onChange={e => column.setFilterValue(e.target.value)}
          column={column}
          placeholder={title}
          className="border-white"
        />
      ) : (
        <div className="w-full h-[80%]" />
      )}
    </div>
  )
}
