import React, { createContext, useState } from 'react'



export const registerContext=createContext()

const Contextshare = ({children}) => {

    const [registerData,setRegisterData]=useState("")
  return (
    <>
    
          <registerContext.Provider value={{registerData,setRegisterData}}>
              {children}
          </registerContext.Provider></>
  )
}

export default Contextshare