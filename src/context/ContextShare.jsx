import React, { useState } from 'react'
import { createContext } from 'react'

export const isAuthTokenContext =  createContext()

function ContextShare({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <>
   
    <isAuthTokenContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </isAuthTokenContext.Provider>
    
    </>
  )
}

export default ContextShare