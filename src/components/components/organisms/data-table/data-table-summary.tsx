import type {Table} from '@tanstack/react-table'

interface DataTableSummaryProps<TData> {
  table: Table<TData>
}

export function DataTableSummary<TData>({table}: DataTableSummaryProps<TData>) {
  const totalRowCount = table.getPrePaginationRowModel().rows.length

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRowCount)

  return (
    <div className="flex-1 text-sm text-muted-foreground">
      Showing {startRow} - {endRow} of {totalRowCount} rows
    </div>
  )
}
