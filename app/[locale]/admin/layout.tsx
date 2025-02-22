import React from 'react'
import Menu from '@/components/shared/header/menu'
import { AdminNav } from './admin-nav'
import { getSetting } from '@/lib/actions/setting.actions'
import SideBar from '@/components/shared/admin/sidebar'
import Footer from '@/components/shared/footer'
import { auth } from '@/auth'
import Link from 'next/link'
import Image from 'next/image'

// Metadata type for Next.js app router
interface RootLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: RootLayoutProps) {
  // Fetch settings and session concurrently
  const [settingsData, session] = await Promise.all([getSetting(), auth()])
  const { site } = settingsData || {}

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <main className="flex flex-col w-full h-full pb-4">
          {/* Header */}
          <header className="sticky top-0 px-4 py-2 w-full z-50 border-b backdrop-blur-md dark:border-0 text-black dark:text-white">
            <div className="flex h-16 items-center justify-between font-semibold select-none">
              <Link href="/" className="flex items-center gap-2">
                {site?.logo ? (
                  <Image
                    className="!h-10 !w-10"
                    src={site.logo}
                    width={40}
                    height={40}
                    alt={`${site?.name || 'Site'} logo`}
                    priority
                  />
                ) : (
                  <img src="/" alt="logo.png" className="h-10 w-10" />
                )}
                <span className="hidden sm:block">
                  Welcome Admin {session?.user.name}, {site?.name}
                </span>
                <span className="sm:hidden font-semibold">
                  {site?.name}, Welcome Admin {session?.user.name}
                </span>
              </Link>
              <Menu forAdmin />
            </div>
          </header>

          {/* Page Content */}
          <section className="px-4 sm:w-[80vw]">{children}</section>

          {/* Admin Navigation */}
          <AdminNav />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
