import {Small} from '@/components/atoms/typography'
import {cn} from '@/lib/utils'
import {Text, View} from '@react-pdf/renderer'
import type {ComponentProps} from 'react'
import type {DynamicPieChartConfig, PieStacks} from './types'

export type DynamicLegendProps = ComponentProps<'div'> & {
  config: DynamicPieChartConfig
  indicatorClassName?: string
  labelClassName?: string
}

export function DynamicLegend({
  config,
  className,
  indicatorClassName,
  labelClassName,
  ...props
}: DynamicLegendProps) {
  return (
    <div
      className={cn('flex flex-col gap-1 min-w-[80px]', className)}
      {...props}
    >
      {(Object.values(config) as PieStacks[]).flatMap(({label, startColor}) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className={cn('w-2.5 h-2.5', indicatorClassName)}
            style={{
              backgroundColor: startColor,
            }}
          />{' '}
          <Small className={cn('text-xs', labelClassName)}>{label}</Small>
        </div>
      ))}
    </div>
  )
}

export function DynamicLegendPDF({config}: DynamicLegendProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minWidth: '80px',
        marginLeft: 4,
      }}
    >
      {(Object.values(config) as PieStacks[]).flatMap(({label, startColor}) => (
        <View
          key={label}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <View
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: startColor,
            }}
          />
          <Text style={{fontSize: '10px'}}>{label}</Text>
        </View>
      ))}
    </View>
  )
}
