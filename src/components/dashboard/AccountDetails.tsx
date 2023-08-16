import React from 'react'
import DashboardLayout from "./DashboardLayout"
import withAuth from "../withAuth"

const AccountDetails = () => {
  return (
    <DashboardLayout>
      <div>
        AD
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AccountDetails)
