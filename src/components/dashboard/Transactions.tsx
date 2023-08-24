import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { APIService } from '@/service'
import { useStore } from '@/store'
import { set } from 'zod'

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


const Transactions = () => {
  const apiService = new APIService()
  const [txnData, setTxnData] = useState<ITxn[]>([])
  const [accountId] = useStore(
    (state) => [state.accountId],
  )
  useEffect(() => {
    apiService.getTransactions(accountId).then((data) => {
      console.log('data', data)
      setTxnData(data)
    })
  }, [])

  if (!txnData.length) {
    return (
      <div className="mt-4">
        <h1 className="text-2xl font-bold ">Transactions</h1>
        <p>No data to display</p>
      </div>
    )
  }

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
          {
            txnData.map((txn) => (
              <TableRow key={txn.transactionId}>
                <TableCell>{txn.transactionId}</TableCell>
                <TableCell>{txn.toUserId}</TableCell>
                <TableCell>{txn.fromUserId}</TableCell>
                <TableCell>{txn.txnType}</TableCell>
                <TableCell>{txn.completedAt}</TableCell>
                <TableCell className={`font-semibold text-right ${txn.credit ? 'text-red-400' : 'text-green-500'}`}>{txn.amount}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default Transactions
