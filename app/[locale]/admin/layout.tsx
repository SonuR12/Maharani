// import Image from 'next/image'
// import Link from 'next/link'
import React from 'react'
import Menu from '@/components/shared/header/menu'
import { AdminNav } from './admin-nav'
import { getSetting } from '@/lib/actions/setting.actions'
import SideBar from '@/components/shared/admin/sidebar'
import Footer from '@/components/shared/footer'
import { auth } from '@/auth'

// Add metadata type for Next.js app router
interface RootLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: RootLayoutProps) {
  const { site } = await getSetting()
  const session = await auth()

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* <div className="flex w-full pt-20"> */}
      <div className="flex w-full h-full">
        <SideBar />
        <div className="pb-4 w-full h-full">
          <header className="sticky top-0 px-2 pl-4 w-full z-50 border-b !backdrop-blur-md dark:border-0 text-black dark:text-white">
            <div className="flex h-16 items-center pr-6 font-semibold select-none">
              {/* <Link href="/">
                <Image
                  src={site.logo}
                  width={48}
                  height={48}
                  alt={`${site.name} logo`}
                />
              </Link> */}
              {/* <AdminNav className="mx-4 hidden md:flex" /> */}
              Welcome Admin {session?.user.name}, {site.name}
              <div className="ml-auto flex items-center space-x-4">
                <Menu forAdmin />
              </div>
            </div>
            <div>
              <AdminNav className="flex md:hidden px-4 pb-2" />
            </div>
          </header>
          <div className="px-4">
            {children}
          </div>
        </div>
      </div>
      {/* <footer className=" flex-1 mt-8  bg-gray-800 w-full flex flex-col gap-4 items-center p-8 text-sm">
        <div className="flex justify-center space-x-4">
          <Link href="/page/conditions-of-use">Conditions of Use</Link>
          <Link href="/page/privacy-policy"> Privacy Notice</Link>
          <Link href="/page/help"> Help </Link>
        </div>
        <div>
          <p className="text-gray-400">
            {site.copyright}, {site.name}
          </p>
        </div>
      </footer> */}
      <Footer />
    </div>
  )
}
