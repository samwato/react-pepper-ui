import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

const Dashboard = ({ children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const styles = {
    backgroundColor: theme.bgColor,
    color: theme.textColor,
    height: '100%'
  }

  return (
    <div style={styles}>
      {children}
    </div>
  )
}

export default Dashboard
