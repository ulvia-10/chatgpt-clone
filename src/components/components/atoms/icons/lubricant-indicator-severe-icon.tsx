import type {ComponentProps} from 'react'

export function LubricantIndicatorSevereIcon({
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
        d="M49.866.794 73.65 39.557c11.41 18.594-1.97 42.502-23.785 42.502-21.816 0-35.196-23.908-23.786-42.502L49.866.794Z"
        fill="#AB0000"
      />
      <path
        d="M49.866 1 73.65 39.763c11.41 18.594-1.97 42.502-23.785 42.502-21.816 0-35.196-23.908-23.786-42.502L49.866 1Z"
        fill="url(#a)"
      />
      <path
        d="m41.514 58.23-2.298-15.337v-3.368h8.56v3.368L45.477 58.23h-3.963Zm-1.942 9.035v-6.737h7.847v6.737h-7.846ZM53.514 58.23l-2.298-15.337v-3.368h8.56v3.368L57.477 58.23h-3.963Zm-1.942 9.035v-6.737h7.847v6.737h-7.846Z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="a"
          x1="99.731"
          y1="41.632"
          x2="0"
          y2="41.632"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".454" stop-color="#AB0000" />
          <stop offset="1" stop-color="#5D0404" />
        </linearGradient>
      </defs>
    </svg>
  )
}
