'use client'

import {Check, ChevronDown} from 'lucide-react'
import * as React from 'react'

import {Button} from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {cn} from '@/lib/utils'

type ComboboxOptions = {
  value: string
  label: string
}

type ComboboxProps = React.ComponentProps<typeof Button> & {
  placeholder?: string
  placeholderSearch?: string
  emptyOptions?: string
  options: ComboboxOptions[]
}

export function Combobox({
  placeholder = 'Select item...',
  placeholderSearch = 'Search item...',
  emptyOptions = 'No item found.',
  options,
  className,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between', className)}
          {...props}
        >
          {value
            ? options.find(framework => framework.value === value)?.label
            : placeholder}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] p-0', className)}>
        <Command>
          <CommandInput placeholder={placeholderSearch} />
          <CommandList>
            <CommandEmpty>{emptyOptions}</CommandEmpty>
            <CommandGroup>
              {options.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === framework.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
