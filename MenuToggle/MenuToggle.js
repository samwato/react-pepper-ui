import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './MenuToggle.module.css'
import buildIcons from '../utils/buildIcons'

const MenuToggle = ({ toggle, handler, isMobile }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* icons */
  const icons = buildIcons(theme.iconColor)

  return (
    <button
      className={isMobile ? css.button : [css.button, css.hide].join(' ')}
      onClick={() => {
        if (isMobile) handler()
      }}
    >
      {toggle ?
        <img alt="" className={css.icon} src={icons.x} />
      :
        <img alt="" className={css.icon} src={icons.menu} />
      }
    </button>
  )
}

export default MenuToggle
