import React from 'react'
import Header from "./Header"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="flex items-center justify-center px-8 pt-[100px] h-full">{children}</div>
    </div>
  )
}

export default Layout