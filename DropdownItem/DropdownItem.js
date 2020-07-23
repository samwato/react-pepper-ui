import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './DropdownItem.module.css'

const DropdownItem = ({ children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  return (
    <div className={css.dropdown_item}>
      {children}
    </div>
  )
  
}

export default DropdownItem
