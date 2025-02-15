import { Metadata } from 'next'
import Link from 'next/link'

import { auth } from '@/auth'
import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions'
import { formatDateTime, formatId } from '@/lib/utils'
import { IOrderList } from '@/types'
import ProductPrice from '@/components/shared/product/product-price'
import { redirect } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Admin Orders',
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const { page = '1' } = await searchParams

  const session = await auth()
  if (session?.user.role !== 'Admin') {
    redirect('/')
  }

  const orders = await getAllOrders({
    page: Number(page),
  })

  return (
    <div className='py-4'>
      <h1 className='h1-bold text-xl select-none'>Orders</h1>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow className='select-none'>
              <TableHead>Id</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders ? orders.data.map((order: IOrderList) => (
                  <TableRow key={order._id}>
                    <TableCell>{formatId(order._id)}</TableCell>
                    <TableCell>{formatDateTime(order.createdAt!).dateTime}</TableCell>
                    <TableCell>{order.user ? order.user.name : 'Deleted User'}</TableCell>
                    <TableCell><ProductPrice price={order.totalPrice} plain /></TableCell>
                    <TableCell>{order.isPaid && order.paidAt ? formatDateTime(order.paidAt).dateTime : 'No'}</TableCell>
                    <TableCell>{order.isDelivered && order.deliveredAt ? formatDateTime(order.deliveredAt).dateTime : 'No'}</TableCell>
                    <TableCell className='flex gap-1'>
                      <Button asChild variant='outline' size='sm' className='drop-shadow-xl'>
                        <Link href={`/admin/orders/${order._id}`}>Details</Link>
                      </Button>
                      <DeleteDialog id={order._id} action={deleteOrder} />
                    </TableCell>
                  </TableRow>
                ))
              : Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className='h-4 w-16' /></TableCell>
                    <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                    <TableCell><Skeleton className='h-4 w-32' /></TableCell>
                    <TableCell><Skeleton className='h-4 w-16' /></TableCell>
                    <TableCell><Skeleton className='h-4 w-12' /></TableCell>
                    <TableCell><Skeleton className='h-4 w-12' /></TableCell>
                    <TableCell className='flex gap-1'>
                      <Skeleton className='h-8 w-16' />
                      <Skeleton className='h-8 w-16' />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {orders?.totalPages > 1 && <Pagination page={page} totalPages={orders.totalPages!} />}
      </div>
    </div>
  )
}
