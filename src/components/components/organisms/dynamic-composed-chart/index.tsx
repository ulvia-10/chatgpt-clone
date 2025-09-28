import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {cn} from '@/lib/utils'
import type {ComponentProps, ComponentPropsWithRef} from 'react'
import {forwardRef} from 'react'
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type {BarRectangleItem} from 'recharts/types/cartesian/Bar'
import type {AreaStacks} from '../dynamic-area-chart'
import type {BarStacks} from '../dynamic-bar-chart/types'
import {ComposedBarChartGradient} from './composed-bar-chart-gradient'

export type LineStacks = {
  dataKey: string
  label: string
  name: string
  stroke: string
  strokeWidth?: number
  yAxisId?: string
}

export type DynamicComposedChartConfig = {
  bar?: ChartConfig & {
    [key: string]: BarStacks
  }
  line?: ChartConfig & {
    [key: string]: LineStacks
  }
  area?: ChartConfig & {
    [key: string]: AreaStacks
  }
}

type ComposedChartProps = Omit<
  ComponentPropsWithRef<typeof ChartContainer>,
  'children'
> & {
  composedChart: ComponentProps<typeof ComposedChart>
  barChart?: ComponentProps<typeof Bar>
  lineChart?: ComponentProps<typeof Line>
  areaChart?: ComponentProps<typeof Area>
  xAxis?: Omit<ComponentProps<typeof XAxis>, 'ref'>
  yAxis?: Omit<ComponentProps<typeof YAxis>, 'ref'>
  rightYAxis?: Omit<ComponentProps<typeof YAxis>, 'ref'>
  cartesianGrid?: ComponentProps<typeof CartesianGrid>
  containerClassName?: string
  composedChartShow?: number
  bar3D?: string
  barRadius?: number | [number, number, number, number] | undefined
}

const DynamicComposedChart = forwardRef<HTMLDivElement, ComposedChartProps>(
  (
    {
      composedChart,
      barChart,
      lineChart,
      areaChart,
      xAxis,
      yAxis,
      rightYAxis,
      cartesianGrid,
      containerClassName,
      composedChartShow = 10,
      className,
      bar3D,
      barRadius,
      ...props
    }: ComposedChartProps,
    ref,
  ) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <div
          className={cn(
            'w-[calc(100%-0px)] overflow-x-auto float-left h-[200px]',
            containerClassName,
          )}
        >
          <ChartContainer
            ref={ref}
            className={cn(
              'max-h-[200px]',
              composedChart?.data &&
                composedChart.data.length > composedChartShow
                ? `min-w-[${composedChart.data.length * 120}px]`
                : 'w-full',
              className,
            )}
            {...props}
          >
            <ComposedChart
              accessibilityLayer
              layout="horizontal"
              {...composedChart}
            >
              <CartesianGrid
                vertical={false}
                horizontal={false}
                stroke="#ccc"
                strokeWidth="2"
                {...cartesianGrid}
              />
              {xAxis && (
                <XAxis
                  angle={-20}
                  tick={props => {
                    const {x, y, payload} = props
                    const text = payload.value
                    const maxLength = 7
                    const displayText =
                      text.length > maxLength
                        ? `${text.slice(0, maxLength)}...`
                        : text

                    return (
                      <text
                        x={x}
                        y={y}
                        dy={4}
                        fontSize={10}
                        textAnchor="middle"
                        fontWeight="normal"
                        fill="#333"
                      >
                        {displayText}
                      </text>
                    )
                  }}
                  tickLine={false}
                  tickMargin={12}
                  axisLine={false}
                  fontSize={10}
                  {...xAxis}
                />
              )}
              {yAxis && (
                <YAxis
                  tickLine={false}
                  tickMargin={12}
                  axisLine={false}
                  fontSize={10}
                  {...yAxis}
                />
              )}
              {rightYAxis && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  tickMargin={12}
                  axisLine={{stroke: '#ccc', strokeWidth: 1}}
                  type="number"
                  fontSize={10}
                  {...rightYAxis}
                />
              )}
              <ChartTooltip content={<ChartTooltipContent />} />
              {(Object.values(props.config.bar ?? {}) as BarStacks[]).map(
                ({dataKey, name, color, startColor, endColor, yAxisId}) => {
                  return (
                    <Bar
                      key={dataKey}
                      dataKey={dataKey}
                      name={name}
                      stackId="a"
                      yAxisId={yAxisId ?? 'left'}
                      shape={(props: unknown) => (
                        <ComposedBarChartGradient
                          startColor={startColor ?? '#000'}
                          endColor={endColor ?? '#000'}
                          bar3D={bar3D}
                          {...(props as BarRectangleItem)}
                        />
                      )}
                      fill={startColor}
                      radius={barRadius}
                    >
                      <LabelList
                        dataKey={dataKey}
                        position="top"
                        content={props => {
                          const {value, x, y, width} = props
                          if (value === 0) {
                            return null
                          }
                          return (
                            <text
                              x={Number(x) + Number(width) / 2}
                              y={(y as number) - 6}
                              fill={color}
                              textAnchor="middle"
                              fontSize="20px"
                              fontWeight={700}
                            >
                              {value}
                            </text>
                          )
                        }}
                      />
                    </Bar>
                  )
                },
              )}
              {(Object.values(props.config.line ?? {}) as LineStacks[]).map(
                ({dataKey, name, stroke, strokeWidth = 6, yAxisId}) => {
                  return (
                    <Line
                      key={dataKey}
                      dataKey={dataKey}
                      name={name}
                      fill={stroke}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      yAxisId={yAxisId ?? 'right'}
                    ></Line>
                  )
                },
              )}
              {(Object.values(props.config.area ?? {}) as AreaStacks[]).map(
                ({dataKey, name, startColor}) => {
                  return (
                    <Area
                      key={dataKey}
                      dataKey={dataKey}
                      name={name}
                      fill={startColor}
                    >
                      <LabelList
                        dataKey={dataKey}
                        position="inside"
                        className={cn('fill-[#fff]')}
                        fontSize="11px"
                      />
                    </Area>
                  )
                },
              )}
            </ComposedChart>
          </ChartContainer>
        </div>
      </ResponsiveContainer>
    )
  },
)

DynamicComposedChart.displayName = 'DynamicComposedChart'

export {DynamicComposedChart}
