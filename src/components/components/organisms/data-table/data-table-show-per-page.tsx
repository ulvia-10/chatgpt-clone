import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type {Table} from '@tanstack/react-table'

interface DataTableShowPerPageProps<TData> {
  table: Table<TData>
}

export function DataTableShowPerPage<TData>({
  table,
}: DataTableShowPerPageProps<TData>) {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Show</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={value => {
          table.setPageSize(Number(value))
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 50, 100].map(pageSize => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm font-medium">Entries</p>
    </div>
  )
}
