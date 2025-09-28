import type {ComponentProps} from 'react'

export function LubricantEyeIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg {...props}>
      <path
        d="M12 14.545a2.545 2.545 0 1 0 0-5.09 2.545 2.545 0 0 0 0 5.09Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.94 11.53C4.204 7.738 7.783 5 12.002 5c4.217 0 7.794 2.734 9.058 6.525.102.307.102.638 0 .944a9.55 9.55 0 0 1-18.117.006 1.495 1.495 0 0 1 0-.944H2.94Zm13.515.47a4.455 4.455 0 1 1-8.91 0 4.455 4.455 0 0 1 8.91 0Z"
        fill="currentColor"
      />
    </svg>
  )
}
