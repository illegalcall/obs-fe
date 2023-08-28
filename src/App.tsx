import { useState } from "react"
import Netbanking from "./components/signin/Netbanking"
import Layout from "./components/layout"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateAccount from "./components/signin/CreateAccount"
import AccountCreationSuccess from "./components/signin/AccountCreationSuccess"
import { Toaster } from "@/components/ui/toaster"
import AccountRegistrationSuccess from "./components/signin/AccountRegistrationSuccess"
import Dashboard from "./components/dashboard"
import Welcome from "./components/Welcome"
import FundTransfer from "./components/dashboard/FundTransfer"
import ListAccounts from "./components/admin/ListAccounts"
import Profile from "./components/layout/Profile"
import TransactionForAccount from "./components/admin/TransactionForAccount"
import Withdrawal from "./components/dashboard/withdrawal"
import AdminLayout from "./components/admin/AdminLayout"
import Transactions from "./components/dashboard/Transactions"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<Netbanking />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/account-creation-success/:accountId" element={<AccountCreationSuccess />} />
          <Route path="/account-registration-success/:netbankingId" element={<AccountRegistrationSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/fund-transfer" element={<FundTransfer />} />
          <Route path="/admin/accounts" element={<ListAccounts />} />
          <Route path="/profile/:netbankingId" element={<Profile />} />
          <Route path="/admin/:accountId/transactions" element={<AdminLayout><TransactionForAccount /></AdminLayout>} />
        </Routes>
        <Toaster />
      </Layout>
    </Router>
  )
}

export default App
