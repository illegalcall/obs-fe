import { useStore } from "@/store"
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"


const withAuth = (WrappedComponent: React.FunctionComponent) => {
  return (props: any) => {
    const navigate = useNavigate()
    const [accountId, updateAccountId, updateName] = useStore(
      (state) => [state.accountId, state.updateAccountId, state.updateName],
    )

    // If no accountId was found, redirect to login page.
    useEffect(() => {
      if (!accountId && !window.sessionStorage.getItem("accountId")) {
        navigate('/signin')
      }
      else {
 
          updateAccountId(window.sessionStorage.getItem("accountId")||"")
          updateName(window.sessionStorage.getItem("name")||"")
    
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}

export default withAuth
