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

export default function CurrencyForm({
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
    name: 'availableCurrencies',
  })
  const {
    setValue,
    watch,
    control,
    formState: { errors },
  } = form

  const availableCurrencies = watch('availableCurrencies')
  const defaultCurrency = watch('defaultCurrency')

  useEffect(() => {
    const validCodes = availableCurrencies.map((lang) => lang.code)
    if (!validCodes.includes(defaultCurrency)) {
      setValue('defaultCurrency', '')
    }
  }, [JSON.stringify(availableCurrencies)]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card id={id} className="w-full">
      <CardHeader>
        <CardTitle>Currencies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-center"
            >
              <FormField
                control={form.control}
                name={`availableCurrencies.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Name</FormLabel>}
                    <FormControl>
                      {isPending ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          className="bg-white dark:bg-gray-950 w-full"
                          {...field}
                          placeholder="Name"
                        />
                      )}
                    </FormControl>
                    <FormMessage>
                      {errors.availableCurrencies?.[index]?.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`availableCurrencies.${index}.code`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Code</FormLabel>}
                    <FormControl>
                      {isPending ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          className="bg-white dark:bg-gray-950 w-full"
                          {...field}
                          placeholder="Code"
                        />
                      )}
                    </FormControl>
                    <FormMessage>
                      {errors.availableCurrencies?.[index]?.code?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`availableCurrencies.${index}.symbol`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Symbol</FormLabel>}
                    <FormControl>
                      {isPending ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          className="bg-white dark:bg-gray-950 w-full"
                          {...field}
                          placeholder="Symbol"
                        />
                      )}
                    </FormControl>
                    <FormMessage>
                      {errors.availableCurrencies?.[index]?.symbol?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`availableCurrencies.${index}.convertRate`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Convert Rate</FormLabel>}
                    <FormControl>
                      {isPending ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input
                          className="bg-white dark:bg-gray-950 w-full"
                          {...field}
                          placeholder="Convert Rate"
                        />
                      )}
                    </FormControl>
                    <FormMessage>
                      {
                        errors.availableCurrencies?.[index]?.convertRate
                          ?.message
                      }
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
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() =>
              append({ name: '', code: '', symbol: '', convertRate: 1 })
            }
          >
            Add Currency
          </Button>
        </div>

        <FormField
          control={control}
          name="defaultCurrency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Currency</FormLabel>
              <FormControl>
                {isPending ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={field.value || ''}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-950 w-full">
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCurrencies
                        .filter((x) => x.code)
                        .map((lang, index) => (
                          <SelectItem key={index} value={lang.code}>
                            {lang.name} ({lang.code})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage>{errors.defaultCurrency?.message}</FormMessage>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
