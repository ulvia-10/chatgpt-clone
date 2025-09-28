import type {ComponentProps} from 'react'

export function LubricantIndicatorNormalIcon({
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
        d="M49.8656 0L73.6512 38.7628C85.061 57.3571 71.6814 81.2646 49.8656 81.2646C28.0497 81.2646 14.6702 57.3571 26.08 38.7628L49.8656 0Z"
        fill="url(#paint0_linear_10894_2841)"
      />
      <path
        d="M46.3988 67.0724L35.9698 56.6433C34.6767 55.3503 34.6767 53.2526 35.9698 51.9595C37.2628 50.6664 39.3605 50.6664 40.6536 51.9595L46.3918 57.6977L61.5691 42.4741C62.8601 41.178 64.9578 41.175 66.2529 42.467C67.5479 43.7581 67.552 45.8558 66.2599 47.1508L46.3998 67.0734L46.3988 67.0724Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10894_2841"
          x1="99.7311"
          y1="40.6323"
          x2="0"
          y2="40.6323"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.459" stopColor="#3DA7DE" />
          <stop offset="1" stopColor="#2D82A7" />
        </linearGradient>
      </defs>
    </svg>
  )
}
