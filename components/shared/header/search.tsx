import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { getAllCategories } from '@/lib/actions/product.actions'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'
import { getSetting } from '@/lib/actions/setting.actions'
import { getTranslations } from 'next-intl/server'

export default async function Search() {
  const { site: { name } } = await getSetting()
  const categories = await getAllCategories()

  const t = await getTranslations()
  return (
    <form action="/search" method="GET" className="flex items-stretch h-10 ">
      <Select name="category">
        <SelectTrigger className="w-auto h-full pl-4 dark:-gray-200 bg-gray-100 text-black  -r rounded-r-none rtl:rounded-r-md rtl:rounded-l-none">
          <SelectValue placeholder={t('Header.All')} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">
            {t('Header.All')}
          </SelectItem>
          {categories.map(category =>
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      <div className="relative w-full max-w-md border rounded-r-md rtl:rounded-r-none rtl:rounded-l-md">
        <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        <Input
          autoComplete="off"
          className="pl-10 w-full flex-1 rounded-none dark:bg-gray-200 bg-gray-100 text-black text-base h-full focus:ring-0 rounded-r-md rtl:rounded-r-none rtl:rounded-l-md"
          // placeholder={t('Header.Search Site', { name }) + ' '}
          placeholder="Search Products, brand and many more..."
          name="q"
          type="search"
        />
        {/* <button
        type="submit"
        className="bg-primary text-primary-foreground text-black rounded-s-none h-full pl-3 pr-4 py-2 "
      >
        <SearchIcon className="w-6 h-6" />
      </button> */}
      </div>
    </form>
  )
}
