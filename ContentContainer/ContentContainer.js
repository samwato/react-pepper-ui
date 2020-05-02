import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './ContentContainer.module.css'

const ContentContainer = ({ columns, children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const width = columns ? Math.floor((columns / 12) * 10000) / 100 : '100'

  const styles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    width: `${width}%`
  }

  return (
    <div
      className={css.container}
      style={styles}
    >
      {children}
    </div>
  )
}

export default ContentContainer
