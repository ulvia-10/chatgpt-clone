import type {ComponentProps} from 'react'

export function LubricantIndicatorCriticalIcon({
  ...props
}: ComponentProps<'svg'>) {
  return (
    <svg
      width="100"
      height="82"
      viewBox="0 0 100 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M49.866.53 73.65 39.291c11.41 18.594-1.97 42.502-23.785 42.502-21.816 0-35.196-23.908-23.786-42.502L49.866.53Z"
        fill="url(#a)"
      />
      <path
        d="m41.514 57.965-2.298-15.336V39.26h8.56v3.369l-2.299 15.336h-3.963ZM39.572 67v-6.737h7.847V67h-7.846ZM53.514 57.965l-2.298-15.336V39.26h8.56v3.369l-2.299 15.336h-3.963ZM51.572 67v-6.737h7.847V67h-7.846Z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="a"
          x1="99.731"
          y1="41.162"
          x2="0"
          y2="41.162"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".384" stop-color="red" />
          <stop offset="1" stop-color="#900" />
        </linearGradient>
      </defs>
    </svg>
  )
}
