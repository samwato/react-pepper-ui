import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './DropdownLink.module.css'

const DropdownLink = ({ children, name, value, handler }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  return (
    <div
      className={css.dropdown_item}
      onClick={() => handler(value)}
    >
      {name}
    </div>
  )
  
}

export default DropdownLink
