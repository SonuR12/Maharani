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

  // Add quantity state
  const [quantity, setQuantity] = useState<number>(1)

  const t = useTranslations()

  const handleAddToCart = async () => {
    try {
      const itemId = await addItem(item, quantity) // Ensure addItem returns a valid ID
      if (itemId) {
        router.push(`/cart/${itemId}`)
      } else {
        toast({
          description: t('Product.Added to Cart')
        })
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred'
      toast({
        variant: 'destructive',
        description: errorMessage
      })
    }
  }

  return minimal
    ? <Button
        className="rounded-md w-auto"
        onClick={() => {
          try {
            addItem(item, 1)
            toast({
              description: t('Product.Added to Cart'),
              action: (
                <Button
                  onClick={() => {
                    router.push('/cart')
                  }}
                >
                  {t('Product.Go to Cart')}
                </Button>
              )
            })
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : 'An unknown error occurred'
            toast({
              variant: 'destructive',
              description: errorMessage
            })
          }
        }}
      >
        {t('Product.Add to Cart')}
      </Button>
    : <div className="w-full space-y-2">
        <Select
          value={quantity.toString()}
          onValueChange={(value: string) => setQuantity(Number(value))}
        >
          <SelectTrigger className="">
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
          onClick={() => {
            try {
              addItem(item, quantity)
              router.push(`/checkout`)
            } catch (error) {
              const errorMessage =
                error instanceof Error
                  ? error.message
                  : 'An unknown error occurred'
              toast({
                variant: 'destructive',
                description: errorMessage
              })
            }
          }}
          className="w-full rounded-full "
        >
          {t('Product.Buy Now')}
        </Button>
      </div>
}
