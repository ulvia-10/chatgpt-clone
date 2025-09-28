import type {ComponentProps} from 'react'

export function UpdatePlanIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.4701 0.667969H2.05339C0.999219 0.667969 0.136719 1.53047 0.136719 2.58464V16.0013C0.136719 17.0555 0.999219 17.918 2.05339 17.918H15.4701C16.5242 17.918 17.3867 17.0555 17.3867 16.0013V2.58464C17.3867 1.53047 16.5242 0.667969 15.4701 0.667969ZM10.6784 14.0846H3.97005V12.168H10.6784V14.0846ZM13.5534 10.2513H3.97005V8.33464H13.5534V10.2513ZM13.5534 6.41797H3.97005V4.5013H13.5534V6.41797Z"
        fill="black"
      />
    </svg>
  )
}
