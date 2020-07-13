import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Message.module.css'

const Message = ({ type, children, fullwidth }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  let styles = {}

  if(type === 'success') styles = { backgroundColor: theme.successLight, color: theme.textColor, border: `1px solid ${theme.successDark}`}
  if(type === 'error') styles = { backgroundColor: theme.errorLight, color: theme.textColor, border: `1px solid ${theme.errorDark}`}
  
  if(fullwidth) {
    styles.width = '100%'
  }

  return (
    <div
      style={styles}
      className={css.message}>
      {children}
    </div>
  )
}

export default Message
