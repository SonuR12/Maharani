/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useTheme } from 'next-themes'
import React from 'react'
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'

export default function SalesCategoryPieChart({ data }: { data: any[] }) {
  const { theme } = useTheme()

  const colors = [
    'hsl(330, 100%, 70%)', // Pink
    'hsl(200, 100%, 70%)', // Light Blue
    'hsl(120, 100%, 70%)', // Light Green
    'hsl(60, 100%, 70%)', // Light Yellow
    'hsl(30, 100%, 70%)' // Light Orange
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
        fill={theme === 'dark' ? 'white' : 'black'}
      >
        {`${data[index]._id} ${data[index].totalSales} sales`}
      </text>
    )
  }

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="totalSales"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            innerRadius="50%"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((_, index) =>
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            )}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
