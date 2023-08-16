import React from 'react'
import DashboardLayout from "./DashboardLayout"
import withAuth from "../withAuth"

const Item = ({
  property, value
}:{property: string, value: string}) => {
  return (
    <div className="flex gap-2 items-center"><span className=' font-bold'>{property}:</span><span className=''>{value}</span></div>
  )
}

const AccountDetails = () => {
  const accountId="123213213215", name="Hoeaae adasa", activeSince = "12/08/2022", balance=1321;
  return (
    <DashboardLayout>
      <div className='flex flex-col gap-2'>
       <Item property={'Account No'} value={accountId} />
       <Item property={'Name'} value={name} />
       <Item property={'Active Since'} value={activeSince} />
       <Item property={'Balance'} value={balance+""} />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AccountDetails)
