import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './NumberInput.module.css'

const NumberInput = ({ required, label, prefix, name, value, fullwidth, handleChange }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color2}`,
    boxShadow: theme.shadow1,
    borderRadius: theme.borderRadius
  }

  let containerStyles = {}
  if(fullwidth) {
    containerStyles.width = '100%'
  }

  return (
    <div className={css.container} style={containerStyles}>
      { label ? <label className={css.label}>{label}</label> : null }
      <div className={css.input_container}>
        { prefix ? <div className={css.prefix}>{prefix}</div> : null }
        <input
          style={inputStyles}
          className={css.input}
          type="number"
          name={name}
          value={ value ? value : '' }
          onChange={handleChange}
        />
      </div>
      
    </div>

  )
}

export default NumberInput
