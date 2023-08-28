import React from 'react'
import withAuth from "../withAuth"
import DashboardLayout from "./DashboardLayout"
import WellsLogo from '@/icons/WellsLogo'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="">
        <WellsLogo />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(Dashboard)
