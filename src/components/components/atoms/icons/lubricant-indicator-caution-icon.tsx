import type {ComponentProps} from 'react'

export function LubricantIndicatorCautionIcon({
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
        d="M49.866.265 73.65 39.027c11.41 18.595-1.97 42.502-23.785 42.502-21.816 0-35.196-23.907-23.786-42.502L49.866.265Z"
        fill="url(#a)"
      />
      <path
        d="m46.399 67.337-10.43-10.429a3.312 3.312 0 0 1 4.685-4.684l5.738 5.738L61.569 42.74a3.312 3.312 0 1 1 4.69 4.677L46.4 67.338v-.001Z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="a"
          x1="99.731"
          y1="40.897"
          x2="0"
          y2="40.897"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".384" stop-color="#FFD500" />
          <stop offset="1" stop-color="#FFA800" />
        </linearGradient>
      </defs>
    </svg>
  )
}
