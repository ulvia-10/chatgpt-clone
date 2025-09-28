import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationNumber,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {usePagination} from '@/hooks/use-pagination'
import {cn} from '@/lib/utils'
import type {Table} from '@tanstack/react-table'
import type {ComponentProps} from 'react'

interface DataTableNavigationProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>
}

export function DataTableNavigation<TData>({
  table,
  className,
  ...props
}: DataTableNavigationProps<TData>) {
  const pagination = usePagination({
    count: table.getPageCount(),
    page: table.getState().pagination.pageIndex + 1,
  })

  return (
    <div className={cn('flex items-center space-x-2', className)} {...props}>
      <Pagination>
        <PaginationContent>
          {pagination.items.map((item, index) => {
            const paginationItems = {
              page: (
                <PaginationNumber
                  key={index}
                  onClick={() => table.setPageIndex((item.page ?? 0) - 1)}
                  disabled={item.disabled}
                  isActive={item.selected}
                  className="font-semibold"
                >
                  {item.page}
                </PaginationNumber>
              ),
              'start-ellipsis': <PaginationEllipsis key={index} />,
              'end-ellipsis': <PaginationEllipsis key={index} />,
              previous: (
                <PaginationPrevious
                  key={index}
                  onClick={() => table.previousPage()}
                  disabled={item.disabled}
                />
              ),
              next: (
                <PaginationNext
                  key={index}
                  onClick={() => table.nextPage()}
                  disabled={item.disabled}
                />
              ),
              first: undefined,
              last: undefined,
            } as const

            return (
              <PaginationItem key={index}>
                {paginationItems[item.type]}
              </PaginationItem>
            )
          })}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
