'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'
import { FiShoppingCart } from 'react-icons/fi'
import { FaFirstOrder } from 'react-icons/fa'
import { LuUserRound } from 'react-icons/lu'
import { IoSettingsOutline } from 'react-icons/io5'
import { GrHomeRounded } from 'react-icons/gr'

const links = [
  {
    icon: <GrHomeRounded className="!h-5 !w-5" />,
    title: 'Home',
    href: '/'
  },
  {
    icon: <FaFirstOrder className="!h-5 !w-5" />,
    title: 'Orders',
    href: '/account/orders'
  },
  {
    icon: <LuUserRound className="!h-5 !w-5" />,
    title: 'Users',
    href: '/account/manage'
  },
  {
    icon: <IoSettingsOutline className="!h-5 !w-5" />,
    title: 'Settings',
    href: '/account'
  },
  {
    icon: <FiShoppingCart className="!h-5 !w-5" />,
    title: 'Cart',
    href: '/cart'
  }
]

export function BottomNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  //   const t = useTranslations()

  return (
    <nav
      className={cn(
        'w-full sm:hidden fixed bottom-0 left-0 px-4 py-2 flex items-center justify-between bg-white dark:bg-black shadow-md z-50',
        className
      )}
      {...props}
    >
      {links.map(item =>
        <div key={item.href} className="flex flex-col items-center text-sm">
          <Link
            href={item.href}
            className={cn(
              'p-1 rounded-md transition-all duration-200',
              pathname === item.href
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            {item.icon}
          </Link>
          <span
            className={cn(
              'text-xs font-medium',
              pathname === item.href ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {item.title}
          </span>
        </div>
      )}
    </nav>
  )
}
