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
  searchParams
}: {
  searchParams: SearchParams
}) {
  const { site } = await getSetting()

  const { callbackUrl = '/' } = searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl)
  }

  return (
    <div className="flex md:flex-row w-[80vw] items-center min-h-[35rem] h-[70vh] rounded-3xl shadow-2xl my-20">
      <div className="md:w-1/2 p-12">
        <h1 className="font-medium text-3xl signIn">Sign In</h1>
        <div>
          <CredentialsSignInForm />
        </div>
        <div>
          <GoogleSignInForm />
        </div>
        <div className="text-center text-sm my-7">
          Don&apos;t have your {site.name} account?
          <Link
            className="!text-red-500 hover:!text-red-400 ml-1 hover:underline"
            href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="lg:w-1/2 h-full text-center image hidden md:block">
        <Image
          className="object-cover w-full h-full md:m-auto rounded-r-3xl"
          src="/SignIn.png"
          width={500}
          height={300}
          alt="SignIn-image"
        />
      </div>
    </div>
  )
}
