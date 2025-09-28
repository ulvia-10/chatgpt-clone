import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {forwardRef, useState} from 'react'
import {Cell, LabelList, Pie, PieChart} from 'recharts'
import type {PieChartProps, PieStacks} from './types'

const DynamicPieChart = forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      pieChart,
      config,
      label,
      customTooltip: CustomTooltip,
      ...props
    }: PieChartProps,
    ref,
  ) => {
    const arrConfig = Object.values(config) as PieStacks[]
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    return (
      <ChartContainer ref={ref} config={config} {...props}>
        <PieChart accessibilityLayer {...pieChart}>
          <defs>
            {arrConfig.map(({startColor, endColor}, index) => {
              const gradientId = `gradient-${index}`

              return (
                <linearGradient
                  id={gradientId}
                  key={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={startColor} />
                  <stop offset="100%" stopColor={endColor} />
                </linearGradient>
              )
            })}
            <filter id="shadow" x="-100%" y="-100%" width="300%" height="300%">
              <feOffset dx="0" dy="0" />
              <feGaussianBlur stdDeviation="8" result="offset-blur" />
              <feComposite
                operator="out"
                in="SourceGraphic"
                in2="offset-blur"
                result="inverse"
              />
              <feFlood floodColor="black" floodOpacity="0.95" result="color" />
              <feComposite
                operator="in"
                in="color"
                in2="inverse"
                result="shadow"
              />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>

          <Pie
            data={pieChart.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            dataKey={arrConfig[0].dataKey}
            nameKey={arrConfig[0].name}
            isAnimationActive={false}
          >
            {pieChart.data?.map((_, index) => {
              const gradientId = `gradient-${index}`
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#${gradientId})`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  style={{
                    filter: activeIndex === index ? 'url(#shadow)' : 'none',
                    cursor: 'pointer',
                    isolation: 'isolate',
                  }}
                />
              )
            })}
            {label && (
              <LabelList
                dataKey={arrConfig[0].dataKey}
                position="inside"
                style={{isolation: 'isolate', mixBlendMode: 'normal'}}
                {...label}
              />
            )}
          </Pie>

          <ChartTooltip
            cursor={false}
            content={props =>
              CustomTooltip ? (
                <CustomTooltip {...props} />
              ) : (
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                <ChartTooltipContent {...(props as any)} />
              )
            }
          />
        </PieChart>
      </ChartContainer>
    )
  },
)

DynamicPieChart.displayName = 'DynamicPieChart'

export {DynamicPieChart}
