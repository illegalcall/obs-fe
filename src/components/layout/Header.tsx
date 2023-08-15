import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"


const Header = () => {
  const navigate = useNavigate()
  //TODO: use store to see if user is logged in
  const isUserLoggedIn = false
  return (
    <div className="flex justify-between p-4 px-7 border-b-2 mb-8">
      <span className="text-5xl font-extrabold">OBS</span>
      {isUserLoggedIn && <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>}
    </div>
  )
}

export default Header
