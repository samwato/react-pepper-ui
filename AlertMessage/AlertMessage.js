import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './AlertMessage.module.css'
import buildIcons from '../utils/buildIcons'

const AlertMessage = ({ type, children, fullwidth, closeHandler, active }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  // active handles the state
  // closeHandler clears the parent state of the whether message exists

  /* styles */
  let styles = {
    borderRadius: theme.borderRadius
  }
  let iconColor = 'white'
  let icon

  if(type === 'success') {
    icon = 'check-circle'
    styles.backgroundColor = theme.successDark
  }
  
  if(type === 'error') {
    icon = 'info'
    styles.backgroundColor = theme.errorDark
  }
  
  if(fullwidth) {
    styles.width = '100%'
  }
  
  const icons = buildIcons(iconColor)
  
  return (
    <div style={styles} className={css.message_container}>
    
      <div className={css.message_icon_container}>
        <img alt="" className={css.message_icon} src={icons[icon]} />
      </div>
      
      <div className={css.message_content}>
        {children}
      </div>
      
      <div className={css.message_close_container}>
        <button
          className={css.message_close_button}
          onClick={closeHandler}>
          <img alt="" className={css.close_icon} src={icons['x']} />
        </button>
      </div>
    
    </div>
  )
}

export default AlertMessage
