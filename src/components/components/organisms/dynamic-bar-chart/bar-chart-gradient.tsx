import {Fragment, useId} from 'react'
import {Rectangle} from 'recharts'
import type {BarRectangleItem} from 'recharts/types/cartesian/Bar'

export type BarChartGradientProps = BarRectangleItem & {
  startColor: string
  endColor: string
  bar3D?: string
  vertical?: boolean
  hasSelection?: boolean
  isActive?: boolean
}

export function BarChartGradient(props: BarChartGradientProps) {
  const id = useId()
  const gradientId = `gradient-${id}`
  const clipPathId = `clipPath-${id}`

  const barHeight = props.height ?? 0

  const isZeroHeight = barHeight < 1

  if (isZeroHeight) {
    return null
  }

  return (
    <Fragment>
      <defs>
        <linearGradient
          id={gradientId}
          x1={props?.vertical ? '100%' : '0'}
          y1={props?.vertical ? '0' : '30%'}
          x2="0"
          y2={props?.vertical ? '0' : '100%'}
        >
          <stop offset="0%" stopColor={props.startColor} />
          <stop offset="100%" stopColor={props.endColor} />
        </linearGradient>
        <clipPath id={clipPathId}>
          <Rectangle {...props} />
        </clipPath>
      </defs>

      <rect
        x={props.x}
        y={props?.y}
        width={props.width}
        height={barHeight}
        fill={`url(#${gradientId})`}
        clipPath={`url(#${clipPathId})`}
        stroke={
          props.hasSelection && props.isActive
            ? 'rgb(255, 234, 0)'
            : 'transparent'
        }
        strokeWidth={props.hasSelection && props.isActive ? 2 : 0}
      />
      {props?.bar3D && (
        <rect
          x={(props.x ?? 0) + 10}
          y={(props?.y ?? 0) + 8}
          width={(props.width ?? 0) - 20}
          height={10}
          rx={'4'}
          ry={'4'}
          fill={props?.bar3D}
        />
      )}
    </Fragment>
  )
}
