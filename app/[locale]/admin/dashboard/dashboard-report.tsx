'use client'
import { BadgeDollarSign, Barcode, CreditCard, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { calculatePastDate, formatDateTime, formatNumber } from '@/lib/utils'

import SalesCategoryPieChart from './sales-category-pie-chart'

import React, { useEffect, useState, useTransition } from 'react'
import { DateRange } from 'react-day-picker'
import { getOrderSummary } from '@/lib/actions/order.actions'
import SalesAreaChart from './sales-area-chart'
import { CalendarDateRangePicker } from './date-range-picker'
import { IOrderList } from '@/types'
import ProductPrice from '@/components/shared/product/product-price'
import { Skeleton } from '@/components/ui/skeleton'
import TableChart from './table-chart'

export default function DashboardReport() {
  const t = useTranslations('Admin')
  const [date, setDate] = useState<DateRange | undefined>({
    from: calculatePastDate(30),
    to: new Date()
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<{ [key: string]: any }>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition()
  useEffect(
    () => {
      if (date) {
        startTransition(async () => {
          setData(await getOrderSummary(date))
        })
      }
    },
    [date]
  )

  if (!data)
    return (
      <section className="w-full my-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="h1-bold text-xl">
            {t('Dashboard')}
          </h1>
          <CalendarDateRangePicker defaultDate={date} setDate={setDate} />
        </div>
        <div className="space-y-4">
          <div className="grid gap-4  grid-cols-2 lg:grid-cols-4">
            <Link className="text-xs" href="/admin/orders">
              <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 border-none drop-shadow-xl">
                <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-28" />
                  </CardTitle>
                  <Skeleton className="h-4 w-5" />
                </CardHeader>
                <CardContent className="p-4 py-2 sm:px-4 sm:py-6 space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-28" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link className="text-xs" href="/admin/orders">
              <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 border-none drop-shadow-xl">
                <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-28" />
                  </CardTitle>
                  <Skeleton className="h-4 w-5" />
                </CardHeader>
                <CardContent className="p-4 py-2 sm:px-4 sm:py-6 space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-28" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link className="text-xs" href="/admin/users">
              <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 border-none drop-shadow-xl">
                <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-28" />
                  </CardTitle>
                  <Skeleton className="h-4 w-5" />
                </CardHeader>
                <CardContent className="p-4 py-2 sm:px-4 sm:py-6 space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-28" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link className="text-xs" href="/admin/products">
              <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 border-none drop-shadow-xl">
                <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-28" />
                  </CardTitle>
                  <Skeleton className="h-4 w-5" />
                </CardHeader>
                <CardContent className="p-4 py-2 sm:px-4 sm:py-6 space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-28" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div>
            {/* Sales Overview */}
            <Card className="border-none drop-shadow-xl">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-40" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-96 w-full" />
                {/* <SalesAreaChart data={data.salesChartData} /> */}
              </CardContent>
            </Card>
          </div>

          {/* How much you’re earning */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-none drop-shadow-xl">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-44" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-5 w-40" />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                {/* <TableChart data={data.monthlySales} labelType="month" /> */}
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </CardContent>
            </Card>

            {/* Product Performance */}
            <Card className="border-none drop-shadow-xl">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-40" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-5 w-44" />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                {/* <TableChart data={data.topSalesProducts} labelType="product" /> */}
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Best-Selling Categories */}
            <Card className="border-none drop-shadow-xl !w-[92vw] sm:!w-full">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-40" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-96 w-full" />
              </CardContent>
            </Card>

            {/* Recent Sales */}
            <Card className="border-none drop-shadow-xl !w-[92vw] sm:!w-full">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-40" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Skeleton className="h-5 w-12" />
                      </TableHead>
                      <TableHead>
                        <Skeleton className="h-5 w-12" />
                      </TableHead>
                      <TableHead>
                        <Skeleton className="h-5 w-12" />
                      </TableHead>
                      <TableHead>
                        <Skeleton className="h-5 w-12" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full my-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="h1-bold text-xl">
          {t('Dashboard')}
        </h1>
        <CalendarDateRangePicker defaultDate={date} setDate={setDate} />
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Link className="text-xs" href="/admin/orders">
            <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 border-none drop-shadow-xl">
              <CardHeader className="p-4 sm:p-6 sm:px-4 flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('Total Revenue')}
                </CardTitle>
                <BadgeDollarSign />
              </CardHeader>
              <CardContent className="p-4 py-2 sm:p-4 space-y-2 overflow-x-scroll">
                <div className="text-lg sm:text-2xl font-bold">
                  <ProductPrice price={data.totalSales} plain />
                </div>
                <div>
                  {t('View revenue')}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link className="text-xs" href="/admin/orders">
            <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 border-none drop-shadow-xl">
              <CardHeader className="p-4 sm:p-6 sm:px-4  flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('Orders')}
                </CardTitle>
                <CreditCard />
              </CardHeader>
              <CardContent className="p-4 py-2 sm:p-4 space-y-2 overflow-x-scroll">
                <div className="text-lg sm:text-2xl font-bold">
                  {formatNumber(data.ordersCount)}
                </div>
                <div>
                  {t('View orders')}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link className="text-xs" href="/admin/users">
            <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 border-none drop-shadow-xl">
              <CardHeader className="p-4 py-2 sm:p-6 sm:px-4  flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium select-none">
                  {t('Customers')}
                </CardTitle>
                <Users />
              </CardHeader>
              <CardContent className="p-4 sm:p-4 space-y-2 overflow-x-scroll">
                <div className="text-lg sm:text-2xl font-bold">
                  {data.usersCount}
                </div>
                <div>
                  {t('View customers')}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link className="text-xs" href="/admin/products">
            <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 border-none drop-shadow-xl">
              <CardHeader className="p-4 py-2 sm:p-6 sm:px-4 flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium select-none">
                  {t('Products')}
                </CardTitle>
                <Barcode />
              </CardHeader>
              <CardContent className="p-4 sm:p-4 space-y-2 overflow-x-scroll">
                <div className="text-lg sm:text-2xl font-bold">
                  {data.productsCount}
                </div>
                <div>
                  {t('View products')}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div>
          <Card className="border-none drop-shadow-xl">
            <CardHeader>
              <CardTitle className="select-none">
                {t('Sales Overview')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SalesAreaChart data={data.salesChartData} />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-none drop-shadow-xl">
            <CardHeader>
              <CardTitle className="select-none">
                {t('How much you’re earning')}
              </CardTitle>
              <CardDescription>
                {t('Estimated')} · {t('Last 6 months')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TableChart data={data.monthlySales} labelType="month" />
            </CardContent>
          </Card>
          <Card className="border-none drop-shadow-xl">
            <CardHeader>
              <CardTitle className="select-none">
                {t('Product Performance')}
              </CardTitle>
              <CardDescription>
                {formatDateTime(date!.from!).dateOnly} to{' '}
                {formatDateTime(date!.to!).dateOnly}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TableChart data={data.topSalesProducts} labelType="product" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-none drop-shadow-xl !w-[92vw] sm:!w-full">
            <CardHeader>
              <CardTitle className="select-none">
                {t('Best-Selling Categories')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SalesCategoryPieChart data={data.topSalesCategories} />
            </CardContent>
          </Card>
          <Card className="border-none drop-shadow-xl !w-[92vw] sm:!w-full">
            <CardHeader>
              <CardTitle className="select-none">
                {t('Recent Sales')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="select-none">
                    <TableHead>
                      {t('Buyer')}
                    </TableHead>
                    <TableHead>
                      {t('Date')}
                    </TableHead>
                    <TableHead>
                      {t('Total')}
                    </TableHead>
                    <TableHead>
                      {t('Actions')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.latestOrders.map((order: IOrderList) =>
                    <TableRow key={order._id}>
                      <TableCell>
                        {order.user ? order.user.name : t('Deleted User')}
                      </TableCell>

                      <TableCell>
                        {formatDateTime(order.createdAt).dateOnly}
                      </TableCell>
                      <TableCell>
                        <ProductPrice price={order.totalPrice} plain />
                      </TableCell>

                      <TableCell>
                        <Link href={`/admin/orders/${order._id}`}>
                          <span className="px-2 hover:text-primary">
                            {t('Details')}
                          </span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  )
}
