import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ISettingInput } from '@/types'
import { TrashIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Skeleton } from '@/components/ui/skeleton'

export default function PaymentMethodForm({
  form,
  id,
  isPending,
}: {
  form: UseFormReturn<ISettingInput>
  id: string
  isPending: boolean
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'availablePaymentMethods',
  })
  const {
    setValue,
    watch,
    control,
    formState: { errors },
  } = form

  const availablePaymentMethods = watch('availablePaymentMethods')
  const defaultPaymentMethod = watch('defaultPaymentMethod')

  useEffect(() => {
    const validNames = availablePaymentMethods.map((method) => method.name)
    if (!validNames.includes(defaultPaymentMethod)) {
      setValue('defaultPaymentMethod', '')
    }
  }, [JSON.stringify(availablePaymentMethods)]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card id={id} className="w-full">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-6'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-center'
            >
              <FormField
                control={form.control}
                name={`availablePaymentMethods.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Name</FormLabel>}
                    <FormControl>
                      <Input className="bg-white dark:bg-gray-950 w-full" {...field} placeholder='Name' />
                    </FormControl>
                    <FormMessage>
                      {errors.availablePaymentMethods?.[index]?.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`availablePaymentMethods.${index}.commission`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Commission</FormLabel>}
                    <FormControl>
                      <Input className="bg-white dark:bg-gray-950 w-full" {...field} placeholder='Commission' />
                    </FormControl>
                    <FormMessage>
                      {errors.availablePaymentMethods?.[index]?.commission?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
               <div>
                {index == 0 && <div>Action</div>}
                <Button
                  type='button'
                  disabled={fields.length === 1}
                  variant='outline'
                  className={index == 0 ? 'mt-2' : ''}
                  onClick={() => {
                    remove(index)
                  }}
                >
                  <TrashIcon className='w-4 h-4' />
                </Button>
              </div>
            </div>
          ))}

          <Button
            type='button'
            variant={'outline'}
            className='w-full sm:w-auto'
            onClick={() => append({ name: '', commission: 0 })}
          >
            Add Payment Method
          </Button>
        </div>

        <FormField
          control={control}
          name='defaultPaymentMethod'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Payment Method</FormLabel>
              <FormControl>
                {isPending ? (
                  <Skeleton className='h-10 w-full' />
                ) : (
                  <Select
                    value={field.value || ''}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-950 w-full">
                      <SelectValue placeholder='Select a payment method' />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePaymentMethods
                        .filter((x) => x.name)
                        .map((method, index) => (
                          <SelectItem key={index} value={method.name}>
                            {method.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage>{errors.defaultPaymentMethod?.message}</FormMessage>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
