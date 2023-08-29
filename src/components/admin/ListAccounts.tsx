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
import withAuth from "../withAuth"

const ListAccounts = () => {
  const apiService = new APIService()

  const [accData, setAccData] = useState<Account[]>([])

  useEffect(() => {
    apiService.getAllAccounts().then((d) => {
      setAccData(d)
    })
  }, [])

  return <AdminLayout><DataTable columns={columns} data={accData} /></AdminLayout>
}

export default withAuth(ListAccounts)
