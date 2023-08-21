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
import TransferForm from "./TransferForm"
import { TransferType } from "@/types"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const FundTransfer = () => {

  const [transferType, setTransferType] = React.useState<TransferType>(TransferType.IMPS)
  const handleSubmit = (e: any) => {
    console.log(e.target.value)
    setTransferType(e.target.value)
  }

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-3xl font-semibold">
          Transfer Funds
        </h2>
        <RadioGroup defaultValue={transferType} className="my-5">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TransferType.IMPS} id="imps" onClick={handleSubmit} />
            <Label htmlFor="imps">IMPS</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TransferType.NEFT} id="neft" onClick={handleSubmit} />
            <Label htmlFor="neft">NEFT</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TransferType.RTGS} id="rtgs" onClick={handleSubmit} />
            <Label htmlFor="rtgs">RTGS</Label>
          </div>
        </RadioGroup>
        <TransferForm type={transferType} />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(FundTransfer)
