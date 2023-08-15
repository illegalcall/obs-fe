import React from 'react'
import withAuth from "../withAuth"
import SideMenu from "./SideMenu"

const Dashboard = () => {
  return (
    <div className="w-full grid grid-cols-5">
      <SideMenu />
      <div className="col-span-4">
        Hi
      </div>
    </div>
  )
}

export default withAuth(Dashboard)
