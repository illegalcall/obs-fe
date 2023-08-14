import { useState } from "react"
import Netbanking from "./components/signin/Netbanking"
import Layout from "./components/Layout"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateAccount from "./components/signin/CreateAccount"

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Netbanking />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App
