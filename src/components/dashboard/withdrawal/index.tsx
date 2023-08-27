import React, { useState } from 'react'
import DashboardLayout from "../DashboardLayout"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "../../ui/use-toast"
import { withdrawalFormSchema } from "@/types"
import { APIService } from "@/service"
import { useNavigate } from "react-router-dom"

const Withdrawal = () => {
  const { toast } = useToast()
  const apiService = new APIService()
  const navigate = useNavigate()
  const [withdrawalResponse, setWithdrawalResponse] = useState()

  const form = useForm<z.infer<typeof withdrawalFormSchema>>({
    resolver: zodResolver(withdrawalFormSchema),
    defaultValues: {
      amount: 0,
    },
  })

  function onSubmit(values: z.infer<typeof withdrawalFormSchema>) {
    toast({
      title: 'Withdrawal request submitted'
    })
    apiService.withdrawal(values).then((d) => {
      console.log('response', d)
      setWithdrawalResponse(d)
    })

    console.log(values)
  }

  const WithdrawalForm = () => {
    return (
      <Form {...form}>
        <FormLabel>You can withdraw money from you account using this form</FormLabel>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormDescription>
                  This is the amount you want to withdraw.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }

  const SuccessfulWithdrawal = () => {
    return (
      <div>
        <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">Successfully withdrawn</h2>
        <p className="text-md ">Withdrawal Request Id: {withdrawalResponse?.['id']}</p>
        <p className="">Amount: {withdrawalResponse?.['amount']}</p>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold ">Withdrawal</h1>
      <div className="">
        {withdrawalResponse ? <SuccessfulWithdrawal /> : <WithdrawalForm />}

      </div>
    </DashboardLayout>
  )
}

export default Withdrawal
