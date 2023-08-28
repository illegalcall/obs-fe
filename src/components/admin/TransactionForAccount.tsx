import React, { useEffect, useState } from 'react'
import { DataTable } from "./accounts/DataTable"
import { columns } from "./accounts/transactionColumn"
import { APIService } from "@/service"
import { ITxn } from "@/types"
import { useLocation } from "react-router-dom"
import { TransactionsDataTable } from "./accounts/TransactionsDataTable"

interface Props {
  data?: ITxn[]
  accId?: string
}


const TransactionForAccount: React.FC<Props> = ({ data, accId }) => {
  const apiService = new APIService()
  const [txnData, setTxnData] = useState<ITxn[]>([])
  const [accountId, setAccountId] = useState('')

  // get account id from query paramsn using react router dom
  const { pathname } = useLocation()


  useEffect(() => {

    if (!accountId) {
      setAccountId(pathname.split("/")[2])
    }

    if (!accountId && accId) {
      setAccountId(accId)
    }

    if (data) {
      setTxnData(data)
    }
  }, [])
  useEffect(() => {
    if (accountId && !data) {
      apiService.getTransactionsByAccountId(accountId).then((d) => {
        console.log('data =', d)
        setTxnData(d)
      })
    }
  }, [accountId])


  return (
    <div>
      <h1 className="text-2xl font-bold ">Transactions</h1>
      Transaction For Account: {accountId}
      <TransactionsDataTable columns={columns} data={txnData} />
    </div >
  )
}

export default TransactionForAccount