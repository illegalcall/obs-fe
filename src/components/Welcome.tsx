import React from 'react'
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-1 items-start">
      <h2 className="text-3xl font-semibold mb-5">
        🎉 Welcome to the best bank in the world 🎉
      </h2>
      <div className="flex gap-4 items-center">
        <p>You can create your account <Button onClick={() => navigate('/create-account')} variant="link" className="p-0 text-md text-blue-500">here</Button></p>
      </div>
      <div className="flex gap-4 items-center">
        <p>If you already have an account? Click <Button onClick={() => navigate('/signin')} variant="link" className="p-0 text-md text-blue-500">here</Button></p>
      </div>
    </div>
  )
}

export default Welcome
