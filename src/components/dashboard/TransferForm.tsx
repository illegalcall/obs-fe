import React from 'react'
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
import { TransferType } from "@/types"

const fundsTransferFormSchema = z.object({
  type: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const TransferForm = ({ type }: { type: TransferType }) => {
  const fundsTransferForm = useForm<z.infer<typeof fundsTransferFormSchema>>({
    resolver: zodResolver(fundsTransferFormSchema),
    defaultValues: {
      type: "",
    },
  })

  function onSubmit(values: z.infer<typeof fundsTransferFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (

    <Form {...fundsTransferForm}>
      <form onSubmit={fundsTransferForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={fundsTransferForm.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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

export default TransferForm
