import {cn} from '@/lib/utils'
import type {Table} from '@tanstack/react-table'
import {Search} from 'lucide-react'
import {type ComponentProps, useRef} from 'react'

interface DataTableGoToProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
}

export function DataTableGoTo<TData>({
  table,
  className,
  ...props
}: DataTableGoToProps<TData>) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={cn(
        'flex items-center gap-4 text-sm font-medium text-gray-800',
        className,
      )}
      {...props}
    >
      <span className="flex-1">Go to</span>
      <form
        className="flex grow-0 items-center"
        onSubmit={e => {
          e.preventDefault()
          table.setPageIndex((inputRef.current?.valueAsNumber ?? 0) - 1)

          if (inputRef.current) {
            inputRef.current.value = ''
          }
        }}
      >
        <div className="flex items-center rounded-sm border border-gray-200 bg-white p-2 shadow-sm">
          <span className="mr-1">Page</span>
          <input
            ref={inputRef}
            type="number"
            min={1}
            max={table.getPageCount()}
            className="no-arrow-number w-4 font-semibold focus:outline-none"
            aria-label="Page number"
          />
          <button
            type="submit"
            className="hover:bg-primary/400 ml-2 rounded-[6px] bg-primary p-1 transition-colors"
            aria-label="Go to page"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
