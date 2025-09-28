import type {ComponentProps} from 'react'

export function ArrowIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Arrow Icon</title>
      <path
        d="M0.351074 13.9273L6.91574 7.36265L0.351074 0.797984L0.351074 13.9273Z"
        fill="#333333"
      />
    </svg>
  )
}
