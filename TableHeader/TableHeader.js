import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext'
import css from './TableHeader.module.css'

const TableHeader = ({ children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const containerStyles = {
    color: theme.textColor,
    backgroundColor: theme.color2,
    borderTop: `1px solid ${theme.color3}`
  }

  return (
    <div style={containerStyles} className={css.container}>
      {children}
    </div>
  )
}

export default TableHeader
