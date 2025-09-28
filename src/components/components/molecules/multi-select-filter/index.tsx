import {ChevronDownIcon} from '@/components/atoms/icons/chevron-down-icon'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useState} from 'react'
import type {Options} from '../autocomplete/autocomplete'

export function MultiSelectFilter({
  items,
  selectedValues,
  onSelectedChange,
  placeholder,
}: {
  items: Options[]
  selectedValues: string[]
  onSelectedChange: (values: string[]) => void
  placeholder: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-10 border-none rounded-md shadow-[0px_0px_5.9px_0px_#0000001A] justify-between"
        >
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : placeholder}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[200px] max-h-[300px] overflow-y-auto p-2"
        onClick={e => e.preventDefault()}
      >
        {items.map(item => (
          <div
            key={item.value}
            className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-secondary"
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              const isSelected = selectedValues.includes(item.value)
              if (isSelected) {
                onSelectedChange(
                  selectedValues.filter(value => value !== item.value),
                )
              } else {
                onSelectedChange([...selectedValues, item.value])
              }
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                const isSelected = selectedValues.includes(item.value)
                if (isSelected) {
                  onSelectedChange(
                    selectedValues.filter(value => value !== item.value),
                  )
                } else {
                  onSelectedChange([...selectedValues, item.value])
                }
              }
            }}
            role="button"
            tabIndex={0}
          >
            <Checkbox
              id={item.value}
              checked={selectedValues.includes(item.value)}
              onCheckedChange={() => {
                const isSelected = selectedValues.includes(item.value)
                if (isSelected) {
                  onSelectedChange(
                    selectedValues.filter(value => value !== item.value),
                  )
                } else {
                  onSelectedChange([...selectedValues, item.value])
                }
              }}
              className="pointer-events-none border-gray-300 data-[state=checked]:bg-[#59AD24] data-[state=checked]:text-white"
            />
            <label
              htmlFor={item.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </label>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
