import type {ComponentProps} from 'react'

export function CircleIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <circle cx="6.752" cy="7.205" r="6.752"></circle>
    </svg>
  )
}
