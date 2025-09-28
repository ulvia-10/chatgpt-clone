import {Fragment, useId} from 'react'
import {Rectangle} from 'recharts'
import type {BarRectangleItem} from 'recharts/types/cartesian/Bar'

export type ComposedComposedBarChartGradientProps = BarRectangleItem & {
  startColor: string
  endColor: string
  bar3D?: string
}

export function PdfComposedBarChartGradient(
  props: ComposedComposedBarChartGradientProps,
) {
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
        <linearGradient id={gradientId} x1="0" y1="30%" x2="0" y2="100%">
          <stop offset="0%" stopColor={props.startColor} />
          <stop offset="100%" stopColor={props.endColor} />
        </linearGradient>
      </defs>

      <rect
        x={props.x}
        y={props?.y}
        width={props.width}
        height={barHeight}
        fill={`url(#${gradientId})`}
        clipPath={`url(#${clipPathId})`}
        rx={5}
        ry={5}
        style={{borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}
      />
      {props?.bar3D && barHeight > 10 && (
        <rect
          x={(props.x ?? 0) + 5}
          y={(props?.y ?? 0) + 3}
          width={(props.width ?? 0) - 10}
          height={5}
          rx={'3'}
          ry={'3'}
          fill={props?.bar3D}
        />
      )}
    </Fragment>
  )
}
