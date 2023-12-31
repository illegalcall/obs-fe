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
import { APIService } from "@/service"
import { AccountStatus } from "@/types"
import { Badge } from "@/components/ui/badge"


export type Account = {
  accountId: string
  fullName: string
  createdAt: string
  isApproved: string
}

const Actions = ({ account }: { account: any }) => {
  const navigate = useNavigate()
  const apiService = new APIService()


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate(`/admin/${account.accountId}/transactions`)}>View Transactions</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => apiService.approveAccount(account.accountId, AccountStatus.ACCEPTED)}>Approve</DropdownMenuItem>
        <DropdownMenuItem onClick={() => apiService.approveAccount(account.accountId, AccountStatus.REJECTED)}><span className="text-red-400">Reject</span></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "accountId",
    header: "Account Id",
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          className="px-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "isApproved",
    header: ({ column }) => {
      return (
        <Button
          className="px-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ cell }) => {
      if (!cell.getValue()) {
        return <Badge variant="outline">PENDING</Badge>
      }
      return <Badge variant="outline"><>{cell.getValue()}</></Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original

      return (
        <Actions account={account} />
      )
    },
  },
]
