'use client'

import { ChevronDownIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import useColorStore from '@/hooks/use-color-store'
import useIsMounted from '@/hooks/use-is-mounted'
import { useTranslations } from 'next-intl'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { availableColors, color, setColor } = useColorStore(theme)
  const t = useTranslations('Header')
  const changeTheme = (value: string) => {
    setTheme(value)
  }
  const isMounted = useIsMounted()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="header-button h-[41px] hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md select-none"
        asChild
      >
        {theme === 'dark' && isMounted
          ? <div className="flex items-center gap-1 select-none">
              <Moon className="h-4 w-4" /> {t('Dark')}
              <ChevronDownIcon
                className={`transition-transform duration-200 ${isOpen
                  ? 'rotate-180'
                  : ''}`}
              />
            </div>
          : <div className="flex items-center gap-1">
              <Sun className="h-4 w-4" /> {t('Light')}{' '}
              <ChevronDownIcon
                className={`transition-transform duration-200 ${isOpen
                  ? 'rotate-180'
                  : ''}`}
              />
            </div>}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 select-none">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>

        <DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
          <DropdownMenuRadioItem value="dark">
            <Moon className="h-4 w-4 mr-1" /> {t('Dark')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">
            <Sun className="h-4 w-4 mr-1" /> {t('Light')}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          {t('Color')}
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={color.name}
          onValueChange={value => setColor(value, true)}
        >
          {availableColors.map(c =>
            <DropdownMenuRadioItem key={c.name} value={c.name}>
              <div
                style={{ backgroundColor: c.name }}
                className="h-4 w-4 mr-1 rounded-full"
              />

              {t(c.name)}
            </DropdownMenuRadioItem>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
