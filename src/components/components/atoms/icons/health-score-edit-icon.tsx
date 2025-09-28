import type {ComponentProps} from 'react'

export function HealthScoreEditIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        fill="#000"
        d="M11.773 5.05 8.94 2.25l.933-.933a1.28 1.28 0 0 1 .942-.383q.558 0 .941.383l.934.933q.383.383.4.926.016.54-.367.924zm-10.2 8.05a.64.64 0 0 1-.475-.192.64.64 0 0 1-.192-.474V10.55a.69.69 0 0 1 .2-.483L7.973 3.2l2.833 2.834L3.94 12.9a.67.67 0 0 1-.484.2z"
      ></path>
    </svg>
  )
}
