import React from 'react'
import { useLocation, useNavigate } from "react-router-dom"

const MenuItem: React.FC<{
  active: boolean
  name: string
  onClick: () => void
}> = ({ active, name, onClick }) => {
  return (
    <div
      className={`cursor-pointer ${active ? 'bg-gray-400' : ''} border-2 rounded-md p-3 flex justify-center cursor-pointer hover:bg-slate-600`}
      onClick={onClick}
    >
      {name}
    </div>
  )
}

const SideMenu = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const checkActive = (route: string) => {
    return pathname === route
  }
  return (
    <div className="col-span-1">
      <MenuItem active={checkActive('/account-details')} name={'Account Detail'} onClick={() => navigate('/account-details')} />
      <MenuItem active={checkActive('/fund-transfer')} name={"Fund Transfer"} onClick={() => navigate('/fund-transfer')} />
    </div>
  )
}

export default SideMenu
