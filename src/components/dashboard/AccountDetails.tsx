import React, { useEffect, useState } from 'react'
import DashboardLayout from "./DashboardLayout"
import withAuth from "../withAuth"
import { APIService } from "@/service"
import { useStore } from "@/store"
import AccountStatement from "./AccountStatement"

const Item = ({
  property, value
}: { property: string, value: string }) => {
  return (
    <div className="flex gap-2 items-center"><span className=' font-bold'>{property}:</span><span className=''>{value}</span></div>
  )
}

const AccountDetails = () => {
  const apiService = new APIService()
  const [accountId] = useStore((state) => [state.accountId])
  const [loading, setLoading] = useState(true)

  const [accountDetails, setAccountDetails] = useState({
    name: "", activeSince: "", balance: 0
  })
  useEffect(() => {
    if (accountId === "") return
    apiService.getAccountDetails(accountId).then((res) => {
      const { fullName, createdAt, balance } = res
      setAccountDetails({ name: fullName, activeSince: createdAt, balance })
      setLoading(false)
    })
  }, [accountId])

  const { name, activeSince, balance } = accountDetails

  if (loading) return <div>Loading...</div>

  return (
    <DashboardLayout>
      <div className='flex flex-col gap-2'>
        <Item property={'Account No'} value={accountId} />
        <Item property={'Name'} value={name} />
        <Item property={'Active Since'} value={activeSince} />
        <Item property={'Balance'} value={balance + ""} />
      </div>
      <AccountStatement />
    </DashboardLayout>
  )
}

export default withAuth(AccountDetails)
