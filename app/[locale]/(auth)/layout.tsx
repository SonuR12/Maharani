import { getSetting } from '@/lib/actions/setting.actions'
// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { site } = await getSetting()
  return (
    <div className="flex flex-col items-center highlight-link mt-3">
      <header className="mt-8">
        {/* <Link href="/">
          <Image
            className="h-8 w-8 md:h-12 md:w-12"
            src={site.logo}
            alt="logo"
            width={64}
            height={64}
            priority
            // style={{
            //   maxWidth: '100%',
            //   height: 'auto'
            // }}
          />
        </Link> */}
      </header>
      <main className="mx-auto">
        {children}
      </main>
      <footer className=" flex-1 mt-8 bg-gray-800 w-full flex flex-col gap-4 items-center p-8 text-sm">
        <div className="flex justify-center space-x-4">
          <Link href="/page/conditions-of-use">Conditions of Use</Link>
          <Link href="/page/privacy-policy"> Privacy Notice</Link>
          <Link href="/page/help"> Help </Link>
        </div>
        <div>
          <p className="text-gray-400">
            {site.copyright}
          </p>
        </div>
      </footer>
    </div>
  )
}
