
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



const Header = () => {
  //TODO: use store to see if user is logged in
  const [accountId, name, updateAccountId, updateName] = useStore(
    (state) => [state.accountId, state.name, state.updateAccountId, state.updateName],
  )

  const handleLogout = () => {
    updateAccountId("")
    updateName("")
  }

  return (
    <div className="flex justify-between p-4 px-7 border-b-2 mb-8">
      <span className="text-5xl font-extrabold">OBS</span>
      <DropdownMenu >
        <DropdownMenuTrigger>{accountId && <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>{name.split(" ").map((n) => n.charAt(0)).join("")}</AvatarFallback>
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
