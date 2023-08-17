import React from 'react'
import SideMenu from "./SideMenu"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full grid grid-cols-5 gap-5">
      <SideMenu />
      <div className="col-span-4">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
