import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './NavBar.module.css'

const NavBar = ({ children, fixed }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  let styles = {
    color: theme.textColor,
    backgroundColor: theme.hdColor,
    borderBottom: `1px solid ${theme.color2}`
  }
  
  if (fixed) {
    styles.position = 'fixed'
    styles.top = '0'
    styles.right = '0'
    styles.left = '0'
    styles.zIndex = '12'
  }

  return (
    <nav
      className={css.navbar}
      style={styles}
    >
      {children}
    </nav>
  )
}

export default NavBar
