import {Input} from '@/components/ui/input'
import {usePrevious} from '@/hooks/use-previous'
import {cn} from '@/lib/utils'
import {Search} from 'lucide-react'
import type React from 'react'
import {useEffect, useState} from 'react'

export type NormalInputProps = {
  value: string | number
  onChange: (value: string | number) => void
} & React.ComponentPropsWithoutRef<typeof Input>

export default function NormalInput({
  value: initialValue,
  onChange,
  ...props
}: NormalInputProps) {
  const [value, setValue] = useState(initialValue)
  const previousValue = usePrevious(initialValue)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onChange(value)
  }, [value])

  useEffect(() => {
    if (previousValue !== initialValue && initialValue === '') {
      setValue(initialValue)
    }
  }, [initialValue, previousValue])

  return (
    <div className="relative flex items-center">
      <Search size={16} />
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        className={cn(
          'h-8 text-[#707070] font-normal pl-1 min-h-[26px] py-[1px] pr-3 border-none',
          'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
        )}
        {...props}
      />
    </div>
  )
}
