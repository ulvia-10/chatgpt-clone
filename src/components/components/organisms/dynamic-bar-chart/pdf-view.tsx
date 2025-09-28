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
import {BarChartGradientPDF} from './bar-chart-gradient-pdf'
import type {BarChartProps, BarStacks} from './types'

const DynamicBarChartPDF = forwardRef<HTMLDivElement, BarChartProps>(
  ({
    customTooltip: CustomTooltip,
    barChart,
    xAxis,
    yAxis,
    cartesianGrid,
    bar3D,
    vertical = false,
    barRadius,
    label,
    width = 160,
    height = 150,
    barDisplayed = 10,
    isRotateXLabel,
    ...props
  }: BarChartProps) => {
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

    return (
      <ReactPDFChart>
        <BarChart
          width={width}
          height={height}
          accessibilityLayer
          layout={vertical ? 'vertical' : 'horizontal'}
          data={padArray(barChart.data)}
          {...barChart}
        >
          <CartesianGrid
            vertical={false}
            horizontal={false}
            {...cartesianGrid}
          />
          {xAxis && (
            <XAxis
              tick={props => {
                if (isRotateXLabel && yAxis) {
                  const {x, y, payload} = props
                  const text = payload.value
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        transform="rotate(-90)"
                        x={0}
                        y={0}
                        dy={4}
                        textAnchor="end"
                        fontSize={yAxis.fontSize ?? 8}
                        fill="#333"
                      >
                        {text}
                      </text>
                    </g>
                  )
                } else {
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
                }
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
              axisLine={false}
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
                stackId={'stack'}
                isAnimationActive={false}
                shape={(props: unknown) => (
                  <BarChartGradientPDF
                    startColor={startColor!}
                    endColor={endColor!}
                    bar3D={bar3D}
                    vertical={vertical}
                    radius={barRadius || radius}
                    {...(props as BarRectangleItem)}
                  />
                )}
              >
                {padArray(barChart.data).map((_, index) => (
                  <Cell key={`cell-${index}`} cursor="pointer" capHeight={0} />
                ))}
                {label && (
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
                            x={
                              ((x as number) + (width as number) / 2) as number
                            }
                            y={dynamicY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {formatter
                              ? formatter(value)
                              : typeof value === 'number' && isFinite(value)
                                ? value.toFixed(2)
                                : 'N/A'}
                          </text>
                        </g>
                      )
                    }}
                    {...label} // Spread the label prop to pass additional configurations
                  />
                )}
              </Bar>
            ),
          )}
        </BarChart>
      </ReactPDFChart>
    )
  },
)

export {DynamicBarChartPDF}
