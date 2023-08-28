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
import { Button } from "../ui/button"
import { useNavigate } from 'react-router-dom'
import { DataTable } from './accounts/DataTable'
import { Account, columns } from './accounts/columns'
import AdminLayout from "./AdminLayout"
import { APIService } from '@/service'

const accounts = [
  {
    accountId: "weqeq2132",
    fullName: "Mr. John Doe",
    createdAt: "15/08/2023",
    status: "Pending",
    isApproved: "true"
  },
  {
    accountId: "14124weqeq2132",
    fullName: "Mr. Jane Doe",
    createdAt: "16/08/2023",
    status: "Approved",
    isApproved: "true"
  },
  {
    accountId: "123231weqeq2132",
    fullName: "Mr. X",
    createdAt: "17/08/2023",
    status: "Rejected",
    isApproved: "true"
  },
]

const ListAccounts = () => {
  const apiService = new APIService()
  const navigate = useNavigate()
  const [accData, setAccData]=useState<Account[]>([])

  useEffect(()=>{
    apiService.getAllAccounts().then((d)=>{
      setAccData(d)
    })
  },[])
  
  const handleApprove = (accountId: string) => {
    console.log(accountId)
  }
  const handleReject = (accountId: string) => {
    console.log(accountId)
  }
  const handleToTransactions = (accountId: string) => {
    navigate(`/admin/${accountId}/transactions`)
  }

  return <AdminLayout><DataTable columns={columns} data={accData} /></AdminLayout>

  return <DataTable columns={columns} data={accounts} />

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
            <TableHead></TableHead>
            <TableHead className='flex justify-end"'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.accountId}>
              <TableCell className="font-medium">{account.accountId}</TableCell>
              <TableCell>{account.fullName}</TableCell>
              <TableCell>{account.createdAt}</TableCell>
              <TableCell>{account.status}</TableCell>
              <TableCell className="text-blue-400 cursor-pointer" onClick={() => handleToTransactions(account.accountId)}>transactions</TableCell>
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
