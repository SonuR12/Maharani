// SignOutButton.tsx
'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { SignOut } from '@/lib/actions/user.actions'
import { useToast } from '@/hooks/use-toast' // Assuming you have a toast hook for notifications

const SignOutButton = () => {
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await SignOut() // Call your sign-out function
      toast({ description: 'Successfully signed out!' }) // Show success message
      router.push('/') // Redirect to home or desired page
    } catch (error) {
      toast({ variant: 'destructive', description: 'Successfully signed out!' })
    }
  }

  return (
    <Button
      className="w-full py-4 px-2 h-4 justify-start"
      variant="ghost"
      onClick={handleSignOut}
    >
      Sign out
    </Button>
  )
}

export default SignOutButton
