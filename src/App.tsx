import { useState } from "react"
import Netbanking from "./components/signin/Netbanking"
import Layout from "./components/Layout"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateAccount from "./components/signin/CreateAccount"
import AccountCreationSuccess from "./components/signin/AccountCreationSuccess"
import { Toaster } from "@/components/ui/toaster"
import AccountRegistrationSuccess from "./components/signin/AccountRegistrationSuccess"
import Dashboard from "./components/dashboard/Dashboard"
function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/signin" element={<Netbanking />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/account-creation-success/:accountId" element={<AccountCreationSuccess />} />
          <Route path="/account-registration-success/:netbankingId" element={<AccountRegistrationSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Toaster />
    </Layout>
  )
}

export default App
