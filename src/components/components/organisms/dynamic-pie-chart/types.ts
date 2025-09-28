import type {ChartConfig, ChartContainer} from '@/components/ui/chart'
import type {ComponentProps, ComponentPropsWithRef} from 'react'
import type {LabelList, PieChart} from 'recharts'

export type PieStacks = {
  label: string
  dataKey: string
  name: string
  value?: number
  color: string
  startColor: string
  endColor: string
}

export type DynamicPieChartConfig = ChartConfig & {
  [key: string]: PieStacks
}

export type PieChartProps = Omit<
  ComponentPropsWithRef<typeof ChartContainer>,
  'children'
> & {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  customTooltip?: (props: any) => any
  pieChart: ComponentProps<typeof PieChart>
  label?: Omit<ComponentProps<typeof LabelList>, 'ref'>
  config: DynamicPieChartConfig
  width?: number
  height?: number
}
