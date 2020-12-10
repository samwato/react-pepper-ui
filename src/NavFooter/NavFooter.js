import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './NavFooter.module.css'

const NavFooter = ({ children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  let styles = {
    color: theme.textColor,
    backgroundColor: theme.bgColor,
    borderTop: `1px solid ${theme.color2}`
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

export default NavFooter
