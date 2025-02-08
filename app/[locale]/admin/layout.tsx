import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Menu from '@/components/shared/header/menu'
import { AdminNav } from './admin-nav'
import { getSetting } from '@/lib/actions/setting.actions'

// Add metadata type for Next.js app router
interface RootLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: RootLayoutProps) {
  const { site } = await getSetting()

  return (
    <div className="flex flex-col">
      <header className="fixed w-full z-50 !backdrop-blur-md dark:border-0 text-black dark:text-white border border-b">
        <div className="flex h-16 items-center px-6">
          <Link href="/">
            <Image
              src={site.logo}
              width={48}
              height={48}
              alt={`${site.name} logo`}
            />
          </Link>
          <AdminNav className="mx-4 hidden md:flex" />
          <div className="ml-auto flex items-center space-x-4">
            <Menu forAdmin />
          </div>
        </div>
        <div>
          <AdminNav className="flex md:hidden px-4 pb-2" />
        </div>
      </header>
      <div className="flex-1 p-4 pt-20">
        {children}
      </div>
    </div>
  )
}
