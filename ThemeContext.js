import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {

  const switchTheme = () => {
    updateTheme({ ...theme, isLightTheme: !theme.isLightTheme})
  }

  const [theme, updateTheme] = useState({
    isLightTheme: true,
    light: {
      color1: 'rgb(255,255,255)',
      color2: 'rgb(246,248,250)',
      color3: 'rgb(225,229,235)',
      textColor: 'rgb(47, 54, 61)',
      iconColor: 'rgb(47, 54, 61)',
      featureDark: 'rgb(0,102,255)',
      featureLight: 'rgb(234,241,254)',
      successLight: 'rgba(96,196,128,0.1)',
      successDark: 'rgb(96,196,128)',
      errorLight: 'rgba(224,44,84,0.1)',
      errorDark: 'rgb(224,44,84)'
    },
    dark: {
      color1: 'rgb(36,41,46)',
      color2: 'rgb(47, 54, 61)',
      color3: 'rgb(68,77,86)',
      textColor: 'rgb(255,255,255)',
      iconColor: 'rgb(255,255,255)',
      featureDark: 'rgb(0,102,255)',
      featureLight: 'rgb(234,241,254)',
      successLight: 'rgba(96,196,128,0.1)',
      successDark: 'rgb(96,196,128)',
      errorLight: 'rgba(224,44,84,0.1)',
      errorDark: 'rgb(224,44,84)'
    }
  })

  return (
    <ThemeContext.Provider value={{ ...theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
