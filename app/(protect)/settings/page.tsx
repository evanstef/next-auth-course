"use client"

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsSchema } from '@/schemas'
import React, { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { settings } from '@/actions/settings'
import { useForm } from 'react-hook-form'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserRole } from '@prisma/client'
import { Switch } from '@/components/ui/switch'

const SettingPage = () => {
  const user = useCurrentUser()
  const [success, setSuccess] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()


  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
      role: user?.role,
      password: undefined,
      newPassword: undefined
    }
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
          if (data?.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch(() => setError("Something Went Wrong"))
    })
  }

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl text-center font-bold'>🔑 Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Your New Name'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {user?.isOauth === false && (
                <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Your New Email'
                        type='email'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Current Password...'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='New Password...'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              </>
              )}
              
            
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>
                          Admin
                        </SelectItem>
                        <SelectItem value={UserRole.USER}>
                          User
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {user?.isOauth === false && (
              <FormField 
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => ( 
                <FormItem className='flex justify-between items-center rounded-lg border p-3 shadow-sm'>
                  <div>
                    <FormLabel>Two Factor Authentication</FormLabel>
                    <FormDescription>
                      Enable Two Factor Authentication
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
              />
              )}

            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button type='submit' disabled={isPending}>Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingPage