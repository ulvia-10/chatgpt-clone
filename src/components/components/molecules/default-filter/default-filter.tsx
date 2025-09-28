import DebouncedInput from '@/components/atoms/debounced-input'
import NormalInput from '@/components/atoms/normal-input'
import {useIsMobile} from '@/lib/use-is-mobile'
import {cn} from '@/lib/utils'
import type {Column, RowData, Table} from '@tanstack/react-table'
import {type CSSProperties, type ComponentProps, useMemo} from 'react'

type FilterComponentProps<TData extends RowData> = {
  table?: Table<unknown>
  column: Column<TData>
  data?: object
  label?: string
  InputLabelProps?: ComponentProps<'label'>
}

export default function DefaultFilter<T>({
  column,
  label,
  InputLabelProps,
}: FilterComponentProps<T>) {
  const isMobile = useIsMobile()
  const columnFilterValue = column.getFilterValue()

  const filterPlaceholder = useMemo(
    () =>
      (column.columnDef.meta as {filterPlaceholder: string})
        ?.filterPlaceholder ??
      (column.columnDef.header as string)
        .split(' ')
        .map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
        .join(' '),
    [column.columnDef.header, column.columnDef.meta],
  )

  const InputComponent = useMemo(
    () => (isMobile ? DebouncedInput : NormalInput),
    [isMobile],
  )

  return (
    <div
      className={cn(
        'rounded-md shadow-sm pl-2',
        (column.columnDef as {customStyle?: {className: string}}).customStyle
          ?.className,
      )}
      style={
        (column.columnDef as {customStyle?: {style: CSSProperties}}).customStyle
          ?.style
      }
    >
      {label ? (
        <label
          className={cn(
            'block text-sm font-bold mb-2 text-gray-700',
            InputLabelProps?.className,
          )}
          htmlFor={column.id}
          id={`${column.id}-label`}
          {...InputLabelProps}
        >
          {label}
        </label>
      ) : null}

      <InputComponent
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={filterPlaceholder}
      />
    </div>
  )
}
