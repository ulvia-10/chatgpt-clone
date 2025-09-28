import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {cn} from '@/lib/utils'
import {
  type ComponentProps,
  type ComponentPropsWithRef,
  forwardRef,
} from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'

export type LineStacks = {
  label: string
  dataKey: string
  name: string
  stroke: string
}

export type DynamicLineChartConfig = ChartConfig & {
  [key: string]: LineStacks
}

type LineChartProps = Omit<
  ComponentPropsWithRef<typeof ChartContainer>,
  'children'
> & {
  lineChart: ComponentProps<typeof LineChart>
  xAxis?: Omit<ComponentProps<typeof XAxis>, 'ref'>
  yAxis?: Omit<ComponentProps<typeof YAxis>, 'ref'>
  referenceLineX?: Omit<ComponentProps<typeof ReferenceLine>, 'ref'>[]
  referenceLineY?: Omit<ComponentProps<typeof ReferenceLine>, 'ref'>[]
  cartesianGrid?: ComponentProps<typeof CartesianGrid>
  containerClassName?: string
}

const DynamicLineChart = forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      lineChart,
      xAxis,
      yAxis,
      referenceLineX,
      referenceLineY,
      cartesianGrid,
      containerClassName,
      className,
      ...props
    }: LineChartProps,
    ref,
  ) => {
    return (
      <div
        className={cn(
          'w-[calc(100%-0px)] overflow-x-auto float-left',
          containerClassName,
        )}
      >
        <ChartContainer
          ref={ref}
          className={cn('max-h-[200px] w-full', className)}
          {...props}
        >
          <LineChart {...lineChart}>
            <CartesianGrid
              vertical={false}
              horizontal={false}
              {...cartesianGrid}
            />
            {xAxis && (
              <XAxis
                angle={-20}
                tickLine={false}
                tickMargin={12}
                axisLine={false}
                fontSize={10}
                {...xAxis}
              />
            )}
            {yAxis && (
              <YAxis
                allowDataOverflow
                tickLine={false}
                tickMargin={12}
                axisLine={false}
                fontSize={10}
                {...yAxis}
              />
            )}
            <ChartTooltip content={<ChartTooltipContent />} />
            {referenceLineX &&
              referenceLineX.map((ref, index) => (
                <ReferenceLine key={index.toString()} {...ref} />
              ))}
            {referenceLineY &&
              referenceLineY.map((ref, index) => (
                <ReferenceLine key={index.toString()} {...ref} />
              ))}
            {(Object.values(props.config) as LineStacks[]).map(
              ({dataKey, name, stroke}) => {
                return (
                  <Line
                    key={dataKey}
                    type="linear"
                    dot={false}
                    name={name}
                    strokeWidth={2}
                    dataKey={dataKey}
                    stroke={stroke}
                    connectNulls
                  />
                )
              },
            )}
          </LineChart>
        </ChartContainer>
      </div>
    )
  },
)

DynamicLineChart.displayName = 'DynamicLineChart'

export {DynamicLineChart}
