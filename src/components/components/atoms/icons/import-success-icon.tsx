import type {ComponentProps} from 'react'

export function ImportSuccessIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="81"
      fill="none"
      viewBox="0 0 80 81"
      {...props}
    >
      <path
        fill="#59AD24"
        d="M40 .809c-22.08 0-40 17.92-40 40s17.92 40 40 40 40-17.92 40-40-17.92-40-40-40m-8 60-20-20 5.64-5.64L32 49.489l30.36-30.36 5.64 5.68z"
      ></path>
    </svg>
  )
}
