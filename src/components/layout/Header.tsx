
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"

import { useStore } from "@/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  //TODO: use store to see if user is logged in
  const [accountId, name, updateAccountId, updateName] = useStore(
    (state) => [state.accountId, state.name, state.updateAccountId, state.updateName],
  )

  const handleLogout = () => {
    updateAccountId("")
    updateName("")
    window.sessionStorage.removeItem("accountId")
    window.sessionStorage.removeItem("name")
    navigate("/signin")
  }

  const handleProfileNavigation = () => {
    navigate(`/profile/${accountId}`)
  }

  const getName = () => {
    return name.split(" ").slice(1).map((n) => n.charAt(0)).join("")
  }

  return (
    <div className="bg-primary flex justify-between p-4 px-7 border-b-2 mb-8 absolute top-0 w-full">
      <span className="text-5xl cursor-pointer" style={{ fontFamily: "Montserrat, sans-serif" }} onClick={() => navigate('/dashboard')}>WFH</span>
      <DropdownMenu >
        <DropdownMenuTrigger>{(accountId || window.sessionStorage.getItem("accountId"))
          && <Avatar>
            <AvatarFallback className="bg-yellow-500"><span className="text-black">{getName() || 'TU'}</span></AvatarFallback>
          </Avatar>}

        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{accountId}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleProfileNavigation}>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Header
