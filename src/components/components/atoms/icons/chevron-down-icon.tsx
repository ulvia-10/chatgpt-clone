import type {ComponentProps} from 'react'

export function ChevronDownIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      width="15"
      height="8"
      viewBox="0 0 15 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.970703 0.800781L7.53537 7.36545L14.1 0.800781H0.970703Z"
        fill="#333333"
      />
    </svg>
  )
}
