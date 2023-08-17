import Copy from "@/icons/Copy"
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"



const AccountCreationSuccess = () => {
  const navigate = useNavigate()
  const { accountId: info } = useParams()
  const { toast } = useToast()

  const accountId = info?.split('&')[0]
  const name = info?.split('&')[1]
  const handleCopy = () => {
    navigator.clipboard.writeText(accountId || '')
    toast({
      title: "Account id copied to clipboard",
    })
  }

  return (
    <div className="text-center">
      <h2 className="pb-2 text-3xl font-semibold text-center">
        Congratulations, {name} 🎉

      </h2>
      <p> Your account has been created successfully. </p>
      <p> Your account number is: <b>{accountId}</b> <Copy onClick={handleCopy} className="h-[30px] inline cursor-pointer" /> </p>
      <p> Click <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signin')}>here</span> register for netbanking to start using your bank online.</p>



    </div>
  )
}

export default AccountCreationSuccess
