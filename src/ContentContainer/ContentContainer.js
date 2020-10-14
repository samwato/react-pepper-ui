import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { ViewportContext } from '../ViewportContext'
import css from './ContentContainer.module.css'

const ContentContainer = ({ columns, children, maxWidth }) => {
  const { isMobile } = useContext(ViewportContext)
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const width = columns && !isMobile ? Math.floor((columns / 12) * 10000) / 100 : '100'

  const styles = {
    color: theme.textColor,
    backgroundColor: theme.bgColor,
    width: `${width}%`
  }
  if (maxWidth !== undefined) {
    styles.maxWidth = maxWidth
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
