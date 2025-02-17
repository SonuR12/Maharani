'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { IoEye, IoEyeOff } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import useSettingStore from '@/hooks/use-setting-store'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { IUserSignIn } from '@/types'
import { signInWithCredentials } from '@/lib/actions/user.actions'

import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignInSchema } from '@/lib/validator'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { useState } from 'react'

export default function CredentialsSignInForm() {
  const { setting: { site } } = useSettingStore()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: IUserSignIn) => {
    try {
      setPending(true)
      const result = await signInWithCredentials({
        email: data.email,
        password: data.password
      })
      if (result?.error) {
        throw new Error(result.error)
      }
      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Invalid email or password',
        variant: 'destructive'
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Enter email address"
                    className="flex px-3 py-6 rounded-md !w-full bg-[rgba(219,234,254,0.7)] dark:text-black border-none"
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="flex px-3 py-6 rounded-md w-full bg-[rgba(219,234,254,0.7)] border-none"
                      {...field}
                      disabled={pending}
                    />
                    <button
                      type="button"
                      className="absolute right-3 text-gray-500 hover:text-black"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={pending}
                    >
                      {showPassword
                        ? <IoEye size={20} />
                        : <IoEyeOff size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-sm text-gray-600">
            <div className="flex gap-2 items-center">
              <input className="cursor-pointer" type="checkbox" required />
              <label>
                I agree to the {site?.name} &apos;s{' '}
                <Link
                  href="/page/conditions-of-use"
                  className="text-blue-500 hover:underline"
                >
                  Conditions
                </Link>{' '}
                and{' '}
                <Link
                  href="/page/privacy-policy"
                  className="text-blue-500 hover:underline"
                >
                  Privacy Notice.
                </Link>
              </label>
            </div>
          </div>

          <div className="pt-8 pb-2 flex flex-col gap-2">
            <Button
              disabled={pending}
              type="submit"
              className="w-full p-3 py-5 text-white rounded-md bg-gradient-to-b from-[#0078ff] via-[#0059ff] to-[rgb(0,68,255)] border hover:border-blue-800 dark:hover:border-blue-800 dark:hover:shadow-lg hover:shadow-lg"
            >
              {pending ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
