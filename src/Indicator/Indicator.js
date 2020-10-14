import React, { useContext } from 'react'
import css from './Indicator.module.css'
import buildIcons from '../utils/buildIcons'
import { ThemeContext } from '../ThemeContext'

const Indicator = ({ varient, children, icon }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  let styles = {
    color: theme.textColor
  }
  let iconColor = theme.iconColor
  
  if (varient === 'secondary') {
    styles.color = theme.featureLight
    iconColor = theme.featureLight
  } else if (varient === 'success') {
    styles.color = theme.successDark
    iconColor = theme.successDark
  } else if (varient === 'error') {
    styles.color = theme.errorDark
    iconColor = theme.errorDark
  }
  
  
  /* icons */
  const icons = buildIcons(iconColor)

  return (
    <div
      className={css.item}
      style={styles}
    >
      { icon ? <img alt="" className={css.icon} src={icons[icon]} /> : null }
      {children}
    </div>
  )
}

export default Indicator
