'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils' // Ensure you have a utility for class merging
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { getSetting } from '@/lib/actions/setting.actions'
import { FaChevronRight, FaFirstOrder} from 'react-icons/fa'
import { LuUserRound } from "react-icons/lu";
import { RiFunctionAddFill } from "react-icons/ri";
import { FiBox } from "react-icons/fi";
import { SiPagespeedinsights } from "react-icons/si"
import { IoSettingsOutline } from 'react-icons/io5'
// import { Separator } from '@radix-ui/react-separator'

export default function SideBar() {
  const [site, setSite] = useState<{ name: string; logo: string } | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { site } = await getSetting()
        setSite(site)
      } catch (error) {
        console.error('Error fetching site settings:', error)
      }
    }
    fetchSettings()
  }, [])

  const links = [
    { 
      icon: <RiFunctionAddFill className="!h-5 !w-5"/>, 
      title: 'Dashboard', 
      href: '/admin/dashboard' 
    },
    { 
      icon: <FiBox className="!h-5 !w-5"/>, 
      title: 'Products', 
      href: '/admin/products' 
    },
    { 
      icon: <FaFirstOrder className="!h-5 !w-5"/>, 
      title: 'Orders', 
      href: '/admin/orders' 
    },
    { 
      icon: <LuUserRound className="!h-5 !w-5"/>, 
      title: 'Users', 
      href: '/admin/users' 
    },
    { 
      icon: <SiPagespeedinsights className="!h-5 !w-5"/>, 
      title: 'Pages', 
      href: '/admin/web-pages' 
    },
    { 
      icon: <IoSettingsOutline className="!h-5 !w-5"/>, 
      title: 'Settings', 
      href: '/admin/settings' 
    }
  ]

  return (
    <section className="min-w-[200px] border-r sticky top-0 max-h-screen overflow-y-auto hide-scrollbar dark:text-black">
      <div className='flex flex-col'>
        
       <div className="px-4 py-2 border-b">
        <Link href="/" className='flex items-center gap-2'>
          {site?.logo ? (
            <Image className='mb-3'
              src={site.logo}
              width={48}
              height={48}
              alt={`${site?.name || 'Site'} logo`}
            />
          ) : (
            // <div className="w-12 h-12 bg-white flex items-center justify-center rounded-md">
            //   Logo.png
            // </div>
            <img src="/" alt="logo.png" />
          )}
          <span className='font-semibold dark:text-white'>{site?.name}</span>
        </Link>
        {/* <Separator className='h-px bg-black' /> */}
       </div>
      

        <div className="flex flex-col p-2 gap-2">
        {links.map((item) => (
          <Link
              key={item.href}
              href={item.href}
              className={cn(
              "px-3 py-2 rounded-md flex items-center gap-2 drop-shadow-xl",
              pathname.includes(item.href) ? "bg-primary font-medium": "text-gray-500 transition-colors hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white hover:text-black"
              )}>
              {/* Icon and Title at the left */}
              <div className="flex items-center gap-2 flex-1">
              {item.icon}
              <span>{item.title}</span>
          </div>

             {/* Chevron Right at the right */}
        {pathname.includes(item.href) && (
      <FaChevronRight className="!h-4 !w-4 ml-auto" />
  )}
</Link>

))}

         </div>  
      </div>
     
    </section>
  )
}
