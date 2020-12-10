import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './ContentTitle.module.css'

const ContentTitle = ({ children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const styles = {
    color: theme.textColor
  }

  return (
    <h3
      className={css.title}
      style={styles}
    >
      {children}
    </h3>
  )
}

export default ContentTitle
