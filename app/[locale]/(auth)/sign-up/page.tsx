import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'

import SignUpForm from './signup-form'
import Image from 'next/image'
import { getSetting } from '@/lib/actions/setting.actions'

export const metadata: Metadata = {
  title: 'Sign Up'
}

export default async function SignUpPage({
  searchParams
}: {
  searchParams: { callbackUrl?: string }
}) {
  const session = await auth()

  if (session) {
    return redirect(searchParams.callbackUrl || '/')
  }

  const { site } = await getSetting()
  return (
    <div className="flex md:flex-row w-[80vw] text-left items-center justify-center min-h-[35rem] rounded-3xl shadow-2xl my-4">
      <div className="md:w-1/2 p-12 pb-5">
        <h1 className="text-2xl font-medium signUp">Sign Up</h1>
        <div className="pt-5">
          <SignUpForm />
        </div>
      </div>
      <div className="lg:w-1/2 h-full text-center image hidden md:block">
        <Image
          className="object-cover md:m-auto rounded-r-3xl"
          src={site.logo}
          width={64}
          height={64}
          alt="Sign up logo"
        />
        <p>
          Welcome to {site.name}
        </p>
        {/* <Image
          className="object-cover w-full h-full md:m-auto rounded-r-3xl"
          src="/SignUp.png"
          width={500}
          height={300}
          alt="SignIn-image"
        /> */}
      </div>
    </div>
  )
}
