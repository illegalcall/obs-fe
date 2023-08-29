import Copy from "@/icons/Copy"
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"
import { useStore } from "@/store"
import withAuth from "../withAuth"


const AccountRegistrationSuccess = () => {
  const navigate = useNavigate()
  const { netbankingId } = useParams()
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(netbankingId || '')
    toast({
      title: "Netbanking id copied to clipboard",
    })
  }


  return (
    <div className="text-center">
      <h2 className="pb-2 text-3xl font-semibold text-center">
        Congratulations 🎉
      </h2>
      <p> Your account has been registered successfully for Netbanking. You will be able to use it after admin approval.</p>
      <p> Your netbanking id is: <b>{netbankingId}</b> <Copy onClick={handleCopy} className="h-[30px] inline cursor-pointer" /> </p>
      <p> Click <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signin')}>here</span> to login.</p>
    </div>
  )
}

export default withAuth(AccountRegistrationSuccess)
