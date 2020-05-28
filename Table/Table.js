import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Table.module.css'

const Table = ({ title, columns, children, active, fullwidth }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const containerStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color3}`,
    opacity: active ? '1' : '0.5'
  }

  const tableStyles = {
    gridTemplateColumns: `repeat(${columns}, auto)`
  }

  if(fullwidth) {
    containerStyles.width = '100%'
    containerStyles.borderRadius = '0px'
  }

  return (
    <div style={containerStyles} className={css.container}>
      { title ? <h4 className={css.title}>{title}</h4> : null }
      <div style={tableStyles} className={css.table}>
        {children}
      </div>
    </div>
  )

}

export default Table
