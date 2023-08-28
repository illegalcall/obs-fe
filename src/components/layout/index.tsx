import React from 'react'
import Header from "./Header"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="flex items-center justify-center px-8 pt-[100px] h-full">{children}</div>
      <footer className="absolute text-xs bottom-4 w-full text-center">
        WFH 2023 --{" "}
        <span
          data-cy="layout-footer-title"
          className="italic text-black-400">
          Designed with 💜 by{" "}
          Dhruv, Shriharsha, Biparnak, Pankaj

        </span>
      </footer>
    </div >
  )
}

export default Layout