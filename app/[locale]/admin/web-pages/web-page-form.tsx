'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { z } from 'zod'

import MdEditor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { createWebPage, updateWebPage } from '@/lib/actions/web-page.actions'
import { IWebPage } from '@/lib/db/models/web-page.model'
import { WebPageInputSchema, WebPageUpdateSchema } from '@/lib/validator'
import { Checkbox } from '@/components/ui/checkbox'
import { toSlug } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

const webPageDefaultValues = {
  title: '',
  slug: '',
  content: '',
  isPublished: false
}

const WebPageForm = ({
  type,
  webPage,
  webPageId
}: {
  type: 'Create' | 'Update'
  webPage?: IWebPage
  webPageId?: string
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(
    () => {
      if (type === 'Update' && webPage) {
        setLoading(false)
      } else if (type === 'Create') {
        setLoading(false)
      }
    },
    [type, webPage]
  )

  const form = useForm<z.infer<typeof WebPageInputSchema>>({
    resolver:
      type === 'Update'
        ? zodResolver(WebPageUpdateSchema)
        : zodResolver(WebPageInputSchema),
    defaultValues: webPage && type === 'Update' ? webPage : webPageDefaultValues
  })

  async function onSubmit(values: z.infer<typeof WebPageInputSchema>) {
    if (type === 'Create') {
      const res = await createWebPage(values)
      if (!res.success) {
        toast({ variant: 'destructive', description: res.message })
      } else {
        toast({ description: res.message })
        router.push(`/admin/web-pages`)
      }
    }
    if (type === 'Update') {
      if (!webPageId) {
        router.push(`/admin/web-pages`)
        return
      }
      const res = await updateWebPage({ ...values, _id: webPageId })
      if (!res.success) {
        toast({ variant: 'destructive', description: res.message })
      } else {
        router.push(`/admin/web-pages`)
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-10 w-1/4" />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        autoComplete="off"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) =>
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white dark:bg-gray-800"
                    placeholder="Enter title..."
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) =>
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-white dark:bg-gray-800"
                      placeholder="Enter slug..."
                      {...field}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue('slug', toSlug(form.getValues('title')))
                      }}
                      className="absolute right-2 top-1.5"
                    >
                      Generate
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) =>
            <FormItem className="w-full">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MdEditor
                  {...field}
                  style={{ height: '500px' }}
                  placeholder="Enter page content here..."
                  renderHTML={text =>
                    <ReactMarkdown>
                      {text}
                    </ReactMarkdown>}
                  onChange={({ text }) => form.setValue('content', text)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>}
        />

        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) =>
            <FormItem className="space-x-2 items-center">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Is Published?</FormLabel>
            </FormItem>}
        />

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full drop-shadow-xl"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Page`}
        </Button>
      </form>
    </Form>
  )
}

export default WebPageForm
