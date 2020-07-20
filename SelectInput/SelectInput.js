import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './SelectInput.module.css'

const SelectInput = ({ required, label, options, name, value, fullwidth, handleChange }) => {
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
      <select
        style={inputStyles}
        className={css.input}
        type="text"
        name={name}
        value={ value ? value : '' }
        onChange={handleChange}
      >
      <option value=""></option>
       {options.map((item, i) => (
         <option key={i} value={item.value}>{item.title}</option>
       ))}
      </select>
    </div>

  )
}

export default SelectInput
