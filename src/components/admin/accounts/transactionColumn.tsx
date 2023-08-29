import { Button } from "@/components/ui/button"

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
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

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
    // header: "Txn Type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Txn Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ cell }) => {
      return <Badge variant="outline"><>{cell.getValue()}</></Badge>
    }
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
