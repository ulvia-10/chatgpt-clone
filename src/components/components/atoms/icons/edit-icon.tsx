import type {ComponentProps} from 'react'

export function EditIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="24"
      fill="none"
      viewBox="0 0 23 24"
      {...props}
    >
      <path
        fill="#000"
        d="M.041 18.556v4.687h4.688L18.554 9.418 13.866 4.73zM22.179 4.033l-2.925-2.925a1.245 1.245 0 0 0-1.763 0l-2.287 2.287 4.687 4.688 2.288-2.288a1.245 1.245 0 0 0 0-1.762"
      ></path>
    </svg>
  )
}
