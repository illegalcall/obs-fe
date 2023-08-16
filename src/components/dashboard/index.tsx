import React from 'react'
import withAuth from "../withAuth"
import DashboardLayout from "./DashboardLayout"

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="">Dashboard</div>
    </DashboardLayout>
  )
}

export default withAuth(Dashboard)
