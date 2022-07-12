import React, { useState } from 'react'
import Navbar from './NavBar'

const Layout: React.FC<{
  children:  React.ReactNode
}> = ({ children }) => {
  const [count, setCount] = useState(0)

  return (
    <div className="layout">
      <Navbar />
      <button onClick={() => { setCount(old => old + 1)}}>
        {count}
      </button>
      <main>{children}</main>
    </div>
  )
}

export default Layout