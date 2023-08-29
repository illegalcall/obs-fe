import React from 'react'
import { useLocation, useNavigate } from "react-router-dom"

const MenuItem: React.FC<{
  active: boolean
  name: string
  onClick: () => void
}> = ({ active, name, onClick }) => {
  return (
    <div
      className={`text-white cursor-pointer ${active ? 'bg-gray-600' : ''} border-2 rounded-md p-3 flex justify-center cursor-pointer hover:bg-slate-700`}
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
    return pathname.includes(route)
  }
  return (
    <div className="col-span-1 bg-primary">
      <MenuItem active={checkActive('/transactions')} name={'Transactions'} onClick={() => navigate('/transactions')} />
      <MenuItem active={checkActive('/fund-transfer')} name={"Fund Transfer"} onClick={() => navigate('/fund-transfer')} />
      <MenuItem active={checkActive('/withdrawal')} name={"Withdrawal"} onClick={() => navigate('/withdrawal')} />
    </div>
  )
}

export default SideMenu
