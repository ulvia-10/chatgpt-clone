import type {ChartConfig, ChartContainer} from '@/components/ui/chart'
import {cn} from '@/lib/utils'
import type {ComponentProps, ComponentPropsWithRef} from 'react'
import {forwardRef} from 'react'
import ReactPDFChart from 'react-pdf-charts'
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  XAxis,
  YAxis,
} from 'recharts'
import type {BarRectangleItem} from 'recharts/types/cartesian/Bar'
import type {AreaStacks} from '../dynamic-area-chart'
import type {BarStacks} from '../dynamic-bar-chart/types'
import {PdfComposedBarChartGradient} from './pdf-composed-bar-chart-gradient'

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
  width?: number
  height?: number
}

const PdfDynamicComposedChart = forwardRef<HTMLDivElement, ComposedChartProps>(
  ({
    width = 530,
    height = 200,
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
  }: ComposedChartProps) => {
    return (
      <ReactPDFChart>
        <ComposedChart
          width={width}
          height={height}
          accessibilityLayer
          layout="horizontal"
          margin={{top: 0, right: 10, left: -20, bottom: 0}}
          {...composedChart}
        >
          <CartesianGrid
            vertical={false}
            horizontal={false}
            stroke="#ccc"
            strokeWidth="0.5"
            {...cartesianGrid}
          />
          {xAxis && (
            <XAxis
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
                    fontSize={7}
                    textAnchor="middle"
                    fontWeight="normal"
                    fill="#333"
                  >
                    {displayText}
                  </text>
                )
              }}
              tickLine={false}
              tickMargin={3}
              axisLine={false}
              fontSize={7}
              {...xAxis}
            />
          )}
          {yAxis && (
            <YAxis
              tickLine={false}
              tickMargin={3}
              axisLine={false}
              fontSize={7}
              {...yAxis}
            />
          )}
          {rightYAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              tickMargin={3}
              fontSize={7}
              axisLine={{stroke: '#ccc', strokeWidth: 0.5}}
              type="number"
              {...rightYAxis}
            />
          )}
          {(Object.values(props.config.bar ?? {}) as BarStacks[]).map(
            ({dataKey, name, color, startColor, endColor, yAxisId}) => {
              return (
                <Bar
                  key={dataKey}
                  dataKey={dataKey}
                  name={name}
                  stackId="a"
                  isAnimationActive={false}
                  shape={(props: unknown) => (
                    <PdfComposedBarChartGradient
                      startColor={startColor ?? '#000'}
                      endColor={endColor ?? '#000'}
                      bar3D={bar3D}
                      {...(props as BarRectangleItem)}
                    />
                  )}
                  fill={startColor}
                  radius={barRadius}
                  yAxisId={yAxisId ?? 'left'}
                >
                  <LabelList
                    dataKey={dataKey}
                    position="top"
                    content={({value, x, y, width}) => {
                      if (value === 0) {
                        return null
                      }
                      const dynamicY = (y as number) - 6

                      return (
                        <text
                          x={Number(x) + Number(width) / 2}
                          y={dynamicY}
                          fill={color ?? '#fff'}
                          fontSize="10px"
                          color={color ?? '#fff'}
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
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
            ({dataKey, name, stroke, strokeWidth = 3, yAxisId}) => {
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
      </ReactPDFChart>
    )
  },
)

PdfDynamicComposedChart.displayName = 'DynamicComposedChart'

export {PdfDynamicComposedChart}
