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

interface ITxn {
  transactionId: string
  toUserId: string
  fromUserId: string
  transactionType: string
  amount: string
  completedAt: string
  remarks?: string
  credit?: boolean
}

const transactions: ITxn[] = [
  {
    transactionId: "123456789",
    toUserId: "123456789",
    fromUserId: "123456789",
    transactionType: "IMPS",
    amount: "1000",
    completedAt: "2021-09-01",
    remarks: "Salary",
    credit: true,
  },
  // make 4 more of these
  {
    transactionId: "123456789",
    toUserId: "123456789",
    fromUserId: "123456789",
    transactionType: "IMPS",
    amount: "1000",
    completedAt: "2021-09-01",
    remarks: "Salary",
    credit: false,
  },
  {
    transactionId: "123456789",
    toUserId: "123456789",
    fromUserId: "123456789",
    transactionType: "IMPS",
    amount: "1000",
    completedAt: "2021-09-01",
    remarks: "Salary",
    credit: true,
  },
  {
    transactionId: "123456789",
    toUserId: "123456789",
    fromUserId: "123456789",
    transactionType: "IMPS",
    amount: "1000",
    completedAt: "2021-09-01",
    remarks: "Salary",
    credit: false,
  }
]

const Transactions = () => {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold ">Transactions</h1>
      <Table>
        <TableCaption>A summary of your transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Txn Id</TableHead>
            <TableHead>To</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Completed At</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.transactionId}>
              <TableCell>{txn.transactionId}</TableCell>
              <TableCell>{txn.toUserId}</TableCell>
              <TableCell>{txn.fromUserId}</TableCell>
              <TableCell>{txn.transactionType}</TableCell>
              <TableCell>{txn.completedAt}</TableCell>
              <TableCell className={`font-semibold text-right ${txn.credit ? 'text-red-400' : 'text-green-500'}`}>{txn.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Transactions
