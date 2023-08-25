import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";

interface ITxn {
    transactionId: string
    toUserId: string
    fromUserId: string
    txnType: string
    amount: string
    completedAt: string
    remarks?: string
    credit?: boolean
  }

export const columns: ColumnDef<ITxn>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction Id",
  },
  {
    accessorKey: "toUserId",
    header: "To User Id",
  },
  {
    accessorKey: "fromUserId",
    header: "From User Id",
  },
  {
    accessorKey: "txnType",
    header: "Txn Type",
  },
  {
    accessorKey: "completedAt",
    header: "Completed At",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
