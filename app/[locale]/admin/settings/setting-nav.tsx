'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  CreditCard,
  Currency,
  ImageIcon,
  Info,
  Languages,
  Package,
  SettingsIcon
} from 'lucide-react'

import { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'

const SettingNav = () => {
  const [active, setActive] = useState('')
  const [isPending, setisPending] = useState(true)

  useEffect(() => {
    // Simulate isPending delay
    setTimeout(() => setisPending(false), 2000)

    const sections = document.querySelectorAll('div[id^="setting-"]')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.6, rootMargin: '0px 0px -40% 0px' }
    )
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  const handleScroll = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      const top = section.offsetTop - 80 // 20px above the section
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const settinglinks = [
    { name: 'Site Info', hash: 'setting-site-info', icon: <Info /> },
    {
      name: 'Common Settings',
      hash: 'setting-common',
      icon: <SettingsIcon />
    },
    {
      name: 'Carousels',
      hash: 'setting-carousels',
      icon: <ImageIcon />
    },
    {
      name: 'Languages',
      hash: 'setting-languages',
      icon: <Languages />
    },
    {
      name: 'Currencies',
      hash: 'setting-currencies',
      icon: <Currency />
    },
    {
      name: 'Payment Methods',
      hash: 'setting-payment-methods',
      icon: <CreditCard />
    },
    {
      name: 'Delivery Dates',
      hash: 'setting-delivery-dates',
      icon: <Package />
    }
  ]

  return (
    <div className="md:sticky md:top-20 mt-6 sm:mt-0 max-h-screen md:overflow-y-auto hide-scrollbar">
      <div className="sm:sticky !top-[4.5rem]">
        <h1 className="h1-bold text-2xl">Settings</h1>
        <nav className="flex flex-row sm:flex-col gap-2 md:mt-[10vh] flex-wrap">
          {isPending
            ? <div className="flex flex-row sm:flex-col gap-2 items-center w-full">
                {[...Array(7)].map((_, index) =>
                  <Skeleton key={index} className="w-full h-10" />
                )}
              </div>
            : settinglinks.map(item =>
                <Button
                  onClick={() => handleScroll(item.hash)}
                  key={item.hash}
                  variant={active === item.hash ? 'outline' : 'ghost'}
                  className={`justify-start border border-none w-fit ${active ===
                  item.hash
                    ? 'bg-primary hover:bg-primary hover:text-black text-black'
                    : 'hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-600 hover:text-black dark:text-white'}`}
                >
                  {item.icon}
                  {item.name}
                  {active === item.hash &&
                    <FaChevronRight className="!h-4 !w-4 ml-auto" />}
                </Button>
              )}
        </nav>
      </div>
    </div>
  )
}

export default SettingNav
