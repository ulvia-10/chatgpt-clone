import {forwardRef} from 'react'
import ReactPDFChart from 'react-pdf-charts'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts'
import type {BarRectangleItem} from 'recharts/types/cartesian/Bar'
import {BarChartGradient} from '../dynamic-bar-chart/bar-chart-gradient'
import type {BarChartProps, BarStacks} from '../dynamic-bar-chart/types'

const PdfDynamicBarChart = forwardRef<HTMLDivElement, BarChartProps>(
  ({
    barChart,
    xAxis,
    yAxis,
    cartesianGrid,
    activeIndex,
    tooltip,
    containerClassName,
    barChartShow = 10,
    barDisplayed = 10,
    className,
    bar3D,
    barRadius,
    hasSelection,
    label,
    width = 530,
    height = 200,
    ...props
  }: BarChartProps) => {
    return (
      <ReactPDFChart>
        <BarChart
          width={width}
          height={height}
          accessibilityLayer
          margin={{top: 15, right: 0, left: 0, bottom: 0}}
          {...barChart}
        >
          <defs>
            {(Object.values(props.config) as BarStacks[]).map(
              ({dataKey, startColor, endColor}) => (
                <linearGradient
                  key={`gradient-${dataKey}`}
                  id={`gradient-${dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={startColor} />
                  <stop offset="100%" stopColor={endColor} />
                </linearGradient>
              ),
            )}
          </defs>
          <CartesianGrid
            vertical={false}
            horizontal={false}
            {...cartesianGrid}
          />
          {xAxis && (
            <XAxis
              tick={props => {
                const {x, y, payload} = props
                const text = payload.value
                const maxLength = xAxis.maxLength ?? 15
                const displayText =
                  text.length > maxLength
                    ? `${text.slice(0, maxLength)}...`
                    : text

                return (
                  <text
                    x={x}
                    y={y + 6}
                    dy={4}
                    fontSize={xAxis.fontSize ?? 8}
                    textAnchor="middle"
                    fontWeight={'normal'}
                    fill={'#333'}
                  >
                    {displayText}
                  </text>
                )
              }}
              tickLine={false}
              axisLine={false}
              fontSize={6}
              textAnchor="middle"
              interval={0}
              {...xAxis}
            />
          )}
          {yAxis && (
            <YAxis
              tickLine={false}
              tickMargin={12}
              axisLine={{stroke: '#ECECEC', strokeWidth: 0.5}}
              fontSize={10}
              interval={0}
              tick={props => {
                const {x, y, payload} = props
                const text = payload.value
                const averageCharWidth = 4.5
                const maxPixelWidth = 25
                const maxLength = Math.floor(maxPixelWidth / averageCharWidth)
                const displayText =
                  text.length > maxLength
                    ? `${text.slice(0, maxLength)}...`
                    : text

                return (
                  <text
                    x={x}
                    y={y}
                    dy={4}
                    textAnchor="end"
                    fontSize={yAxis.fontSize ?? 8}
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
                isAnimationActive={false}
                stackId="a"
                fill={`url(#gradient-${dataKey})`}
                radius={barRadius || radius}
                {...(hasSelection
                  ? {}
                  : {
                      shape: (props: unknown) => (
                        <BarChartGradient
                          startColor={startColor || '#000000'}
                          endColor={endColor || '#000000'}
                          bar3D={bar3D}
                          {...(props as BarRectangleItem)}
                        />
                      ),
                    })}
              >
                {barChart.data?.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    cursor="pointer"
                    stroke={
                      index === activeIndex
                        ? 'rgba(255, 234, 0, 0.5)'
                        : undefined
                    }
                    strokeWidth={index === activeIndex ? 2 : 0}
                    capHeight={0}
                  />
                ))}
                <LabelList
                  dataKey={dataKey}
                  position={label?.position || 'inside'}
                  content={({x, y, width, height, value, formatter}) => {
                    const dynamicY =
                      label?.position === 'top'
                        ? (y as number) - 6
                        : (y as number) + (height as number) / 2

                    return (
                      <g>
                        <text
                          style={{
                            fill: color,
                            fontSize: '6px',
                            fontWeight: 'bold',
                          }}
                          x={((x as number) + (width as number) / 2) as number}
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
              </Bar>
            ),
          )}
        </BarChart>
      </ReactPDFChart>
    )
  },
)

export {PdfDynamicBarChart}
