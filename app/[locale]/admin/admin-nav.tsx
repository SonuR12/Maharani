'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { RiFunctionAddFill } from 'react-icons/ri'
import { FiBox } from 'react-icons/fi'
import { FaFirstOrder } from 'react-icons/fa'
import { LuUserRound } from 'react-icons/lu'
import { SiPagespeedinsights } from 'react-icons/si'
import { IoSettingsOutline } from 'react-icons/io5'

type NavLink = {
  icon: React.ReactElement
  title: string
  href: string
}

const links: NavLink[] = [
  {
    icon: <RiFunctionAddFill className="!h-5 !w-5" />,
    title: 'Dashboard',
    href: '/admin/dashboard'
  },
  {
    icon: <FiBox className="!h-5 !w-5" />,
    title: 'Products',
    href: '/admin/products'
  },
  {
    icon: <FaFirstOrder className="!h-5 !w-5" />,
    title: 'Orders',
    href: '/admin/orders'
  },
  {
    icon: <LuUserRound className="!h-5 !w-5" />,
    title: 'Users',
    href: '/admin/users'
  },
  {
    icon: <SiPagespeedinsights className="!h-5 !w-5" />,
    title: 'Pages',
    href: '/admin/web-pages'
  },
  {
    icon: <IoSettingsOutline className="!h-5 !w-5" />,
    title: 'Settings',
    href: '/admin/settings'
  }
]

export function AdminNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('Admin')

  // Convert search params into an object
  const queryParams = Object.fromEntries(searchParams.entries())

  return (
    <nav
      className={cn(
        'w-full sm:hidden fixed bottom-0 left-0 px-4 py-2 flex items-center justify-between bg-white dark:bg-black shadow-md z-50',
        className
      )}
      {...props}
    >
      {links.map(item => {
        const isActive = pathname.startsWith(item.href)

        return (
          <div key={item.href} className="flex flex-col items-center text-sm">
            <Link
              href={{ pathname: item.href, query: queryParams }}
              prefetch={false}
              className={cn(
                'p-1 rounded-md transition-all duration-200',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              {item.icon}
            </Link>
            <span
              className={cn(
                'text-xs font-medium',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {t(item.title)}
            </span>
          </div>
        )
      })}
    </nav>
  )
}
