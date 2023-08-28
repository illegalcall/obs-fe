import React from 'react'
import SideMenu from "./SideMenu"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full grid grid-cols-5 gap-5 h-full">
      <SideMenu />
      <div className="pt-2 col-span-4">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
