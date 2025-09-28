'use client'

import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {cn} from '@/lib/utils'
import {format, getMonth, getYear, setMonth, setYear} from 'date-fns'
import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {CalendarIcon} from './icons'

interface DatePickerProps
  extends Omit<React.ComponentProps<typeof Button>, 'value'> {
  placeholder?: string
  value?: string | Date
  formatDate?: string
  onDateChange?: (value?: string) => void
  startYear?: number
  endYear?: number
  minDate?: Date
  maxDate?: Date
  align?: 'start' | 'center' | 'end'
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function DatePicker({
  placeholder = 'Pick a date',
  value,
  formatDate = 'dd MMM yyyy',
  onDateChange,
  className,
  align = 'center',
  startYear = getYear(new Date()) - 10,
  endYear = getYear(new Date()),
  disabled,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [monthYear, setMonthYear] = React.useState<Date>(new Date())

  React.useEffect(() => {
    if (!value) {
      setDate(undefined)
      return
    }
    const parsedDate = new Date(value)
    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate)
      setMonthYear(parsedDate)
    }
  }, [value])

  const years = React.useMemo(
    () =>
      Array.from({length: endYear - startYear + 1}, (_, i) => startYear + i),
    [startYear, endYear],
  )

  const handleDateChange = (newDate?: Date) => {
    setDate(newDate)
    onDateChange?.(newDate ? format(newDate, formatDate) : undefined)
  }

  const updateMonthYear = (month?: number, year?: number) => {
    setMonthYear(prev => {
      let updated = prev
      if (month !== undefined) {
        updated = setMonth(updated, month)
      }
      if (year !== undefined) {
        updated = setYear(updated, year)
      }
      return updated
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-between text-left font-normal shadow-[0px_0px_5.9px_0px_#0000001A]',
            className,
          )}
          disabled={disabled}
        >
          {date ? format(date, formatDate) : <span>{placeholder}</span>}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <div className="flex justify-between p-2">
          <Select
            onValueChange={value => updateMonthYear(months.indexOf(value))}
            value={months[getMonth(monthYear)]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, i) => (
                <SelectItem key={i} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={value =>
              updateMonthYear(undefined, Number.parseInt(value))
            }
            value={getYear(monthYear).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          month={monthYear}
          onMonthChange={setMonthYear}
          fromDate={minDate}
          toDate={maxDate}
        />
      </PopoverContent>
    </Popover>
  )
}
