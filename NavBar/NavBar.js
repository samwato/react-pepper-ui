import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './NavBar.module.css'

const NavBar = ({ children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  let styles = {
    color: theme.textColor,
    backgroundColor: theme.hdColor,
    borderBottom: `1px solid ${theme.color2}`
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
