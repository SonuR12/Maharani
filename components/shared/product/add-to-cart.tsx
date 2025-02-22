/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import useCartStore from '@/hooks/use-cart-store'
import { useToast } from '@/hooks/use-toast'
import { OrderItem } from '@/types'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface AddToCartProps {
  item: OrderItem
  minimal?: boolean
}

export default function AddToCart({ item, minimal = false }: AddToCartProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState<number>(1)

  const t = useTranslations()

  const handleAddToCart = async () => {
    try {
      await addItem(item, quantity)
      toast({
        action: (
          <div className="flex items-center justify-between space-x-4 w-full">
            <span className="text-sm">
              {t('Product.Added to Cart')}
            </span>
            <Button
              onClick={() => router.push('/cart')}
              className="bg-primary text-black text-sm px-3 py-1"
            >
              View Cart
            </Button>
          </div>
        ),
        duration: 2000
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
        duration: 2000
      })
    }
  }

  const handleBuyNow = async () => {
    try {
      await addItem(item, quantity)
      toast({
        variant: 'success',
        description: t('Product.Added to Cart'),
        duration: 2000
      })
      setTimeout(() => {
        router.push('/checkout')
      }, 500) // Delay to show the toast before navigating
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred'
      })
    }
  }

  return minimal
    ? <Button
        className="rounded-md w-auto"
        onClick={async () => {
          try {
            await addItem(item, 1)
            toast({
              action: (
                <div className="flex items-center justify-between space-x-4 w-full">
                  <span className="text-sm">
                    {t('Product.Added to Cart')}
                  </span>
                  <Button
                    onClick={() => router.push('/cart')}
                    className="bg-primary text-black text-sm px-3 py-1"
                  >
                    View Cart
                  </Button>
                </div>
              ),
              duration: 2000
            })
          } catch (error) {
            toast({
              variant: 'destructive',
              description:
                error instanceof Error
                  ? error.message
                  : 'An unknown error occurred'
            })
          }
        }}
      >
        {t('Product.Add to Cart')}
      </Button>
    : <div className="w-full space-y-2">
        <Select
          value={quantity.toString()}
          onValueChange={value => setQuantity(Number(value))}
        >
          <SelectTrigger>
            <SelectValue>
              {t('Product.Quantity')}: {quantity}
            </SelectValue>
          </SelectTrigger>
          <SelectContent position="popper">
            {Array.from({ length: item.countInStock || 1 }).map((_, i) =>
              <SelectItem key={i + 1} value={`${i + 1}`}>
                {i + 1}
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <Button
          className="rounded-full w-full"
          type="button"
          onClick={handleAddToCart}
        >
          {t('Product.Add to Cart')}
        </Button>

        <Button
          variant="secondary"
          className="w-full rounded-full"
          onClick={handleBuyNow}
        >
          {t('Product.Buy Now')}
        </Button>
      </div>
}
