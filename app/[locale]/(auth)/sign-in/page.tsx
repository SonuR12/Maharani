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

export default async function SignInPage({
  searchParams = {}
}: {
  searchParams?: Record<string, string | undefined>
}) {
  const { site } = await getSetting()
  const session = await auth()

  if (session) {
    return redirect(searchParams?.callbackUrl || '/')
  }

  return (
    <div className="flex md:flex-row w-[80vw] items-center min-h-[35rem] h-[70vh] rounded-3xl shadow-2xl my-20">
      <div className="md:w-1/2 p-12">
        <h1 className="font-medium text-3xl">Sign In</h1>
        <CredentialsSignInForm />
        <GoogleSignInForm />
        <div className="text-center text-sm my-7">
          Don&apos;t have a {site.name} account?
          <Link
            className="!text-red-500 hover:!text-red-400 ml-1 hover:underline"
            href={`/sign-up`}
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="lg:w-1/2 h-full hidden md:block">
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
