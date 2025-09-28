import type {ComponentProps} from 'react'

export function CloseIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11.0002 20.4902C16.672 20.4902 21.2698 15.9025 21.2698 10.2432C21.2698 4.58386 16.672 -0.00390625 11.0002 -0.00390625C5.32837 -0.00390625 0.730469 4.58386 0.730469 10.2432C0.730469 15.9025 5.32837 20.4902 11.0002 20.4902Z" />
      <path
        d="M7.92993 7.22266L14.0268 13.3061"
        stroke="white"
        stroke-width="3.03323"
        stroke-linecap="round"
      />
      <path
        d="M7.92993 13.3061L14.0268 7.22266"
        stroke="white"
        stroke-width="3.03323"
        stroke-linecap="round"
      />
    </svg>
  )
}
