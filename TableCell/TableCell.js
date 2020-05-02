import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './TableCell.module.css'

const TableCell = ({ children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const containerStyles = {
    color: theme.textColor,
    borderTop: `1px solid ${theme.color3}`
  }

  return (
    <div style={containerStyles} className={css.container}>
      {children}
    </div>
  )
}

export default TableCell