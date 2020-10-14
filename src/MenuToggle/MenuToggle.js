import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { ViewportContext } from '../ViewportContext'
import css from './MenuToggle.module.css'
import buildIcons from '../utils/buildIcons'

const MenuToggle = ({ toggle, handler }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  const { isMobile } = useContext(ViewportContext)

  /* icons */
  const icons = buildIcons(theme.iconColor)

  return (
    <button
      className={css.button}
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
