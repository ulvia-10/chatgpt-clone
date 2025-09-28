import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {cn} from '@/lib/utils'
import type React from 'react'
import {
  type ComponentProps,
  type ComponentPropsWithRef,
  forwardRef,
} from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

export type AreaStacks = {
  dataKey: string
  label: string
  name: string
  stroke: string
  startColor: string
  endColor: string
}

export type DynamicAreaChartConfig = ChartConfig & {
  [key: string]: AreaStacks
}

export type AreaChartProps = Omit<
  ComponentPropsWithRef<typeof ChartContainer>,
  'children'
> & {
  areaChart: ComponentProps<typeof AreaChart>
  xAxis?: Omit<ComponentProps<typeof XAxis>, 'ref'>
  yAxis?: Omit<ComponentProps<typeof YAxis>, 'ref'>
  cartesianGrid?: ComponentProps<typeof CartesianGrid>
  containerClassName?: string
  thresholdNormal?: number
  thresholdCritical?: number
  thresholdCaution?: number
  scrollable?: boolean
  referenceLine?: Omit<ComponentProps<typeof ReferenceLine>, 'ref'>[]
  tooltipContent?: React.ReactElement
}

const DynamicAreaChart = forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      areaChart,
      xAxis,
      yAxis,
      cartesianGrid,
      containerClassName,
      thresholdNormal = 6,
      thresholdCritical = 8,
      thresholdCaution = 3,
      scrollable,
      referenceLine,
      className,
      tooltipContent,
      ...props
    }: AreaChartProps,
    ref,
  ) => {
    const config = props.config as DynamicAreaChartConfig

    return (
      <div className={cn('relative flex', containerClassName)}>
        {yAxis && scrollable && (
          <div className="flex-shrink-0">
            <ResponsiveContainer width={65} height="100%">
              <AreaChart data={areaChart.data}>
                <YAxis
                  tickLine={true}
                  axisLine={true}
                  fontSize={12}
                  className="bg-white"
                  {...yAxis}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        <ChartContainer ref={ref} className="h-[320px] w-full" {...props}>
          <AreaChart accessibilityLayer {...areaChart}>
            <CartesianGrid vertical={false} />
            {yAxis && !scrollable && <YAxis tickLine={false} {...yAxis} />}
            {xAxis && (
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 3)}
                {...xAxis}
              />
            )}
            <ChartTooltip
              cursor={false}
              content={
                tooltipContent ?? <ChartTooltipContent indicator="dot" />
              }
            />
            <defs>
              {Object.entries(config).map(([key, area]) => (
                <linearGradient
                  key={key}
                  id={`gradient-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="50%"
                    stopColor={area.startColor}
                    stopOpacity={1}
                  />
                  <stop
                    offset="95%"
                    stopColor={area.endColor}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              ))}
            </defs>
            {Object.entries(config).map(([key, area]) => (
              <Area
                key={key}
                dataKey={area.dataKey}
                type="linear"
                fill={`url(#gradient-${key})`}
                stroke={area.stroke}
                fillOpacity={0.5}
                strokeWidth={3}
              />
            ))}
            {referenceLine?.flatMap(({...props}, index) => (
              <ReferenceLine key={index.toString()} {...props} />
            ))}
          </AreaChart>
        </ChartContainer>
      </div>
    )
  },
)

DynamicAreaChart.displayName = 'DynamicAreaChart'

export {DynamicAreaChart}
