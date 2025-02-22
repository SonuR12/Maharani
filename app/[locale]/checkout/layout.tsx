import { getSetting } from '@/lib/actions/setting.actions'
import { HelpCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function CheckoutLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { site } = await getSetting()
  return (
    <div className="p-4">
      <header className="bg-card mb-4 border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/">
            <Image
              className="!h-8 !w-8 md:!h-14 md:!w-14"
              src={site.logo}
              width={300}
              height={500}
              alt={`${site.name} logo`}
            />
          </Link>
          <div>
            <h1 className="text-3xl text-primary">Checkout</h1>
          </div>
          <div>
            <Link href="/page/help">
              <HelpCircle className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
