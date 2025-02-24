'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { IOrder } from '@/lib/db/models/order.model'
import { cn, formatDateTime } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import ProductPrice from '../product/product-price'
import ActionButton from '../action-button'
import { deliverOrder, updateOrderToPaid, uploadInvoice } from '@/lib/actions/order.actions'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { IoClose } from 'react-icons/io5'
import { toast } from '@/hooks/use-toast'

export default function OrderDetailsForm({
  order,
  isAdmin
}: {
  order: IOrder
  isAdmin: boolean
}) {
  const [loading, setLoading] = useState(true)

  useEffect(
    () => {
      if (order) {
        setLoading(false)
      }
    },
    [order]
  )

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference for input field

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Generate preview URL for images or PDFs
      if (selectedFile.type.startsWith("image/") || selectedFile.type === "application/pdf") {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null); // No preview for unsupported file types
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    
    // Reset the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form from reloading the page

    if (!file) return;

    try {
      const response = await uploadInvoice(order._id, file);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast({
        variant:'success',
        description:'Invoice uploaded successfully'
      });
      console.log('Invoice uploaded successfully:', response.message);
    } catch (error) {
      toast({
        variant:'destructive',
        description:'Error uploading invoice'});
      console.error('Error uploading invoice:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="overflow-x-auto md:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <div className="flex flex-col gap-1">
                <div>
                  <Skeleton className="w-1/2 h-5" />
                </div>
                <div>
                  <Skeleton className="w-1/2 h-5" />
                </div>
                <div>
                  <Skeleton className="w-1/2 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <div className="flex flex-col gap-1">
                <div>
                  <Skeleton className="w-1/2 h-5" />
                </div>
                <div>
                  <Skeleton className="w-1/2 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price(1)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="hover:!bg-transparent hover:!cursor-default">
                  <TableRow>
                    <TableCell>
                      <span className="flex gap-2 items-center">
                        <Skeleton className="w-full h-10" />
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2">
                        <Skeleton className="w-1/2 h-5" />
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="px-2">
                        <Skeleton className="w-1/2 h-5" />
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-4 space-y-4 gap-4">
              <h2 className="text-xl pb-4">Order Summary</h2>
              <div className="flex justify-between">
                <div>Price</div>
                <Skeleton className="w-1/2" />
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <Skeleton className="w-1/2" />
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <Skeleton className="w-1/2" />
              </div>
              <Separator />
              <div className="flex justify-between">
                <div>Total Payable Amount</div>
                <Skeleton className="w-1/2" />
              </div>
              <Skeleton className="w-1/2" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    expectedDeliveryDate
  } = order

  return (
    <div className="grid md:grid-cols-3 md:gap-5">
      <div className="overflow-x-auto md:col-span-2 space-y-4">
        <Card>
          <CardContent className="p-4 gap-4">
            <h2 className="text-xl pb-4">Shipping Address</h2>
            <p>
              {shippingAddress.fullName} {shippingAddress.phone}
            </p>
            <p>
              {shippingAddress.street}, {shippingAddress.city},{' '}
              {shippingAddress.province}, {shippingAddress.postalCode},{' '}
              {shippingAddress.country}
            </p>

            {isDelivered
              ? <Badge>
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              : <div>
                  <Badge variant="destructive">Not delivered</Badge>
                  <div>
                    Expected delivery at{' '}
                    {formatDateTime(expectedDeliveryDate!).dateTime}
                  </div>
                </div>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 gap-4">
            <h2 className="text-xl pb-4">Payment Method</h2>
            <p>
              {paymentMethod}
            </p>
            {isPaid
              ? <Badge>
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              : <Badge variant="destructive">Not paid</Badge>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 gap-4">
            <h2 className="text-xl pb-4">Order Items</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price(1)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="hover:!bg-transparent hover:!cursor-default">
                {items.map(item =>
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">
                          {item.name}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className="px-2">
                        {item.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <ProductPrice price={item.price} plain />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-col gap-2'>
        <Card>
          <CardContent className="p-4 space-y-4 gap-4">
            <h2 className="text-xl pb-4">Order Summary</h2>
            <div className="flex justify-between">
              <div>Price</div>
              <ProductPrice price={itemsPrice} plain />
            </div>
            <div className="flex justify-between">
              <div>Tax</div>
              <ProductPrice price={taxPrice} plain />
            </div>
            <div className="flex justify-between">
              <div>Shipping</div>
              <ProductPrice price={shippingPrice} plain />
            </div>
            <Separator />
            <div className="flex justify-between">
              <div>Total Payable Amount</div>
              <ProductPrice price={totalPrice} plain />
            </div>
            {!isPaid &&
              ['Stripe', 'PayPal'].includes(paymentMethod) &&
              <Link
                className={cn(buttonVariants(), 'w-full')}
                href={`/checkout/${order._id}`}
              >
                Pay Order
              </Link>}
            {isAdmin &&
              !isPaid &&
              paymentMethod === 'Cash On Delivery' &&
              <ActionButton
                caption="Mark as paid"
                action={() => updateOrderToPaid(order._id)}
              />}
            {isAdmin &&
              isPaid &&
              !isDelivered &&
              <ActionButton
                caption="Mark as delivered"
                action={() => deliverOrder(order._id)}
              />}
          </CardContent>
        </Card>

        {isAdmin && !isDelivered && (
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl pb-4">Invoice</h2>

              <form onSubmit={handleUpload} className='space-y-2'>
                {/* File Input */}
                <Input
                  className='border-2 border-solid !border-black cursor-pointer' 
                  type="file" 
                  accept="image/*, application/pdf" 
                  onChange={handleFileChange} 
                  ref={fileInputRef} // Attach ref to input
                />

                {/* File Preview Section */}
                {preview && (
                  <div className="relative mt-4 w-full max-w-lg border rounded-lg overflow-hidden">
                    {/* Close Button */}
                    <Button 
                      className="absolute top-0 right-0 bg-white text-black p-2 rounded-tl-none rounded-br-none rounded-bl-lg text-sm hover:bg-gray-100"
                      onClick={removeFile} // Remove file on click
                    >
                      <IoClose />
                    </Button>

                    {/* Image Preview */}
                    {file?.type.startsWith("image/") ? (
                      <Image height={500} width={500} src={preview} alt="File Preview" className="w-full h-auto rounded-lg shadow-md" />
                    ) : (
                      /* PDF Preview */
                      <iframe src={preview} className="w-full h-64 border rounded-md"></iframe>
                    )}
                  </div>
                )}
                
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {!isAdmin && (
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl pb-4">Invoice</h2>
              {/* Display the invoice for the user */}
              {preview && (
                <div className="relative mt-4 w-full max-w-lg border rounded-lg overflow-hidden">
                  {/* Image Preview */}
                  {file?.type.startsWith("image/") ? (
                    <Image height={500} width={500} src={preview} alt="File Preview" className="w-full h-auto rounded-lg shadow-md" />
                  ) : (
                    /* PDF Preview */
                    <iframe src={preview} className="w-full h-64 border rounded-md"></iframe>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {preview && isDelivered && (
                  <div className="relative mt-4 w-full max-w-lg border rounded-lg overflow-hidden">
                    {/* Close Button */}
                   

                    {/* Image Preview */}
                    {file?.type.startsWith("image/") ? (
                      <Image height={500} width={500} src={preview} alt="File Preview" className="w-full h-auto rounded-lg shadow-md" />
                    ) : (
                      /* PDF Preview */
                      <iframe src={preview} className="w-full h-64 border rounded-md"></iframe>
                    )}
                  </div>
          )}
      </div>
    </div>
  )
}
