import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/components/shared/client-providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getSetting } from '@/lib/actions/setting.actions'
import { cookies } from 'next/headers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export async function generateMetadata() {
  const { site: { slogan, name, description, url } } = await getSetting()

  const metadataBaseUrl =
    url && url.startsWith('http')
      ? url
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return {
    title: {
      template: `%s | ${name}`,
      default: `${name}. ${slogan}`
    },
    description: description,
    metadataBase: new URL(metadataBaseUrl)
  }
}

export default async function AppLayout({
  children
}: {
  children: React.ReactNode
}) {
  const setting = await getSetting()
  const currencyCookie = (await cookies()).get('currency')
  const currency = currencyCookie ? currencyCookie.value : 'USD'

  // Get locale from cookies (fallback to 'en' if not set)
  const localeCookie = (await cookies()).get('NEXT_LOCALE')
  const locale = localeCookie ? localeCookie.value : 'en'

  // Validate locale
  if (!routing.locales.includes(locale)) {
    // Fallback to default locale (English)
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'} // Change direction based on locale
      suppressHydrationWarning
    >
      <body
        className={`min-h-screen mb-7 sm:mb-0 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders setting={{ ...setting, currency }}>
            {children}
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
