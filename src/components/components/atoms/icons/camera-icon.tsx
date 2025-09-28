import type {ComponentProps} from 'react'

export function CameraIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="28"
      fill="none"
      viewBox="0 0 31 28"
      {...props}
    >
      <path
        fill="#000"
        d="M3.946 3.946V0h2.63v3.946h3.947v2.63H6.577v3.947H3.946V6.577H0V3.946zm3.946 7.892V7.892h3.946V3.946h9.207l2.407 2.63h4.17a2.635 2.635 0 0 1 2.63 2.631v15.784a2.635 2.635 0 0 1-2.63 2.63H6.577a2.635 2.635 0 0 1-2.631-2.63V11.838zm9.205 11.838a6.577 6.577 0 1 0 .004-13.154 6.577 6.577 0 0 0-.004 13.154m-4.207-6.579a4.209 4.209 0 1 0 8.417.003 4.209 4.209 0 0 0-8.417-.003"
        opacity="0.7"
      ></path>
    </svg>
  )
}
