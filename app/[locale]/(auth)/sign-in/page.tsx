import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import CredentialsSignInForm from './credentials-signin-form'
import { GoogleSignInForm } from './google-signin-form'
import { getSetting } from '@/lib/actions/setting.actions'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sign In'
}

interface SearchParams {
  callbackUrl?: string
}

export default async function SignInPage({
  searchParams = Promise.resolve({}) as Promise<SearchParams> // Ensure searchParams is a promise
}: {
  searchParams?: Promise<SearchParams>
}) {
  const { site } = await getSetting()
  const session = await auth()

  // Await searchParams to access its properties
  const resolvedSearchParams = await searchParams
  const callbackUrl = resolvedSearchParams?.callbackUrl ?? '/'

  if (session) {
    return redirect(callbackUrl)
  }

  return (
    <div className="flex md:flex-row w-full my-16 bg-white dark:bg-gray-50 dark:text-black items-center !min-h-[40rem] sm:min-h-[37rem] sm:h-[70vh] rounded-3xl shadow-2xl">
      <div className="md:w-1/2 p-6 sm:p-12">
        <h1 className="font-medium text-3xl my-10 signIn">Sign In</h1>
        <CredentialsSignInForm />
        <GoogleSignInForm />
        <div className="text-center text-sm my-7">
          Don&apos;t have a {site.name} account?
          <Link
            className="!text-red-500 hover:!text-red-400 ml-1 hover:underline"
            href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 h-full hidden md:block">
        <Image
          className="object-cover w-full h-full rounded-r-3xl"
          src="/SignIn.png"
          width={500}
          height={300}
          alt="Sign In"
        />
      </div>
    </div>
  )
}