import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './LogoTitle.module.css'

const LogoTitle = ({ children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  let styles = {
    color: theme.textColor
  }

  return (
    
    <h1
      className={css.title}
      style={styles}
    >
      {children}
    </h1>
  )
}

export default LogoTitle
