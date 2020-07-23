import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
  
  const setLightTheme = (bool) => {
    updateTheme({ ...theme, isLightTheme: bool})
  }

  const switchTheme = () => {
    updateTheme({ ...theme, isLightTheme: !theme.isLightTheme})
  }

  const [theme, updateTheme] = useState({
    isLightTheme: true,
    light: {
      bgColor: 'rgb(244, 247, 250)',
      hdColor: 'rgb(255, 255, 255)',
      color1: 'rgb(255,255,255)',
      color2: 'rgb(238,241,243)',
      color3: 'rgb(219,222,224)',
      color4: 'rgb(167,172,178)',
      textColor: 'rgb(36, 41, 46)',
      iconColor: 'rgb(36, 41, 46)',
      featureDark: 'rgb(51,120,235)',
      featureLight: 'rgba(0,102,255,0.1)',
      successLight: 'rgba(96,196,128,0.1)',
      successDark: 'rgb(96,196,128)',
      errorLight: 'rgba(224,44,84,0.1)',
      errorDark: 'rgb(224,44,84)',
      shadow1: '0px 4px 8px rgba(0, 0, 0, 0.03)',
      borderRadius: '7px'
    },
    dark: {
      // bgColor: 'rgb(27,31,35)',
      // hdColor: 'rgb(36,41,46)',
      // color1: 'rgb(36,41,46)',
      // color2: 'rgb(47, 54, 61)',
      // color3: 'rgb(68,77,86)',
      bgColor: 'rgb(36,41,46)',
      hdColor: 'rgb(45,51,57)',
      color1: 'rgb(45,51,57)',
      color2: 'rgb(55, 64, 72)',
      color3: 'rgb(72,82,91)',
      color4: 'rgb(167,172,178)',
      textColor: 'rgb(255,255,255)',
      iconColor: 'rgb(255,255,255)',
      featureDark: 'rgb(0,102,255)',
      featureLight: 'rgba(0,102,255,0.2)',
      successLight: 'rgba(96,196,128,0.1)',
      successDark: 'rgb(96,196,128)',
      errorLight: 'rgba(224,44,84,0.1)',
      errorDark: 'rgb(224,44,84)',
      shadow1: '0px 4px 8px rgba(0, 0, 0, 0.05)',
      borderRadius: '7px'
    }
  })

  return (
    <ThemeContext.Provider value={{ ...theme, switchTheme, setLightTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
