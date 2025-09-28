import type {ChartConfig, ChartContainer} from '@/components/ui/chart'
import type {ComponentProps, ComponentPropsWithRef} from 'react'
import type {BarChart, CartesianGrid, LabelList, XAxis, YAxis} from 'recharts'

export type BarStacks = {
  label: string
  dataKey: string
  name: string
  color?: string
  startColor?: string
  endColor?: string
  radius?: [number, number, number, number]
  yAxisId?: string
}

export type DynamicBarChartConfig = ChartConfig & {
  [key: string]: BarStacks
}

export type BarChartProps = Omit<
  ComponentPropsWithRef<typeof ChartContainer>,
  'children'
> & {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  customTooltip?: (props: any) => any
  barChart: ComponentProps<typeof BarChart>
  xAxis?: Omit<ComponentProps<typeof XAxis>, 'ref'> & {maxLength?: number}
  yAxis?: Omit<ComponentProps<typeof YAxis>, 'ref'>
  label?: Omit<ComponentProps<typeof LabelList>, 'ref'>
  cartesianGrid?: ComponentProps<typeof CartesianGrid>
  tooltip?: boolean
  containerClassName?: string
  barDisplayed?: number
  bar3D?: string
  vertical?: boolean
  barRadius?: number | [number, number, number, number] | undefined
  hasSelection?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
  width?: number
  height?: number
  resetSelection?: boolean
  fixedWidth?: boolean
  barChartShow?: number
  activeIndex?: number
  isRotateXLabel?: boolean
}
