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
      else if (window.sessionStorage.getItem("isAdmin") == "true" && !window.location.href.includes("admin")) {
        navigate('/admin/accounts')
      }
      else {

        updateAccountId(window.sessionStorage.getItem("accountId") || "")
        updateName(window.sessionStorage.getItem("name") || "")

      }
    }, [])

    // check isAdmin before accessing any admin routes
    useEffect(() => {
      // check if the current url contains /admin
      if (window.location.href.includes("/admin") && window.sessionStorage.getItem("isAdmin") !== "true") {
        navigate('/signin')
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}

export default withAuth
