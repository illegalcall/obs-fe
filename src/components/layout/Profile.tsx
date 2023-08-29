import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordSchema, resetTxnPasswordSchema } from '@/types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { APIService } from '@/service'
import { useStore } from '@/store'
import { toast } from '../ui/use-toast'

const Profile = () => {
  const apiService = new APIService()
  const [accountId] = useStore(
    (state) => [state.accountId],
  )
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword:""
    },
  })
  const resetTxnPasswordForm = useForm<z.infer<typeof resetTxnPasswordSchema>>({
    resolver: zodResolver(resetTxnPasswordSchema),
    defaultValues: {
      transactionPassword: "",
      confirmTransactionPassword:""
    },
  })

  function onResetPasswordSubmit(values: z.infer<typeof resetPasswordSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    apiService.resetPass(accountId,values.password).then((d)=>{
      toast({
        title:"Login Password updated successfully"
      })
    }).catch((e)=>{
      toast({
        title:"Error occured"
      })
    })
    console.log(values)
  }
  function onResetTxnPasswordSubmit(values: z.infer<typeof resetTxnPasswordSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    apiService.resetTxnPass(accountId,values.transactionPassword).then((d)=>{
      toast({
        title:"Transaction Password updated successfully"
      })
    }).catch((e)=>{
      toast({
        title:"Error occured"
      })
    })
    console.log(values)
  }

  return (
    <div className="w-full flex gap-10">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Reset your netbanking password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...resetPasswordForm}>
            <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-8">
            <FormField
              control={resetPasswordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your netbanking password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetPasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Login Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Re-enter your login password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Reset transaction password</CardTitle>
          <CardDescription>Reset your netbanking transaction password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...resetTxnPasswordForm}>
            <form onSubmit={resetTxnPasswordForm.handleSubmit(onResetTxnPasswordSubmit)} className="space-y-8">
              <FormField
                  control={resetTxnPasswordForm.control}
                  name="transactionPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be your transaction password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetTxnPasswordForm.control}
                  name="confirmTransactionPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Transaction Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Re-enter your transaction password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
