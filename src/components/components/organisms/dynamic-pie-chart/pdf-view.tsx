import {forwardRef} from 'react'
import ReactPDFChart from 'react-pdf-charts'
import {Cell, LabelList, Pie, PieChart} from 'recharts'
import type {PieChartProps, PieStacks} from './types'

const DynamicPieChartPDF = forwardRef<HTMLDivElement, PieChartProps>(
  ({pieChart, config, label, width = 200, height = 200}: PieChartProps) => {
    const arrConfig = Object.values(config) as PieStacks[]

    return (
      <ReactPDFChart style={{width: width, height: height, display: 'flex'}}>
        <PieChart
          width={width}
          height={height}
          margin={{top: 10, right: 10, bottom: 10, left: 10}}
        >
          <defs>
            {arrConfig.map(({startColor, endColor}, index) => {
              const gradientId = `pieGradient${index}`
              return (
                <linearGradient
                  id={gradientId}
                  key={gradientId}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor={startColor} stopOpacity={1} />
                  <stop offset="100%" stopColor={endColor} stopOpacity={1} />
                </linearGradient>
              )
            })}
          </defs>

          <Pie
            data={pieChart.data}
            cx={'50%'}
            cy={'50%'}
            labelLine={false}
            outerRadius={Math.min(width, height) / 2.5}
            dataKey={arrConfig[0].dataKey}
            nameKey={arrConfig[0].name}
            isAnimationActive={false}
          >
            {pieChart.data?.map((_, index) => {
              const gradientId = `pieGradient${index}`
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#${gradientId})`}
                  stroke="none"
                />
              )
            })}
            <LabelList
              dataKey={arrConfig[0].dataKey}
              position="inside"
              style={{
                isolation: 'isolate',
                mixBlendMode: 'normal',
                fontSize: '7px',
                fontWeight: 'bold',
                stroke: 'none',
              }}
              fill="#FFFFFF"
              {...label}
            />
          </Pie>
        </PieChart>
      </ReactPDFChart>
    )
  },
)

DynamicPieChartPDF.displayName = 'DynamicPieChartPDF'

export {DynamicPieChartPDF}
