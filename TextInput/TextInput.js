import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './TextInput.module.css'

const TextInput = ({ required, autoComplete, label, placeholder, name, value, fullwidth, handleChange }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color2}`,
    boxShadow: theme.shadow1
  }

  let containerStyles = {}
  if(fullwidth) {
    containerStyles.width = '100%'
  }

  return (
    <div className={css.container} style={containerStyles}>
      { label ? <label className={css.label}>{label}</label> : null }
      <input
        autoComplete={autoComplete ? "username" : "off"}
        placeholder={ placeholder ? placeholder : null }
        style={inputStyles}
        className={css.input}
        type="text"
        name={name}
        value={ value ? value : '' }
        onChange={handleChange}
      />
    </div>

  )
}

export default TextInput
