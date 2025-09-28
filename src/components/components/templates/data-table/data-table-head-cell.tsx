import DefaultFilter from '@/components/molecules/default-filter'
import {TableHead} from '@/components/ui/table'
import {cn} from '@/lib/utils'
// biome-ignore lint/style/useImportType: <explanation>
import {Header, RowData, flexRender} from '@tanstack/react-table'
import {ArrowDownUp, ArrowUpDown} from 'lucide-react'
import {useMemo} from 'react'

export default function DataTableHeadCell<T extends RowData>({
  header,
  index,
  totalHeaders,
}: {
  header: Header<T, unknown>
  index: number
  totalHeaders: number
}) {
  const {column} = header
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const {meta} = header.column.columnDef as any

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const cellStyles = useMemo(() => {
    const {style, ...cellMeta} =
      typeof meta?.headerCellProps === 'function'
        ? meta.headerCellProps(header.getContext())
        : (meta?.headerCellProps ?? {
            style: {},
          })

    const baseClasses = cn(
      'bg-primary text-left',
      index === 0 && 'rounded-l-lg',
      index === totalHeaders - 1 && 'rounded-r-lg',
      style,
    )

    return {
      className: baseClasses,
      ...cellMeta,
    }
  }, [header, index, totalHeaders, column, meta])

  return (
    <TableHead {...cellStyles}>
      <div className="flex flex-col h-full justify-between items-stretch">
        <button
          className={cn(
            'flex items-center text-left font-bold mt-[1vh] text-foreground text-[0.8rem] h-[50%]',
            header.column.getCanFilter() ? 'mb-0' : 'mb-[52px]',
            header.column.getCanSort() && 'cursor-pointer',
          )}
          onClick={header.column.getToggleSortingHandler()}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: (
              <ArrowUpDown
                className="ml-2 h-4 w-4"
                data-testid={`sort-asc-${header.id}`}
              />
            ),
            desc: (
              <ArrowDownUp
                className="ml-2 h-4 w-4"
                data-testid={`sort-desc-${header.id}`}
              />
            ),
          }[header.column.getIsSorted() as string] ?? null}
        </button>
        {header.column.getCanFilter() ? (
          <div className="mb-3 mt-[0.4rem] pl-2 bg-white shadow-sm rounded-md">
            {(header.column.columnDef.meta as {filterComponent?: unknown})
              ?.filterComponent ? (
              <meta.filterComponent column={header.column} />
            ) : (
              <DefaultFilter column={header.column} />
            )}
          </div>
        ) : null}
      </div>
    </TableHead>
  )
}
