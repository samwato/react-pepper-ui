import React, { useContext } from 'react'
import css from './LogoutLink.module.css'
import buildIcons from '../utils/buildIcons'
import { ThemeContext } from '../ThemeContext'

const LogoutLink = ({ children, handler }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  let styles = {}

  let iconColor = theme.iconColor

    
  /* icons */
  const icons = buildIcons(iconColor)

  return (
    <div
      onClick={handler}
      className={css.link}
      style={styles}
    >
      <img alt="" className={css.icon} src={icons['log-out']} />
      {children}
    </div>
  )
}

export default LogoutLink
