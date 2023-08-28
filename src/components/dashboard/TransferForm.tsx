import React, { useEffect, useState } from 'react'
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
import { TransferType, addBeneficiaryFormSchema, fundsTransferFormSchema } from "@/types"
import { useToast } from "../ui/use-toast"
import { APIService } from '@/service'
import { useStore } from '@/store'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '../ui/label'

interface IBeneficiary {
  netbankingIdofPayee: string;
  beneficiaryAccountId: string;
  beneficiaryName: string;
}

const TransferForm = ({ type }: { type: TransferType }) => {
  const apiService = new APIService()
  const fundsTransferForm = useForm<z.infer<typeof fundsTransferFormSchema>>({
    resolver: zodResolver(fundsTransferFormSchema),
    defaultValues: {
      txnType: "",
      fromUserId: "",
      toUserId: "",
      amount: 0,
      remarks: "",
    },
  })
  const addBeneficiaryForm = useForm<z.infer<typeof addBeneficiaryFormSchema>>({
    resolver: zodResolver(addBeneficiaryFormSchema),
    defaultValues: {
      accountId: "",
      name: "",
      netbankingIdOfPayee:""
    },
  })

  const [beneficiaryOpen, setBeneficiaryOpen] = useState(false)
  const { toast } = useToast()
  const [accountId] = useStore((state) => [state.accountId])
  const [beneficiaries, setBeneficiaries]=useState<IBeneficiary[]>([])

  useEffect(() => {
    fundsTransferForm.setValue("txnType", 'dasdsada')
    fundsTransferForm.setValue("fromUserId", 'accountId')
  }, [type])

  useEffect(()=>{
    if(accountId) apiService.getBeneficary(accountId).then((data)=>{
      setBeneficiaries(data)
    })
  },[accountId])


  const onBeneficiarySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // this part is for stopping parent forms to trigger their submit
    if (event) {
      // sometimes not true, e.g. React Native
      if (typeof event.preventDefault === 'function') {
        event.preventDefault()
      }
      if (typeof event.stopPropagation === 'function') {
        // prevent any outer forms from receiving the event too
        event.stopPropagation()
      }
    }
    //TODO: Add netbanking payee id to add beneficiary form

    return addBeneficiaryForm.handleSubmit(async (values) => {
      setBeneficiaryOpen(false)
      toast({
        title: "🫂 Beneficiary added",
      })
      console.log(values)
      apiService.addBeneficary(values).then((d)=>{
        setBeneficiaries(d)
      })

    })(event)
  }

  async function onSubmit(values: z.infer<typeof fundsTransferFormSchema>) {
    console.log(values)
    const res = await apiService.transfer(values)
    if (res.message) {
      toast({
        title: res.message
      })
      fundsTransferForm.setError('amount', {
        message: res.message
      })
    }
    else {
      console.log('res', res)
      toast({
        title: "Funds transfer request submitted 💰",
      })
      fundsTransferForm.reset()
    }
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
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>To Account Id</FormLabel>

                  {/* <Input placeholder="" {...field} /> */}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger >
                        <SelectValue placeholder="Select a beneficiary" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Beneficiares</SelectLabel>
                        {beneficiaries.map((b) => (<SelectItem key={b.beneficiaryAccountId} value={b.beneficiaryAccountId}>{b.beneficiaryName}</SelectItem>))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    <Dialog onOpenChange={setBeneficiaryOpen} open={beneficiaryOpen}>
                      Dont have a beneficiary? Add one{" "}
                      <DialogTrigger>
                        <span onClick={() => setBeneficiaryOpen(true)} className='text-blue-400 cursor-pointer'>here</span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add beneficiary</DialogTitle>
                          <DialogDescription>
                            You can add a beneficiary here.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...addBeneficiaryForm}>
                          <form
                            onSubmit={onBeneficiarySubmit}
                            className="space-y-8">
                            <FormField
                              control={addBeneficiaryForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ram" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    This is your public display name.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={addBeneficiaryForm.control}
                              name="accountId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Account Id</FormLabel>
                                  <FormControl>
                                    <Input placeholder="" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    This is your account id.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Submit</Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
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
