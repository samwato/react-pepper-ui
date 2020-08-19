import React, { useContext } from 'react'
import css from './SidebarItem.module.css'
import buildIcons from '../utils/buildIcons'
import { ThemeContext } from '../ThemeContext'

const SidebarItem = ({ children, icon }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  let iconColor = theme.iconColor
  
  /* icons */
  const icons = buildIcons(iconColor)
  
  return (
    <div className={css.item}>
      { icon ? <img alt="" className={css.icon} src={icons[icon]} /> : null }
      {children}
    </div>
  )
  
}

export default SidebarItem
