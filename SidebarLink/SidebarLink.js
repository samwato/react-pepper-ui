import React, { useContext } from 'react'
import css from './SidebarLink.module.css'
import buildIcons from '../utils/buildIcons'
import { ThemeContext } from '../ThemeContext'

/* Link from react router */
import { Link, useRouteMatch } from 'react-router-dom'

const SidebarLink = ({ to, exact, children, handler, icon }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const match = useRouteMatch({
    path: to,
    exact: exact
  })
  
  let styles = {}

  let iconColor = theme.iconColor

  if (match) {
    styles.color = theme.featureDark
    iconColor = theme.featureDark
    styles.backgroundColor = 'rgba(0,0,0,0.03)'
    styles.fontWeight = '600'
  }
  
  
  
  /* icons */
  const icons = buildIcons(iconColor)

  return (
    <Link
      onClick={handler}
      className={css.link}
      style={styles}
      to={to}
    >
      { icon ? <img alt="" className={css.icon} src={icons[icon]} /> : null }
      {children}
    </Link>
  )
}

export default SidebarLink
