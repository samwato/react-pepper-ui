import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Icon.module.css'
import buildIcons from '../utils/buildIcons'

const Icon = ({ varient, icon, size }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  let iconStyles ={}
  let iconColor = theme.textColor
  
  if (varient === 'primary') {
    iconColor = theme.featureDark
  } else if (varient === 'secondary') {
    iconColor = theme.featureLight
  } else if (varient === 'normal') {
    iconColor = theme.color3
  } else if (varient === 'success') {
    iconColor = theme.successDark
  } else if (varient === 'error') {
    iconColor = theme.errorDark
  }
  
  if (size) {
    iconStyles.width = size
  }

  const icons = buildIcons(iconColor)

  return (
    <img alt="" className={css.icon} style={iconStyles} src={icons[icon]} />
  )
}

export default Icon
