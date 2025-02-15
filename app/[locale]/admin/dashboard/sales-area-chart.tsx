/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import ProductPrice from '@/components/shared/product/product-price'
import { Card, CardContent } from '@/components/ui/card'
import useColorStore from '@/hooks/use-color-store'
import { formatDateTime } from '@/lib/utils'
import { useTheme } from 'next-themes'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from 'recharts'

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label
}) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className="p-2">
          <p>
            {label && formatDateTime(new Date(label)).dateOnly}
          </p>
          <p className="text-primary text-xl">
            <ProductPrice price={payload[0].value} plain />
          </p>
        </CardContent>
      </Card>
    )
  }
  return null
}

const CustomXAxisTick: React.FC<any> = ({ x, y, payload }) => {
  return (
    <text x={x} y={y + 10} textAnchor="left" fill="#666" className="text-xs">
      {formatDateTime(new Date(payload.value)).dateOnly}
    </text>
  )
}

// const STROKE_COLORS: { [key: string]: { [key: string]: string } } = {
//   Red: { light: '#980404', dark: '#ff3333' },
//   Green: { light: '#015001', dark: '#06dc06' },
//   Gold: { light: '#ac9103', dark: '#f1d541' }
// }

export default function SalesBarChart({ data }: { data: any[] }) {
  const { theme } = useTheme()
  const {
    cssColors
    // color
  } = useColorStore(theme)

  // Sort data by date in ascending order
  const sortedData = React.useMemo(
    () => {
      return data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    },
    [data]
  )

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={sortedData} barCategoryGap="5%" barGap={0}>
        <CartesianGrid
          horizontal={true}
          vertical={false}
          stroke="transparent"
        />
        <XAxis dataKey="date" tick={<CustomXAxisTick />} interval={0} />
        <YAxis fontSize={12} tickFormatter={(value: number) => `$${value}`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="totalSales"
          fill={`hsl(${cssColors['--primary']})`}
          barSize={40}
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
