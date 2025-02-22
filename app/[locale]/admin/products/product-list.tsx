/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'

import DeleteDialog from '@/components/shared/delete-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  deleteProduct,
  getAllProductsForAdmin,
} from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'

import React, { useEffect, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { formatDateTime, formatId } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

type ProductListDataProps = {
  products: IProduct[]
  totalPages: number
  totalProducts: number
  to: number
  from: number
}
const ProductList = () => {
  const [page, setPage] = useState<number>(1)
  const [inputValue, setInputValue] = useState<string>('')
  const [data, setData] = useState<ProductListDataProps>()
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(true)

  const handlePageChange = (changeType: 'next' | 'prev') => {
    const newPage = changeType === 'next' ? page + 1 : page - 1
    setPage(newPage)
    startTransition(async () => {
      setIsLoading(true)
      const data = await getAllProductsForAdmin({
        query: inputValue,
        page: newPage,
      })
      setData(data)
      setIsLoading(false)
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value) {
      clearTimeout((window as any).debounce)
      ;(window as any).debounce = setTimeout(() => {
        startTransition(async () => {
          setIsLoading(true)
          const data = await getAllProductsForAdmin({ query: value, page: 1 })
          setData(data)
          setIsLoading(false)
        })
      }, 500)
    } else {
      startTransition(async () => {
        setIsLoading(true)
        const data = await getAllProductsForAdmin({ query: '', page })
        setData(data)
        setIsLoading(false)
      })
    }
  }

  useEffect(() => {
    startTransition(async () => {
      setIsLoading(true)
      const data = await getAllProductsForAdmin({ query: '' })
      setData(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div>
        <div className='py-4 h-full'>
          <div className='flex-between flex-wrap gap-2'>
            <div className='flex flex-wrap items-center gap-2 '>
              <h1 className='font-bold text-lg select-none'>Products</h1>
              <div className='flex flex-wrap items-center  gap-2 '>
                <Input
                  className='w-72 border border-gray-400'
                  type='text '
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder='Filter name...'
                />
                <Skeleton className='w-28 h-6' />
              </div>
            </div>
            <Button asChild variant='default' className='drop-shadow-xl  bg-yellow-400 hover:bg-yellow-500'>
              <Link href='/admin/products/create'><Skeleton className="h-5 w-24" /></Link>
            </Button>
          </div>
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className='select-none'>
                <TableHead><Skeleton className="h-5 w-12" /></TableHead>
                <TableHead><Skeleton className="h-5 w-12" /></TableHead>
                <TableHead><Skeleton className="h-5 w-12" /></TableHead>
                <TableHead><Skeleton className="h-5 w-12" /></TableHead>
                <TableHead><Skeleton className="h-5 w-12" /></TableHead>
                <TableHead><Skeleton className="h-5 w-12" /></TableHead>
                <TableHead><Skeleton className="h-5 w-12" /></TableHead>
                <TableHead><Skeleton className="h-5 w-12" /></TableHead>
                <TableHead><Skeleton className="h-5 w-12" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.products.map((product: IProduct) => (
                <TableRow key={product._id}>
                  <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                  <TableCell>
                    <Link href={`/admin/products/${product._id}`}>
                    <Skeleton className="h-5 w-60" />
                    </Link>
                  </TableCell>
                  <TableCell className='text-right'><Skeleton className="h-5 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                  <TableCell>
                  <Skeleton className="h-5 w-12" />
                  </TableCell>
                  <TableCell className='flex gap-1'>
                    <Button asChild variant='outline' size='sm' className='drop-shadow-xl'>
                      <Link href={`/admin/products/${product._id}`}><Skeleton className="h-5 w-5" /></Link>
                    </Button>
                    <Button asChild variant='outline' size='sm' className='drop-shadow-xl'>
                      <Link target='_blank' href={`/product/${product.slug}`}><Skeleton className="h-5 w-5" /></Link>
                    </Button>
                    <DeleteDialog 
                      id={product._id}
                      action={deleteProduct}
                      callbackAction={() => {
                        startTransition(async () => {
                          const data = await getAllProductsForAdmin({
                            query: inputValue,
                          })
                          setData(data)
                        })
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          {(data?.totalPages ?? 0) > 1 && (
            <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              onClick={() => handlePageChange('prev')}
              disabled={Number(page) <= 1}
              className='w-24'
            >
              <ChevronLeft /> Previous
            </Button>
            Page {page} of {data?.totalPages}
            <Button
              variant='outline'
              onClick={() => handlePageChange('next')}
              disabled={Number(page) >= (data?.totalPages ?? 0)}
              className='w-24'
            >
              Next <ChevronRight />
            </Button>
          </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className=''>
      <div className='py-4 h-full'>
        <div className='flex-between flex-wrap gap-2'>
          <div className='flex flex-wrap items-center gap-2 '>
            <h1 className='font-bold text-lg select-none'>Products</h1>
            <div className='flex flex-wrap items-center  gap-2 '>
              <Input
                className='w-72 border border-gray-400 input'
                type='text '
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Filter name...'
              />

              <p>
                {data?.totalProducts === 0
                  ? 'No results'
                  : `${data?.from}-${data?.to} of ${data?.totalProducts} results`}
              </p>
            </div>
          </div>

          <Button asChild variant='default' className='drop-shadow-xl  bg-yellow-400 hover:bg-yellow-500'>
            <Link href='/admin/products/create'>Create Product</Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className='select-none'>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='w-full overflow-x-scroll'>
              {data?.products.map((product: IProduct) => (
                <TableRow key={product._id} className='w-[20vw]'>
                  <TableCell>{formatId(product._id)}</TableCell>
                  <TableCell>
                    <Link href={`/admin/products/${product._id}`}>
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell className='text-right'>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.countInStock}</TableCell>
                  <TableCell>{product.avgRating}</TableCell>
                  <TableCell>{product.isPublished ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {formatDateTime(product.updatedAt).dateTime}
                  </TableCell>
                  <TableCell className='flex gap-1'>
                    <Button asChild variant='outline' size='sm' className='drop-shadow-xl'>
                      <Link href={`/admin/products/${product._id}`}>Edit</Link>
                    </Button>
                    <Button asChild variant='outline' size='sm' className='drop-shadow-xl'>
                      <Link target='_blank' href={`/product/${product.slug}`}>View</Link>
                    </Button>
                    <DeleteDialog 
                      id={product._id}
                      action={deleteProduct}
                      callbackAction={() => {
                        startTransition(async () => {
                          const data = await getAllProductsForAdmin({
                            query: inputValue,
                          })
                          setData(data)
                        })
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          {(data?.totalPages ?? 0) > 1 && (
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                onClick={() => handlePageChange('prev')}
                disabled={Number(page) <= 1}
                className='w-24'
              >
                <ChevronLeft /> Previous
              </Button>
              Page {page} of {data?.totalPages}
              <Button
                variant='outline'
                onClick={() => handlePageChange('next')}
                disabled={Number(page) >= (data?.totalPages ?? 0)}
                className='w-24'
              >
                Next <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      </div>
  )
}

export default ProductList

