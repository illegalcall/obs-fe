import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"

const accounts = [
  {
    accountId: "INV001",
    fullName: "Mr. John Doe",
    createdAt: "$250.00",
    status: "Pending",
    isApproved: "true"
  },
]

const ListAccounts = () => {
  const handleApprove = (accountId: string) => {
    console.log(accountId)
  }
  const handleReject = (accountId: string) => {
    console.log(accountId)
  }

  return (
    <div className="w-full">
      <Table>
        <TableCaption>List of account requests</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Account id</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.accountId}>
              <TableCell className="font-medium">{account.accountId}</TableCell>
              <TableCell>{account.fullName}</TableCell>
              <TableCell>{account.createdAt}</TableCell>
              <TableCell>{account.status}</TableCell>
              <TableCell className="flex gap-2 justify-end ">
                <Button onClick={() => handleApprove(account.accountId)}>Approve</Button>
                <Button variant={'outline'} onClick={() => handleReject(account.accountId)}>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  )
}

export default ListAccounts
