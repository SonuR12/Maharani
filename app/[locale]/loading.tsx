import { Loader } from '@/components/ui/loader'
import { getTranslations } from 'next-intl/server'
import React from 'react'

export default async function LoadingPage() {
  const t = await getTranslations()
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center min-h-screen ">
      <Loader />
      <div>
        {t('Loading.Loading')}
      </div>
    </div>
  )
}
