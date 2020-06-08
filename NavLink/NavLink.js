import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './NavLink.module.css'

/* Link from react router */
import { Link, useRouteMatch } from 'react-router-dom'

const NavLink = ({ to, exact, children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const match = useRouteMatch({
    path: to,
    exact: exact
  })

  let styles = {
    color: theme.textColor,
    border: `1px solid ${theme.color2}`,
    boxShadow: theme.shadow1
  }

  if (match) {
    styles.backgroundColor = theme.featureDark
    styles.border = `1px solid ${theme.featureDark}`
    styles.color = 'rgb(255,255,255)'
  } else {
    styles.backgroundColor = theme.color1
  }

  return (
    <Link
      className={css.navlink}
      style={styles}
      to={to}
    >
      {children}
    </Link>
  )
}

export default NavLink
