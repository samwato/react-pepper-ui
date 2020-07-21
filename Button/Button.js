import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Button.module.css'
import buildIcons from '../utils/buildIcons'

const Button = ({ varient, size, type, handler, name, fullwidth, grouped, children, icon }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  let styles = {
    boxShadow: theme.shadow1
  }
  let iconStyles = {
    marginRight: '7px'
  }

  if (varient === 'secondary') {
    styles.color = theme.featureDark
    styles.backgroundColor = theme.featureLight
    styles.border = `1px solid ${theme.featureLight}`
  } else if (varient === 'outline') {
    styles.color = theme.textColor
    styles.backgroundColor = theme.color1
    styles.border = `1px solid ${theme.color2}`
  } else if (varient === 'normal') {
    styles.color = theme.textColor
    styles.backgroundColor = theme.color3
    styles.border = `1px solid ${theme.color3}`
  } else if (varient === 'success') {
    styles.color = theme.successDark
    styles.backgroundColor = theme.successLight
    styles.border = `1px solid ${theme.successDark}`
  } else if (varient === 'error') {
    styles.color = theme.errorDark
    styles.backgroundColor = theme.errorLight
    styles.border = `1px solid ${theme.errorDark}`
  } else {
    styles.color = 'white'
    styles.backgroundColor = theme.featureDark
    styles.border = `1px solid ${theme.featureDark}`
  }

  if(size === 'sm' || size === 'small') {
    styles.fontSize = '0.85em'
    styles.padding = '7px 17px'
    iconStyles.height = '18px'
  } else {
    styles.fontSize = '1em'
    styles.padding = '10px 20px'
  }

  if(grouped) {
    styles.height = '100%'
    styles.margin = '0'
  }
  if(grouped === 'left') {
    styles.borderRadius = '10px 0 0 10px'
    styles.borderRight = 'none'
  }
  if(grouped === 'middle') {
    styles.borderRadius = '0'
  }
  if(grouped === 'right') {
    styles.borderRadius = '0 10px 10px 0'
    styles.borderLeft = 'none'
  }

  if(!children) {
    iconStyles.marginRight = '0px'
    styles.padding = '10px'
  }


  /* icons */
  const icons = buildIcons(styles.color)

  return (
    <button
      name={name}
      type={type}
      className={css.button}
      style={styles}
      onClick={handler}
    >
      { icon ? <img alt="" className={css.icon} style={iconStyles} src={icons[icon]} /> : null }
      {children}
    </button>
  )
}

export default Button
