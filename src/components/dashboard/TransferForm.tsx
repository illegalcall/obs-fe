import React, { useEffect } from 'react'
import DashboardLayout from "./DashboardLayout"
import withAuth from "../withAuth"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { TransferType, fundsTransferFormSchema } from "@/types"
import { useToast } from "../ui/use-toast"
import { APIService } from '@/service'



const TransferForm = ({ type }: { type: TransferType }) => {
  const apiService = new APIService()
  const fundsTransferForm = useForm<z.infer<typeof fundsTransferFormSchema>>({
    resolver: zodResolver(fundsTransferFormSchema),
    defaultValues: {
      transactionType: "",
      fromUserId: "",
      toUserId: "",
      amount: 0,
      remarks: "",
    },
  })
  const { toast } = useToast()

  useEffect(() => {
    fundsTransferForm.setValue("transactionType", type)
    fundsTransferForm.setValue("fromUserId", 'qweqqweqwewqs')
  }, [type])

  async function onSubmit(values: z.infer<typeof fundsTransferFormSchema>) {
    console.log(values)
    const res = await apiService.transfer(values)
    console.log('res',res)
    toast({
      title: "Funds transfer request submitted 💰",
    })
    fundsTransferForm.reset()
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold">
        {type}
      </h2>
      <Form {...fundsTransferForm}>
        <form onSubmit={fundsTransferForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={fundsTransferForm.control}
            name="toUserId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To Account Id</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  This is the account id of the receiver.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={fundsTransferForm.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  This is your amount to be transferred.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={fundsTransferForm.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Remarks for the transaction.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default TransferForm
