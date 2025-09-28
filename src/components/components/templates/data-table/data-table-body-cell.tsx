import {TableCell} from '@/components/ui/table'
import {cn} from '@/lib/utils'
import {type Cell, type RowData, flexRender} from '@tanstack/react-table'
import {useMemo} from 'react'

export function DataTableBodyCell<T extends RowData>({
  cell,
}: {
  cell: Cell<T, unknown>
}) {
  const {column} = cell
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const {meta} = cell.column.columnDef as any

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const cellProps = useMemo(() => {
    const {style, ...cellMeta} =
      typeof meta?.cellProps === 'function'
        ? // biome-ignore lint/correctness/noUnsafeOptionalChaining: <explanation>
          meta?.cellProps(cell.getContext())
        : (meta?.cellProps ?? {
            style: {},
          })

    const classes = cn(
      style,
      'text-foreground font-medium py-2 px-4 whitespace-nowrap overflow-hidden text-ellipsis',
    )

    return {
      className: classes,
      ...cellMeta,
    }
  }, [cell, column, meta])

  return (
    <TableCell {...cellProps}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  )
}
