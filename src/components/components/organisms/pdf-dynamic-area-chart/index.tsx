import type {ChartConfig, ChartContainer} from '@/components/ui/chart'
import {format} from 'date-fns'
import {
  type ComponentProps,
  type ComponentPropsWithRef,
  forwardRef,
} from 'react'
import ReactPDFChart from 'react-pdf-charts'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'

export type AreaStacks = {
  dataKey: string
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
  width?: number
  height?: number
  referenceLine?: Omit<ComponentProps<typeof ReferenceLine>, 'ref'>[]
}

const DynamicAreaChartPdf = forwardRef<HTMLDivElement, AreaChartProps>(
  ({
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
    width = 257,
    height = 150,
    ...props
  }: AreaChartProps) => {
    const config = props.config as DynamicAreaChartConfig
    return (
      <ReactPDFChart>
        <AreaChart
          width={width}
          height={height}
          accessibilityLayer
          {...areaChart}
        >
          <Area dataKey="students" fill="green" stroke="green" />
          <CartesianGrid vertical={false} />
          <YAxis
            {...yAxis}
            tickLine={true}
            axisLine={true}
            fontSize={7}
            interval={0}
          />
          <XAxis
            {...xAxis}
            tickLine={false}
            tickMargin={8}
            fontSize={7}
            interval={0}
            textAnchor="middle"
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
              strokeWidth={1.5}
            />
          ))}
          {referenceLine?.flatMap(({...props}, index) => (
            <ReferenceLine key={index.toString()} {...props} />
          ))}
        </AreaChart>
      </ReactPDFChart>
    )
  },
)

DynamicAreaChartPdf.displayName = 'DynamicAreaChartPdf'

export {DynamicAreaChartPdf}
