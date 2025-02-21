'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'
import { FcGoogle } from 'react-icons/fc'
import { useToast } from '@/hooks/use-toast'

export function GoogleSignInForm() {
  const { toast } = useToast() // ✅ Initialize shadcn toast
  const [pending, setPending] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setPending(true)
      await SignInWithGoogle() // ✅ Trigger Google sign-in
      toast({
        // title: 'Success',
        description: 'Successfully Signed In with Google!',
        variant: 'success'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Google sign-in failed',
        variant: 'destructive'
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <Button
      disabled={pending}
      onClick={handleGoogleSignIn} // ✅ Handles Google sign-in on click
      className="w-full flex items-center gap-2 justify-center p-3 py-5 text-black dark:bg-transparent hover:bg-white dark:hover:bg-gray-100 border border-gray-400 hover:border-black hover:shadow-lg hover:text-black rounded-md"
      variant="outline"
    >
      {pending ? 'Redirecting to Google...' : 'Sign In with Google'}
      <FcGoogle />
    </Button>
  )
}
