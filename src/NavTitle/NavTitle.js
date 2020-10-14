import React, { useContext } from 'react'
import css from './NavTitle.module.css'
import buildIcons from '../utils/buildIcons'
import { ThemeContext } from '../ThemeContext'

const NavTitle = ({ varient, children, icon }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  let styles = {}
  
  if (varient === 'primary') {
    styles.color = theme.featureDark
  } else if (varient === 'secondary') {
    styles.color = theme.featureLight
  } else if (varient === 'error') {
    styles.color = theme.errorDark
  } else if (varient === 'success') {
    styles.color = theme.successDark
  } else {
    styles.color = theme.textColor
  }
  
  /* icons */
  const icons = buildIcons(theme.iconColor)

  return (
    <div
      className={css.container}
      style={styles}
    >
      { icon ? <img alt="" className={css.icon} src={icons[icon]} /> : null }
      {children}
    </div>
  )
}

export default NavTitle
