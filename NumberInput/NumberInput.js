import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './NumberInput.module.css'

const NumberInput = ({ required, label, name, value, fullwidth, handleChange }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color2,
    border: `1px solid ${theme.color3}`
  }

  let containerStyles = {}
  if(fullwidth) {
    containerStyles.width = '100%'
  }

  return (
    <div className={css.container} style={containerStyles}>
      { label ? <label className={css.label}>{label}</label> : null }
      <input
        style={inputStyles}
        className={css.input}
        type="number"
        name={name}
        value={ value ? value : '' }
        onChange={handleChange}
      />
    </div>

  )
}

export default NumberInput
