import React from 'react'

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="h-[100vh]">
        <div className=""></div>
        <h1 className="text-3xl font-extrabold mt-8 mb-10 flex justify-center">
        Online Banking managenment center</h1>
         <div className=" flex items-center justify-center">{children}</div>
    </div>
  )
}

export default Layout