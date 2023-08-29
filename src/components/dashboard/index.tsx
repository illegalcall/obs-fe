import React, { useEffect, useState } from 'react'
import withAuth from "../withAuth"
import DashboardLayout from "./DashboardLayout"
import WellsLogo from '@/icons/WellsLogo'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { APIService } from "@/service"
import { useStore } from "@/store"


const Item = ({
  property, value
}: { property: string, value: string }) => {
  return (
    <div className="flex gap-2 items-center justify-center text-center">
      <span className=' font-bold'>{property}:</span><span className=''>{value}</span>
    </div>
  )
}

const Dashboard = () => {
  const apiService = new APIService()
  const [accountId] = useStore((state) => [state.accountId])
  const [loading, setLoading] = useState(true)

  const [accountDetails, setAccountDetails] = useState({
    name: "", activeSince: "", balance: 0, accountNumber: ""
  })
  useEffect(() => {
    if (accountId === "") return
    apiService.getAccountDetails(accountId).then((res) => {
      const { fullName, createdAt, balance, accountNumber } = res
      setAccountDetails({ name: fullName, activeSince: createdAt, balance, accountNumber })
      setLoading(false)
    })
  }, [accountId])

  const { name, activeSince, balance, accountNumber } = accountDetails
  return (
    <DashboardLayout>
      <div className="">
        <WellsLogo />
        <Card className="w-[500px] text-center mx-auto">
          <CardHeader>
            <CardTitle>Account Details </CardTitle>
            <CardDescription>Some basic detials of your account.</CardDescription>
          </CardHeader>

          <CardContent className='flex flex-col gap-2 text-center'>
            <Item property={'Account No'} value={accountNumber} />
            <Item property={'Name'} value={name} />
            <Item property={'Active Since'} value={activeSince} />
            <Item property={'Balance'} value={"₹" + balance} />
          </CardContent>
          <CardFooter >
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(Dashboard)
