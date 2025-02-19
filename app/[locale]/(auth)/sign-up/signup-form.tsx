'use client'
import { redirect, useSearchParams } from 'next/navigation'

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
import { IUserSignUp } from '@/types'
import { registerUser, signInWithCredentials } from '@/lib/actions/user.actions'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpSchema } from '@/lib/validator'
import { Separator } from '@/components/ui/separator'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { GoogleSignInForm } from '../sign-in/google-signin-form'
import { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'

const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function CredentialsSignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { setting: { site } } = useSettingStore()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [pending, setPending] = useState(false)

  const form = useForm<IUserSignUp>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: signUpDefaultValues
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: IUserSignUp) => {
    try {
      setPending(true)
      const res = await registerUser(data)

      if (!res.success) {
        toast({
          title: 'Error',
          description: res.error,
          variant: 'destructive' // ❌ Show error toast
        })
        return
      }

      await signInWithCredentials({
        email: data.email,
        password: data.password
      })

      toast({
        title: 'Success',
        description: 'Account created successfully! Redirecting...',
        variant: 'success' // ✅ Show success toast
      })

      setTimeout(() => redirect(callbackUrl)) // Redirect after a short delay
    } catch (error) {
      if (isRedirectError(error)) throw error
      toast({
        title: 'Error',
        description: 'Signup failed. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="flex px-3 py-4 rounded-md bg-[#eaebee] w-full pr-10 "
          type="hidden"
          name="callbackUrl"
          value={callbackUrl}
          disabled={pending}
        />
        <div className="flex flex-col gap-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) =>
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="flex px-3 py-6 rounded-md bg-[#eaebee] w-full pr-10"
                    placeholder="Enter your name"
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) =>
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="flex px-3 py-6 rounded-md bg-[#eaebee] w-full pr-10"
                    placeholder="Enter email address"
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) =>
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="flex px-3 py-6 rounded-md bg-[#eaebee] w-full pr-10"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      {...field}
                      disabled={pending}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword
                        ? <IoEye size={20} />
                        : <IoEyeOff size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) =>
              <FormItem className="w-full">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="flex px-3 py-6 rounded-md bg-[#eaebee] w-full pr-10"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <div className="text-sm text-gray-600">
            <div className="flex gap-2 items-center">
              <input
                className="cursor-pointer checked:bg-red-50 bg-white dark:!bg-white  dark:accent-red-500"
                type="checkbox"
                required
              />
              <label>
                I agree to the {site.name} &apos;s{' '}
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
          <div className="mt-16">
            <Button
              disabled={pending}
              type="submit"
              className="w-full p-3 py-5 text-white submitsignup rounded-md border bg-gradient-to-b from-[rgb(255,60,0)] via-[rgb(255,42,0)] to-[rgb(255,32,32)] border-red-600 hover:border-red-800 dark:hover:bg-red-800 dark:hover:shadow-lg hover:shadow-lg"
            >
              {pending ? 'Sign Up...' : 'Sign Up'}
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-2">
        <GoogleSignInForm />
      </div>

      <Separator className="mb-4 bg-white" />
      <div className="text-sm text-center">
        Already have an account?{' '}
        <Link
          className="link hover:text-blue-500 hover:underline"
          href={`/sign-in?callbackUrl=${callbackUrl}`}
        >
          Sign In
        </Link>
      </div>
    </Form>
  )
}
