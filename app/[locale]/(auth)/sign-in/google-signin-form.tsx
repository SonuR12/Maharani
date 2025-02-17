'use client'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'
import { FcGoogle } from 'react-icons/fc'

export function GoogleSignInForm() {
  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button
        disabled={pending}
        className="w-full flex items-center gap-2 justify-center p-3 py-5 text-black dark:bg-transparent hover:bg-white dark:hover:bg-gray-100 border border-gray-400 hover:border-black hover:shadow-lg hover:text-black rounded-md"
        variant="outline"
      >
        {pending ? 'Redirecting to Google...' : 'Sign In with Google'}
        <FcGoogle />
      </Button>
    )
  }
  return (
    <form action={SignInWithGoogle}>
      <SignInButton />
    </form>
  )
}
