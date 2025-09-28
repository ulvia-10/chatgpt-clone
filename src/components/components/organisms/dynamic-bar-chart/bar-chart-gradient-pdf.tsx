import {Fragment, useId} from 'react'
import type {BarRectangleItem} from 'recharts/types/cartesian/Bar'

export type BarChartGradientPDFProps = BarRectangleItem & {
  startColor: string
  endColor: string
  bar3D?: string
  vertical?: boolean
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  radius?: any
}

export function BarChartGradientPDF(props: BarChartGradientPDFProps) {
  const id = useId().replace(/:/g, '')
  const gradientId = `bar-gradient-${id}`

  const x = props.x ?? 0
  const y = props.y ?? 0
  const width = props.width ?? 0
  const height = props.height ?? 0
  const radius = props.radius
    ? height === 0
      ? [0, 0, 0, 0]
      : width === 0
        ? [0, 0, 0, 0]
        : props.radius
    : [0, 0, 0, 0]

  return (
    <Fragment>
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor={props.startColor} />
          <stop offset="1" stopColor={props.endColor} />
        </linearGradient>
      </defs>

      <path
        d={`
          M ${x},${y + radius[0]}
          Q ${x},${y} ${x + radius[0]},${y}
          L ${x + width - radius[1]},${y}
          Q ${x + width},${y} ${x + width},${y + radius[1]}
          L ${x + width},${y + height - radius[2]}
          Q ${x + width},${y + height} ${x + width - radius[2]},${y + height}
          L ${x + radius[3]},${y + height}
          Q ${x},${y + height} ${x},${y + height - radius[3]}
          Z
        `}
        fill={`url(#${gradientId})`}
        style={{isolation: 'isolate'}}
      />
      {props.bar3D && (
        <rect
          x={x + 10}
          y={y + 8}
          width={width - 20}
          height={10}
          rx={4}
          ry={4}
          fill={props.bar3D}
        />
      )}
    </Fragment>
  )
}
