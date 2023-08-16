import React from 'react'
import DashboardLayout from "./DashboardLayout"
import withAuth from "../withAuth"

const FundTransfer = () => {
  return (
    <DashboardLayout>
      <div>
        FT
      </div>
    </DashboardLayout>
  )
}

export default withAuth(FundTransfer)
