import useDebounce from '@/hooks/use-debounce'
import {usePrevious} from '@/hooks/use-previous'
import {type InputHTMLAttributes, useEffect, useState} from 'react'

export type DebouncedInputProps = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue)
  const debouncedValue = useDebounce(value, debounce)
  const previousValue = usePrevious(initialValue)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onChange(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    if (previousValue !== initialValue && initialValue === '') {
      setValue(initialValue)
    }
  }, [initialValue, previousValue])

  return (
    <input
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
      className={[
        'w-full rounded-md border border-gray-300 px-2 py-1 text-sm',
        'focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50',
        'shadow-sm text-gray-700',
      ].join(' ')}
    />
  )
}
