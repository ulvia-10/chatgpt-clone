'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {cn} from '@/lib/utils'
import {
  type Row,
  type Table as TableType,
  flexRender,
} from '@tanstack/react-table'
import type {ReactElement} from 'react'
import {Fragment} from 'react/jsx-runtime'

interface DataTableProps<TData> {
  table: TableType<TData>
  isLoading?: boolean
  renderSubComponent?: (props: {row: Row<TData>}) => ReactElement
  onRowSelect?: (row: Row<TData>) => void
  selectedRowId?: string
  height?: string
}

export function DataTable<TData>({
  table,
  isLoading,
  renderSubComponent,
  onRowSelect,
  selectedRowId,
  height,
}: DataTableProps<TData>) {
  const headerGroups = table.getHeaderGroups()
  const bodyHeaderGroup =
    headerGroups.length > 1 ? headerGroups[1] : headerGroups[0]

  const initialPageSize = table.options.state.pagination?.pageSize ?? 5

  return (
    <div
      className={cn(
        'overflow-hidden',
        (table.options.state.pagination?.pageSize ?? 0) > 10
          ? height
          : 'h-full',
      )}
    >
      <div className="relative overflow-auto h-full">
        <Table className="w-full mb-2 border-separate border-spacing-y-1 moz-table">
          <TableHeader className="sticky top-0 z-50 bg-primary moz-table-header">
            {headerGroups.map((headerGroup, index) => (
              <TableRow
                key={headerGroup.id}
                className={cn(
                  'hover:bg-transparent moz-table-row',
                  headerGroups.length > 1 &&
                    index === 0 &&
                    'relative top-0 z-0 moz-table-row-top',
                  headerGroups.length > 1 &&
                    index === 1 &&
                    'relative bottom-2 z-10 moz-table-row-bottom',
                )}
              >
                {headerGroup.headers.map((header, idx) => {
                  return (
                    <TableHead
                      id="test-head"
                      key={header.id}
                      colSpan={header.colSpan}
                      style={
                        header.column.getIsPinned()
                          ? {
                              left:
                                header.column.getIsPinned() === 'left'
                                  ? `${header.column.getStart('left') ?? 0}px`
                                  : undefined,
                              right:
                                header.column.getIsPinned() === 'right'
                                  ? `${header.column.getStart('right') ?? 0}px`
                                  : undefined,
                            }
                          : {}
                      }
                      className={cn(
                        'text-foreground font-bold px-2 first:pl-4 last:pr-4 moz-table-head relative opacity-95 z-0',
                        header.column.getIsPinned() &&
                          `sticky opacity-100 z-20 bg-primary`,
                        index === 0 && idx === 0 && 'rounded-tl-lg',
                        index === 0 &&
                          headerGroup.headers.length - 1 === idx &&
                          'rounded-tr-lg',
                        headerGroups.length - 1 === index &&
                          idx === 0 &&
                          'rounded-bl-lg',
                        headerGroups.length - 1 === index &&
                          headerGroup.headers.length - 1 === idx &&
                          'rounded-br-lg',
                        header.column.columnDef.meta?.header?.className || '',
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({length: initialPageSize}).map((_, index) => (
                <TableRow key={index}>
                  {bodyHeaderGroup.headers.map(header => (
                    <TableCell
                      key={header.id}
                      className="animate-pulse bg-gray-200 h-10"
                    />
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className={cn(
                      'rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)] cursor-pointer',
                      row.getIsExpanded() &&
                        'rounded-b-none shadow-[0_-2px_4px_rgba(0,0,0,0.1)] m-0',
                      onRowSelect &&
                        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                        (row.original as any).parameterId === selectedRowId
                        ? 'bg-primary/10 hover:bg-primary/20'
                        : onRowSelect
                          ? 'hover:bg-gray-50'
                          : '',
                    )}
                    onClick={onRowSelect ? () => onRowSelect(row) : undefined}
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <TableCell
                          key={cell.id}
                          style={
                            cell.column.getIsPinned()
                              ? {
                                  left:
                                    cell.column.getIsPinned() === 'left'
                                      ? `${cell.column.getStart('left') ?? 0}px`
                                      : undefined,
                                  right:
                                    cell.column.getIsPinned() === 'right'
                                      ? `${cell.column.getStart('right') ?? 0}px`
                                      : undefined,
                                }
                              : {}
                          }
                          className={cn(
                            'px-3 py-2 font-medium relative opacity-100 z-0',
                            cell.column.getIsPinned() && `sticky z-20 bg-white`,
                            cell.column.columnDef.meta?.cell?.className || '',
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  {renderSubComponent && row.getIsExpanded() && (
                    <TableRow
                      data-state={row.getIsSelected() && 'selected'}
                      className={cn(
                        'rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
                        row.getIsExpanded() &&
                          `rounded-t-none m-0 relative -top-2.5`,
                      )}
                    >
                      <div className="absolute top-0 left-16 w-[80%] h-[2px] bg-muted" />
                      {renderSubComponent({row})}
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={bodyHeaderGroup.headers.length}
                  className="h-[280px] text-center font-semibold"
                >
                  No Data Available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
