import type {ComponentProps} from 'react'

export function DashboardPlanIcon({...props}: ComponentProps<'svg'>) {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6906 0.390625H2.18438C1.25582 0.390625 0.496094 1.18984 0.496094 2.16667V14.599C0.496094 15.5758 1.25582 16.375 2.18438 16.375H15.6906C16.6192 16.375 17.3789 15.5758 17.3789 14.599V2.16667C17.3789 1.18984 16.6192 0.390625 15.6906 0.390625ZM7.24922 12.8229H3.02852V11.0469H7.24922V12.8229ZM7.24922 9.27083H3.02852V7.49479H7.24922V9.27083ZM7.24922 5.71875H3.02852V3.94271H7.24922V5.71875ZM11.318 11.0469L8.9375 8.5249L10.1277 7.27279L11.318 8.53378L13.9939 5.71875L15.1926 6.97974L11.318 11.0469Z"
        fill="black"
      />
    </svg>
  )
}
