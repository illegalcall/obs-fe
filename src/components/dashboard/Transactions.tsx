import React, { useEffect, useState } from 'react'
import DashboardLayout from "./DashboardLayout"
import withAuth from "../withAuth"
import { APIService } from "@/service"
import { useStore } from "@/store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import TransactionForAccount from "../admin/TransactionForAccount"
import { ITxn } from "@/types"


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

  return (<DashboardLayout><TransactionForAccount data={txnData} accId={accountId} /></DashboardLayout>)

}

export default withAuth(Transactions)
