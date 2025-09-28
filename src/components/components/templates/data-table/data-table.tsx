'use client'

import {Table} from '@/components/ui/table'
import type {RowData, Table as TableType} from '@tanstack/react-table'
import {DataTableBody} from './data-table-body'
import DataTableHead from './data-table-head'
import {DataTablePagination} from './data-table-pagination'

export type PaginationProps = {
  hidePageNavigation?: boolean
  hidePageSizeOptions?: boolean
  hidePagination?: boolean
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  nextPageNumber: number
  pageSize: number
  previousPageNumber: number
  pageRangeDisplayed?: number
  pageSizeOptions?: number[]
  totalItems?: number
  totalPages: number
  allItemCount?: number
}

type Props<T extends RowData> = {
  table: TableType<T>
  pagination?: PaginationProps
}

export function DataTable<T extends RowData>({table, pagination}: Props<T>) {
  return (
    <div
      className="w-full max-w-full relative overflow-scroll pb-2 mt-4"
      id="table-section"
    >
      <Table>
        <DataTableHead headerGroups={table.getHeaderGroups()} />
        <DataTableBody table={table} />
      </Table>
      <DataTablePagination table={table} pagination={pagination} />
    </div>
  )
}
