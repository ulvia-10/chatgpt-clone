import {Small} from '@/components/atoms/typography'
import {cn} from '@/lib/utils'
import type {ComponentProps} from 'react'
import type {BarStacks, DynamicBarChartConfig} from './types'

export type DynamicLegendProps = ComponentProps<'div'> & {
  config: DynamicBarChartConfig
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
      {(Object.values(config) as BarStacks[]).flatMap(
        ({name, label, startColor}) => (
          <div key={name} className="flex items-center gap-2">
            <div
              className={cn('w-2.5 h-2.5', indicatorClassName)}
              style={{
                backgroundColor: startColor,
              }}
            />{' '}
            <Small className={cn('text-xs', labelClassName)}>{label}</Small>
          </div>
        ),
      )}
    </div>
  )
}
