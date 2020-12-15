import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Table.module.css'

const Table = ({ title, columns, children, active, fullwidth }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const containerStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    boxShadow: theme.shadow1,
    opacity: active ? '1' : '0.5',
    borderRadius: theme.borderRadius,
  }

  const tableStyles = {
    gridTemplateColumns: `repeat(${columns}, auto)`
  }

  if(fullwidth) {
    containerStyles.width = '100%'
    containerStyles.borderRadius = '0px'
  }
  
  const tableTitleStyles = {
    backgroundColor: theme.color1
  }

  return (
    <div style={containerStyles} className={css.container}>
      { title ?
        <div style={tableTitleStyles} className={css.table_title}>
          <h4 className={css.title}>{title}</h4>
        </div>
       : null }
      
      <div style={tableStyles} className={css.table}>
        {children}
      </div>
    </div>
  )

}

export default Table
