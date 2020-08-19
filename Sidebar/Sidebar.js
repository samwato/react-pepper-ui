import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { ViewportContext } from '../ViewportContext'
import css from './Sidebar.module.css'

const Sidebar = ({ children, toggle, handler }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  const { isMobile } = useContext(ViewportContext)


  let styles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    borderRight: `1px solid ${theme.color2}`
  }
  
  if (!toggle && isMobile) {
    styles.position = 'fixed'
    styles.zIndex = '9'
    styles.left = '-400px'
  }
  
  if (toggle && isMobile) {
    styles.position = 'fixed'
    styles.zIndex = '9'
    styles.left = '0'
    styles.boxShadow = '0 2px 20px rgba(0,0,0,0.1)'
  }


  return (
    <nav
      className={css.sidebar}
      style={styles}
    >
      {children}
    </nav>
  )
}

export default Sidebar
