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


const FundTransfer = () => {

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-3xl font-semibold">
          Transfer Funds
        </h2>
        <TransferForm type={TransferType.IMPS} />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(FundTransfer)
