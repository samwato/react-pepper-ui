import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Button.module.css'

const Button = ({ varient, size, type, handler, name, children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  let styles = {}

  if (varient === 'secondary') {
    styles.color = theme.featureDark
    styles.backgroundColor = theme.featureLight
    styles.border = `1px solid ${theme.featureLight}`
  } else if (varient === 'outline') {
    styles.color = theme.textColor
    styles.backgroundColor = theme.color1
    styles.border = `1px solid ${theme.color3}`
  } else if (varient === 'normal') {
    styles.color = theme.textColor
    styles.backgroundColor = theme.color3
    styles.border = `1px solid ${theme.color3}`
  } else {
    styles.color = 'white'
    styles.backgroundColor = theme.featureDark
    styles.border = `1px solid ${theme.featureDark}`
  }

  if(size === 'sm' || size === 'small') {
    styles.fontSize = '0.85em'
    styles.padding = '7px 17px'
  } else {
    styles.fontSize = '1em'
    styles.padding = '10px 20px'
  }

  return (
    <button
      name={name}
      type={type}
      className={css.button}
      style={styles}
      onClick={handler}
    >
      {children}
    </button>
  )
}

export default Button
