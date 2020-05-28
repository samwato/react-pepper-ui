import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './SearchInput.module.css'

const SearchInput = ({ required, label, placeholder, name, value, fullwidth, handleChange }) => {
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

  /* icons */
  const searchIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`


  return (
    <div className={css.container} style={containerStyles}>
      { label ? <label className={css.label}>{label}</label> : null }
      <div className={css.inputContainer}>
        <input
          placeholder={ placeholder ? placeholder : null }
          style={inputStyles}
          className={css.input}
          type="text"
          name={name}
          value={ value ? value : '' }
          onChange={handleChange}
        />
        <img
          alt=""
          className={css.icon}
          src={searchIcon}
        />
      </div>

    </div>

  )
}

export default SearchInput
