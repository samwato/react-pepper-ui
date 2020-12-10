import React, { createContext, useState, useEffect } from 'react'

export const ViewportContext = createContext()

const ViewportContextProvider = ({ children }) => {
  const breakPoint = 750
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [isMobile, setIsMobile] = useState(false)
  

  useEffect(() => {
    
    const handleWindowResize = () => {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        if(window.innerWidth < breakPoint) {
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
      }, 300)
    }
    
    handleWindowResize()
    
    window.addEventListener("resize", handleWindowResize)
    
    return (
      () => window.removeEventListener("resize", handleWindowResize)
    )
  }, [])

  return (
    <ViewportContext.Provider value={{ width, height, isMobile }}>
      {children}
    </ViewportContext.Provider>
  )
}

export default ViewportContextProvider
