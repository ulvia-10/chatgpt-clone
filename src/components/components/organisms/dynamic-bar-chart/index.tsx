import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {cn} from '@/lib/utils'
import type {UIEvent} from 'react'
import {forwardRef, useEffect, useId, useRef, useState} from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type {BarRectangleItem} from 'recharts/types/cartesian/Bar'
import {BarChartGradient} from './bar-chart-gradient'
import type {BarChartProps, BarStacks} from './types'

const DynamicBarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      customTooltip: CustomTooltip,
      barChart,
      xAxis,
      yAxis,
      cartesianGrid,
      tooltip,
      containerClassName,
      barDisplayed = 10,
      className,
      bar3D,
      vertical = false,
      barRadius,
      hasSelection,
      label,
      onLoadMore,
      hasMore = false,
      isLoading = false,
      resetSelection,
      fixedWidth = false,
      ...props
    }: BarChartProps,
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const responsiveRef = useRef<HTMLDivElement>(null)
    const [selectTooltip, setSelectTooltip] = useState('')

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const padArray = (arr: any[] | undefined) => {
      const minLength = barDisplayed
      if (!arr) {
        return []
      }

      return [
        ...arr,
        ...new Array(Math.max(0, minLength - arr.length)).fill(null),
      ]
    }

    useEffect(() => {
      if (resetSelection) {
        setActiveIndex(0)
      }
    }, [resetSelection])

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
      if (!vertical || !onLoadMore || !hasMore) {
        return
      }

      const {scrollTop, scrollHeight, clientHeight} = event.currentTarget
      if (scrollHeight - scrollTop <= clientHeight * 1.2) {
        onLoadMore()
      }
    }

    const stackId = useId()
    const totalBars = padArray(barChart.data).length || 0
    const containerWidth =
      totalBars > barDisplayed ? `${(totalBars / barDisplayed) * 100}%` : '100%'

    useEffect(() => {
      const container = responsiveRef.current
      if (!container || vertical || !onLoadMore || !hasMore) {
        return
      }

      const handleScroll = () => {
        const scrollLeft = container.scrollLeft
        const scrollWidth = container.scrollWidth
        const clientWidth = container.clientWidth

        if (scrollWidth - scrollLeft <= clientWidth * 1.2) {
          onLoadMore()
        }
      }

      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }, [vertical, onLoadMore, hasMore])

    return (
      <div className="relative w-full">
        {isLoading && (
          <div
            className="absolute h-full text-center flex items-center justify-center w-full top-0 left-0 inset-0 bg-white/80 pointer-events-none z-[100] transition-opacity duration-200"
            style={{
              opacity: 1,
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-700">Please Wait</span>
              <span className="text-sm text-gray-500">
                Loading chart data...
              </span>
            </div>
          </div>
        )}
        <ResponsiveContainer
          width="100%"
          height="100%"
          className={cn(
            vertical ? 'overflow-y-auto' : 'overflow-x-auto relative z-10',
          )}
          ref={responsiveRef}
        >
          <div
            className={cn(
              'h-[250px]',
              vertical
                ? 'overflow-x-hidden overflow-y-auto pb-6'
                : 'overflow-x-auto overflow-y-hidden',
              containerClassName,
            )}
            style={{
              width: fixedWidth ? '100%' : vertical ? '100%' : containerWidth,
            }}
            onScroll={handleScroll}
          >
            <ChartContainer
              ref={ref}
              className={cn(
                'max-h-[250px] w-full relative',
                vertical && 'vertical-chart',
                className,
              )}
              style={
                vertical && totalBars >= barDisplayed
                  ? {
                      ['--chart-height' as string]: `${totalBars * 40}px`,
                      paddingBottom: '20px',
                    }
                  : {
                      ['--chart-weight' as string]: `${totalBars < 10 ? 200 : 300}px`,
                    }
              }
              {...props}
            >
              <BarChart
                accessibilityLayer
                layout={vertical ? 'vertical' : 'horizontal'}
                {...barChart}
                data={padArray(barChart.data)}
                onClick={(nextState, event) => {
                  if (barChart.onClick) {
                    barChart.onClick(nextState, event)
                    setActiveIndex(nextState.activeTooltipIndex!)
                  }
                }}
              >
                {tooltip && (
                  <ChartTooltip
                    cursor={false}
                    content={props =>
                      CustomTooltip ? (
                        <CustomTooltip
                          selectTooltip={selectTooltip}
                          {...props}
                        />
                      ) : (
                        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                        <ChartTooltipContent {...(props as any)} />
                      )
                    }
                  />
                )}
                <CartesianGrid
                  vertical={false}
                  horizontal={false}
                  {...cartesianGrid}
                />
                {xAxis && (
                  <XAxis
                    tick={
                      fixedWidth
                        ? undefined
                        : props => {
                            const {x, y, payload, index} = props
                            const text = payload.value
                            const isActive = index === activeIndex

                            const lines = text.match(/.{1,15}/g) || [text]

                            return (
                              <g>
                                {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                                {lines.map((line: any, i: number) => (
                                  <text
                                    key={i}
                                    x={x}
                                    y={y + i * 12}
                                    dy={4}
                                    fontSize={10}
                                    textAnchor="middle"
                                    fontWeight={
                                      isActive && hasSelection
                                        ? 'bold'
                                        : 'normal'
                                    }
                                    fill={
                                      isActive && hasSelection ? '#000' : '#333'
                                    }
                                  >
                                    {line}
                                  </text>
                                ))}
                              </g>
                            )
                          }
                    }
                    tickLine={false}
                    tickMargin={fixedWidth ? 20 : 12}
                    axisLine={false}
                    fontSize={10}
                    angle={-50}
                    {...xAxis}
                  />
                )}
                {yAxis && (
                  <YAxis
                    tickLine={false}
                    tickMargin={12}
                    axisLine={false}
                    fontSize={10}
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
                          x={vertical ? x + -50 : x + 5}
                          y={y}
                          dy={4}
                          textAnchor={vertical ? 'start' : 'end'}
                          fontSize={10}
                          fill="#666"
                        >
                          {displayText}
                        </text>
                      )
                    }}
                    {...yAxis}
                  />
                )}
                {(Object.values(props.config) as BarStacks[]).map(
                  ({dataKey, name, color, startColor, endColor, radius}) => (
                    <Bar
                      key={dataKey}
                      dataKey={dataKey}
                      cursor="pointer"
                      name={name}
                      stackId={stackId}
                      fill={`url(#gradient-${dataKey})`}
                      radius={barRadius || radius}
                      isAnimationActive={false}
                      onMouseEnter={e =>
                        setSelectTooltip(e.tooltipPayload[0].name)
                      }
                      shape={(props: unknown) => {
                        return (
                          <BarChartGradient
                            startColor={startColor!}
                            endColor={endColor!}
                            bar3D={bar3D}
                            vertical={vertical}
                            hasSelection={hasSelection}
                            isActive={
                              (props as {index: number}).index === activeIndex
                            }
                            {...(props as BarRectangleItem)}
                          />
                        )
                      }}
                    >
                      {padArray(barChart.data).map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          cursor="pointer"
                          capHeight={0}
                        />
                      ))}

                      {label && (
                        <LabelList
                          dataKey={dataKey}
                          position={label?.position || 'inside'}
                          content={({
                            x,
                            y,
                            width,
                            height,
                            value,
                            formatter,
                          }) => {
                            if (value === 0) {
                              return null
                            }
                            const dynamicY =
                              label?.position === 'top'
                                ? (y as number) - 6
                                : (y as number) + (height as number) / 2

                            return (
                              <g>
                                <text
                                  style={{
                                    fill: color,
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                  }}
                                  x={
                                    ((x as number) +
                                      (width as number) / 2) as number
                                  }
                                  y={dynamicY}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  {formatter ? formatter(value) : value}
                                </text>
                              </g>
                            )
                          }}
                          {...label}
                        />
                      )}
                    </Bar>
                  ),
                )}
              </BarChart>
            </ChartContainer>
          </div>
        </ResponsiveContainer>
      </div>
    )
  },
)

export {DynamicBarChart}
