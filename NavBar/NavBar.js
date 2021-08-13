import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './NavBar.module.css'

const NavBar = ({ children, fixed }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  let styles = {
    color: theme.textColor,
    background: theme.hdColor,
    boxShadow: '0 0.7px 1.4px rgb(0 0 0 / 7%), 0 1.9px 4px rgb(0 0 0 / 5%), 0 4.5px 10px rgb(0 0 0 / 5%), 0 15px 32px rgb(0 0 0 / 4%)',
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
