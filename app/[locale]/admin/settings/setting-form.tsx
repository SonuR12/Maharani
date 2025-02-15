'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { SettingInputSchema } from '@/lib/validator'
import { ClientSetting, ISettingInput } from '@/types'
import { updateSetting } from '@/lib/actions/setting.actions'
import useSetting from '@/hooks/use-setting-store'
import LanguageForm from './language-form'
import CurrencyForm from './currency-form'
import PaymentMethodForm from './payment-method-form'
import DeliveryDateForm from './delivery-date-form'
import CommonForm from './common-form'
import CarouselForm from './carousel-form'
import SiteInfoForm from './site-info-form'
import { useState, useEffect } from 'react'

const SettingForm = ({ setting }: { setting: ISettingInput }) => {
  const { setSetting } = useSetting()
  const [isPending, setisPending] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setisPending(false)
    }, 2000)
  }, [])

  const form = useForm<ISettingInput>({
    resolver: zodResolver(SettingInputSchema),
    defaultValues: setting
  })
  const { formState: { isSubmitting } } = form

  const { toast } = useToast()
  async function onSubmit(values: ISettingInput) {
    const res = await updateSetting({ ...values })
    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message
      })
    } else {
      toast({
        description: res.message
      })
      setSetting(values as ClientSetting)
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4 mt-4"
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SiteInfoForm
          id="setting-site-info"
          form={form}
          isPending={isPending}
        />
        <CommonForm id="setting-common" form={form} isPending={isPending} />
        <CarouselForm
          id="setting-carousels"
          form={form}
          isPending={isPending}
        />

        <LanguageForm
          id="setting-languages"
          form={form}
          isPending={isPending}
        />

        <CurrencyForm
          id="setting-currencies"
          form={form}
          isPending={isPending}
        />

        <PaymentMethodForm
          id="setting-payment-methods"
          form={form}
          isPending={isPending}
        />

        <DeliveryDateForm
          id="setting-delivery-dates"
          form={form}
          isPending={isPending}
        />

        <div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full mb-24 drop-shadow-xl"
          >
            {isSubmitting ? 'Submitting...' : `Save Setting`}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SettingForm
