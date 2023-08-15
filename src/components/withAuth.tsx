import { useStore } from "@/store"
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"


const withAuth = (WrappedComponent: React.FunctionComponent) => {
  return (props: any) => {
    const navigate = useNavigate()
    const [accountId] = useStore(
      (state) => [state.accountId],
    )
    // If no accountId was found, redirect to login page.
    useEffect(() => {
      if (!accountId) {
        navigate('/signin')
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}

export default withAuth
