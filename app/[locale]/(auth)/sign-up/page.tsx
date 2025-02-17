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
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const session = await auth()

  if (session) {
    // Await the searchParams to access its properties
    const { callbackUrl } = await searchParams
    return redirect(callbackUrl || '/')
  }

  const { site } = await getSetting()
  return ( 
    <>
    <style>
                {/* {`
                    body {
                         background-image: 
                            linear-gradient(to bottom, 
                                rgb(255, 47, 0, 0.7) 0%,
                                rgba(253, 23, 23, 0.6) 50%,
                                rgba(253, 23, 23, 0.5) 50%,
                                rgb(255, 231, 231) 100%);


                        } 
                                body::-webkit-scrollbar{
                                        display: none;
                                }

                        input::placeholder {
                        color: gray;
                        opacity: 1;
                        }
                `} */}

            </style>

    <div className="flex md:flex-row w-full text-left items-center bg-white dark:bg-white text-black dark:text-black justify-center !min-h-[43rem] sm:min-h-[45rem] sm:h-[90vh] rounded-3xl shadow-2xl my-4">
      <div className="md:w-1/2 p-6 sm:p-12 min-h-[35rem]">
        <h1 className="text-2xl font-medium signUp">Sign Up</h1>
        <div className="pt-5">
          <SignUpForm />
        </div>
      </div>
      <div className="w-1/2 h-full text-center image hidden md:block rounded-r-3xl overflow-hidden">
        {/* <Image
          className="object-cover md:m-auto rounded-r-3xl"
          src={site.logo}
          width={64}
          height={64}
          alt="Sign up logo"
        />
        <p>
          Welcome to {site.name}
        </p> */}
        <Image
          className="object-cover w-full h-full md:m-auto"
          src="/SignUp.png"
          width={500}
          height={300}
          alt="SignIn-image"
        />
      </div>
    </div>
    </>
  )
}
