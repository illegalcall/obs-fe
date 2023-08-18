
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

  const getName = () => {
    return name.split(" ").slice(1).map((n) => n.charAt(0)).join("")
  }

  return (
    <div className="flex justify-between p-4 px-7 border-b-2 mb-8">
      <span className="text-5xl font-extrabold cursor-pointer" onClick={() => navigate('/dashboard')}>OBS</span>
      <DropdownMenu >
        <DropdownMenuTrigger>{(accountId || window.sessionStorage.getItem("accountId")) && <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>{getName()}</AvatarFallback>
        </Avatar>}</DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{accountId}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Header
