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
import { toast } from '@/hooks/use-toast'
import { UploadButton } from '@/lib/uploadthing'
import { ISettingInput } from '@/types'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Skeleton } from '@/components/ui/skeleton'

export default function CarouselForm({
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
    name: 'carousels',
  })
  const {
    watch,
    formState: { errors },
  } = form
  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>Carousels</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {isPending ? (
          <div className='space-y-4'>
            {[...Array(3)].map((_, index) => (
              <div key={index} className='flex justify-between gap-1 w-full'>
                <Skeleton className='h-10 w-1/4' />
                <Skeleton className='h-10 w-1/4' />
                <Skeleton className='h-10 w-1/4' />
                <Skeleton className='h-10 w-1/4' />
              </div>
            ))}
          </div>
        ) : (
          <div className='space-y-4'>
            {fields.map((field, index) => (
              <div key={field.id} className='flex justify-between gap-1 w-full flex-wrap '>
                <FormField
                  control={form.control}
                  name={`carousels.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      {index == 0 && <FormLabel>Title</FormLabel>}
                      <FormControl>
                        <Input  className="bg-white dark:bg-gray-950" {...field} placeholder='Title' />
                      </FormControl>
                      <FormMessage>
                        {errors.carousels?.[index]?.title?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`carousels.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      {index == 0 && <FormLabel>Url</FormLabel>}
                      <FormControl>
                        <Input  className="bg-white dark:bg-gray-950" {...field} placeholder='Url' />
                      </FormControl>
                      <FormMessage>
                        {errors.carousels?.[index]?.url?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`carousels.${index}.buttonCaption`}
                  render={({ field }) => (
                    <FormItem>
                      {index == 0 && <FormLabel>Caption</FormLabel>}
                      <FormControl>
                        <Input  className="bg-white dark:bg-gray-950" {...field} placeholder='buttonCaption' />
                      </FormControl>
                      <FormMessage>
                        {errors.carousels?.[index]?.buttonCaption?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className='block sm:hidden'>
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
                <div>
                  <FormField
                    control={form.control}
                    name={`carousels.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        {index == 0 && <FormLabel>Image</FormLabel>}

                        <FormControl>
                          <Input  className="bg-white dark:bg-gray-950" placeholder='Enter image url' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {watch(`carousels.${index}.image`) && (
                    <Image
                      src={watch(`carousels.${index}.image`)}
                      alt='image'
                      className=' sm:w-full sm:h-full object-cover object-center rounded-sm !h-20'
                      width={192}
                      height={68}
                    />
                  )}
                  {!watch(`carousels.${index}.image`) && (
                    <UploadButton
                      endpoint='imageUploader'
                      onClientUploadComplete={(res) => {
                        form.setValue(`carousels.${index}.image`, res[0].url)
                      }}
                      onUploadError={(error: Error) => {
                        toast({
                          variant: 'destructive',
                          description: `ERROR! ${error.message}`,
                        })
                      }}
                    />
                  )}
                </div>
                <div className='sm:block hidden'>
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
              onClick={() =>
                append({ url: '', title: '', image: '', buttonCaption: '' })
              }
            >
              Add Carousel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
