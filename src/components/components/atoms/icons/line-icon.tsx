import type {ComponentProps} from 'react'

interface LineIconProps extends ComponentProps<'svg'> {
  color?: string
}

export function LineIcon({color = '#CD94FF', ...props}: LineIconProps) {
  return (
    <svg
      width="37"
      height="8"
      viewBox="0 0 37 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="2.08984"
        y="2.10596"
        width="32.1167"
        height="3.67484"
        rx="1.83742"
        fill={color} // Warna diatur dari prop color
      />
      <circle cx="3.38501" cy="3.94336" r="3.23706" fill={color} />
      <circle cx="32.9919" cy="3.94336" r="3.23706" fill={color} />
    </svg>
  )
}
