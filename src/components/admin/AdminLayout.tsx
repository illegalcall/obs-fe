import React from 'react'
import AdminSideMenu from "./AdminSideMenu"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full grid grid-cols-5 gap-5">
      <AdminSideMenu />
      <div className="col-span-4">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout