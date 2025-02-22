// import { EllipsisVertical } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import CartButton from './cart-button'
import UserButton from './user-button'
import ThemeSwitcher from './theme-switcher'
import LanguageSwitcher from './language-switcher'
import { useTranslations } from 'next-intl'

const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {
  const t = useTranslations()
  return (
    <div className="flex justify-end">
      <nav className="md:flex gap-3 hidden w-full">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <UserButton />
        {forAdmin ? null : <CartButton />}
      </nav>
      <nav className="md:hidden">
        {/* <div className='flex'>
          <LanguageSwitcher />
        <ThemeSwitcher />
        <UserButton /> 
        </div> */}

        <Sheet>
          <SheetTrigger className="align-middle header-button">
            {/* <RxHamburgerMenu className="h-5 w-5 " /> */}
            <div className="flex flex-col justify-end items-end gap-1 bg-white p-2 rounded-md border border-gray-200 drop-shadow-xl">
              <div className="w-4 h-[2px] bg-black rounded" />
              <div className="w-3 h-[2px] bg-black rounded" />
              <div className="w-2 h-[2px] bg-black rounded" />
            </div>
          </SheetTrigger>
          <SheetContent className="bg-black text-white flex flex-col items-start">
            <SheetHeader className="w-full">
              <div className="flex items-center justify-between ">
                <SheetTitle className="text-white ">
                  {t('Header.Site Menu')}
                </SheetTitle>
                <SheetDescription />
              </div>
            </SheetHeader>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserButton />
            <CartButton />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Menu
