import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext'
import css from './Table.module.css'

const Table = ({ title, columns, children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const containerStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color3}`
  }

  const tableStyles = {
    gridTemplateColumns: `repeat(${columns}, auto)`
  }

  return (
    <div style={containerStyles} className={css.container}>
      <h4 className={css.title}>{title}</h4>
      <div style={tableStyles} className={css.table}>
        {children}
      </div>
    </div>
  )
}

export default Table
