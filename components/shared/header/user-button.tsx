import { auth } from '@/auth'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import SignOutButton from '@/components/ui/SignOutButton'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function UserButton() {
  const t = await getTranslations()
  const session = await auth()
  const user = session?.user

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="header-button hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
          asChild
        >
          <div className="flex items-center select-none">
            <div className="flex flex-col text-xs text-left">
              <span>
                {t('Header.Hello')}, {user ? user.name : t('Header.sign in')}
              </span>
              <span className="font-bold">{t('Header.Account & Orders')}</span>
            </div>
            <ChevronDownIcon />
          </div>
        </DropdownMenuTrigger>

        {user ? (
          <DropdownMenuContent className="w-56 select-none" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {user.role === 'Admin' && (
                <Link className="w-full" href={{ pathname: '/admin/dashboard' }} prefetch={true}>
                  <DropdownMenuItem>{t('Header.Admin')}</DropdownMenuItem>
                </Link>
              )}
              <Link className="w-full" href="/account" prefetch>
                <DropdownMenuItem>{t('Header.Your account')}</DropdownMenuItem>
              </Link>
              <Link className="w-full" href="/account/orders" prefetch>
                <DropdownMenuItem>{t('Header.Your orders')}</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuItem className="p-0 mb-1">
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className={cn(buttonVariants(), 'w-full')} href="/sign-in" prefetch>
                  {t('Header.Sign in')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="font-normal">
                {t('Header.New Customer')}?{' '}
                <Link href="/sign-up" prefetch>{t('Header.Sign up')}</Link>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}
