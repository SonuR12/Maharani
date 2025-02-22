'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { getSetting } from '@/lib/actions/setting.actions'
import { FaChevronRight, FaFirstOrder } from 'react-icons/fa'
import { LuUserRound } from "react-icons/lu"
import { RiFunctionAddFill } from "react-icons/ri"
import { FiBox } from "react-icons/fi"
import { SiPagespeedinsights } from "react-icons/si"
import { IoSettingsOutline } from 'react-icons/io5'
import { useTranslations } from 'next-intl'

export default function SideBar() {
  const [site, setSite] = useState<{ name: string; logo: string } | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams() // Used for tracking URL search params efficiently
  const t = useTranslations('Admin')

  useEffect(() => {
    getSetting()
      .then(({ site }) => setSite(site))
      .catch((error) => console.error('Error fetching site settings:', error))
  }, [])

  // Memoize the sidebar links to prevent unnecessary re-renders
  const links = useMemo(() => [
    { icon: <RiFunctionAddFill className="!h-5 !w-5" />, title: 'Dashboard', href: '/admin/dashboard' },
    { icon: <FiBox className="!h-5 !w-5" />, title: 'Products', href: '/admin/products' },
    { icon: <FaFirstOrder className="!h-5 !w-5" />, title: 'Orders', href: '/admin/orders' },
    { icon: <LuUserRound className="!h-5 !w-5" />, title: 'Users', href: '/admin/users' },
    { icon: <SiPagespeedinsights className="!h-5 !w-5" />, title: 'Pages', href: '/admin/web-pages' },
    { icon: <IoSettingsOutline className="!h-5 !w-5" />, title: 'Settings', href: '/admin/settings' }
  ], [])

  return (
    <aside className="min-w-[20vw] hidden sm:block border-r sticky top-0 max-h-screen overflow-y-auto dark:text-black">
      <div className="flex flex-col">
        
        {/* Site Logo and Name */}
        <div className="px-4 py-2 border-b">
          <Link href="/" className="flex items-center gap-2">
            {site?.logo ? (
              <Image className="mb-3 !h-10 !w-10" src={site.logo} width={300} height={500} alt={`${site?.name || 'Site'} logo`} />
            ) : (
              <img src="/path/to/default/logo.png" alt="Default logo" className="h-10 w-10" />
            )}
            <span className="font-semibold dark:text-white">{site?.name}</span>
          </Link>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-2 gap-2">
          {links.map(({ icon, title, href }) => {
            const isActive = pathname === href || searchParams.get('page') === href

            return (
              <Link 
                key={href} 
                href={href} 
                prefetch 
                className={cn(
                  "px-3 py-2 rounded-md flex items-center gap-2 drop-shadow-xl overflow-x-hidden sm:text-sm md:text-base transition-colors",
                  isActive ? "bg-primary font-medium text-black" : "text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-black"
                )}
              >
                {/* Icon and Title */}
                <span className="flex items-center gap-2 flex-1">{icon}{t(title)}</span>

                {/* Chevron Indicator */}
                {isActive && <FaChevronRight className="!h-4 !w-4 ml-auto" />}
              </Link>
            )
          })}
        </nav>  
      </div>
    </aside>
  )
}
