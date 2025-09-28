import {CustomInput} from '@/components/atoms/custom-input'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {useDebounce} from '@/hooks/use-debounce'
import {cn} from '@/lib/utils'
import {Command as CommandPrimitive} from 'cmdk'
import {X} from 'lucide-react'
import type React from 'react'
import {type ComponentProps, useEffect, useMemo, useState} from 'react'

export type Options = {value: string; label: string}

type Props<T extends string> = ComponentProps<typeof CustomInput> & {
  defaultSearchValue?: string
  selectedValue?: T
  defaultValue?: T
  onSearchValueChange?: (value: string) => void
  onSelectedValueChange: (value: T) => void
  onReset?: () => void
  items: Options[]
  isLoading?: boolean
  emptyMessage?: string
  placeholder?: string
  allowSearchOnDefaultValue?: boolean
  isActiveBlur?: boolean
}

export function AutoComplete<T extends string>({
  defaultSearchValue,
  selectedValue,
  defaultValue,
  onSearchValueChange,
  onSelectedValueChange,
  onReset,
  items,
  isLoading,
  emptyMessage = 'No items.',
  placeholder = 'Search...',
  className,
  allowSearchOnDefaultValue = false,
  isActiveBlur = true,
  ...props
}: Props<T>) {
  const [searchValue, setSearchValue] = useState<string>(
    defaultSearchValue ?? '',
  )
  const [open, setOpen] = useState(false)
  const debouncedSearchValue = useDebounce(searchValue, 1000)

  useEffect(() => {
    if (selectedValue) {
      const selectedItem = items?.find(item => item.value === selectedValue)
      if (selectedItem) {
        setSearchValue(selectedItem.label)
      }
    }
  }, [items, selectedValue])

  useEffect(() => {
    if (defaultSearchValue) {
      setSearchValue(defaultSearchValue)
    }
  }, [defaultSearchValue])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      allowSearchOnDefaultValue ||
      debouncedSearchValue !== defaultSearchValue
    ) {
      onSearchValueChange?.(debouncedSearchValue)
    }
  }, [debouncedSearchValue])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (searchValue === '') {
      onSearchValueChange?.('')
    }
  }, [searchValue])

  const labels = useMemo(
    () =>
      items?.reduce(
        (acc, item) => {
          acc[item.value] = item.label
          return acc
        },
        {} as Record<string, string>,
      ),
    [items],
  )

  const filteredItems = useMemo(() => {
    if (!items?.length) {
      return []
    }
    if (!searchValue) {
      return items
    }

    const lowerCaseSearchValue = searchValue.toLowerCase()
    return items.filter(item => {
      const label = item.label.toLowerCase()
      return label.includes(lowerCaseSearchValue)
    })
  }, [items, searchValue])

  const reset = () => {
    onSelectedValueChange('' as T)
    onSearchValueChange?.('')
    setOpen(false)
    setSearchValue('')
    onReset?.()
  }

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget?.hasAttribute('cmdk-list') &&
      !e.relatedTarget?.hasAttribute('cmdk-item') &&
      !e.relatedTarget?.closest('[role="dialog"]') &&
      selectedValue !== undefined &&
      labels[selectedValue] !== searchValue
    ) {
      reset()
    }
  }

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset()
    } else {
      onSelectedValueChange(inputValue as T)
      const selectedLabel = items.find(item => item.value === inputValue)?.label
      setSearchValue(selectedLabel ?? '')
      setOpen(false)
    }
  }

  return (
    <div className={cn('flex items-center', className)}>
      <Popover
        open={open}
        onOpenChange={isOpen => {
          setOpen(isOpen)
        }}
      >
        <Command shouldFilter={false}>
          <PopoverTrigger asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={setSearchValue}
              onBlur={isActiveBlur ? onInputBlur : undefined}
            >
              <CustomInput
                className={cn(
                  'h-8 font-normal placeholder:text-[#C8C8C8]',
                  className,
                )}
                placeholder={placeholder}
                {...props}
                addonRight={
                  searchValue ? (
                    <X width={15} onClick={reset} />
                  ) : (
                    props.addonRight
                  )
                }
              />
            </CommandPrimitive.Input>
          </PopoverTrigger>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={e => e.preventDefault()}
            onInteractOutside={e => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute('cmdk-input')
              ) {
                e.preventDefault()
              }
            }}
            className="w-[var(--radix-popover-trigger-width)] p-0 overflow-hidden min-w-[70px] max-w-[400px]"
          >
            <CommandList className="max-h-[300px] overflow-y-auto">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-2 text-sm text-muted-foreground text-center">
                    Loading...
                  </div>
                </CommandPrimitive.Loading>
              ) : filteredItems?.length > 0 ? (
                <CommandGroup>
                  {filteredItems.map(option => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onMouseDown={e => e.preventDefault()}
                      onSelect={onSelectItem}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : searchValue ? (
                <div className="p-2 text-sm text-muted-foreground text-center">
                  No option
                </div>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  )
}
