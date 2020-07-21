import React, { useRef, useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Dialog.module.css'
import buildIcons from '../utils/buildIcons'


const Dialog = ({ type, size, varient, title, children, maxWidth, icon, handler }) => {
  /* Theme context */
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* user interactions */
  const [clicked, updateClicked] = useState(false)
  const handleClick = (e) => {
    if(dialogRef.current && !dialogRef.current.contains(e.target)) {
      updateClicked(false)
    }
  }
  const dialogRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false)
    return () => {
      document.removeEventListener('mousedown', handleClick, false)
    }
  },[dialogRef])

  /* Styles */
  let buttonStyles = {
    boxShadow: theme.shadow1
  }
  if (varient === 'secondary') {
    buttonStyles.color = theme.featureDark
    buttonStyles.backgroundColor = theme.featureLight
    buttonStyles.border = `1px solid ${theme.featureLight}`
  } else if (varient === 'outline') {
    buttonStyles.color = theme.textColor
    buttonStyles.backgroundColor = theme.color1
    buttonStyles.border = `1px solid ${theme.color2}`
  } else if (varient === 'normal') {
    buttonStyles.color = theme.textColor
    buttonStyles.backgroundColor = theme.color3
    buttonStyles.border = `1px solid ${theme.color3}`
  } else if (varient === 'error') {
    buttonStyles.color = theme.errorDark
    buttonStyles.backgroundColor = theme.errorLight
    buttonStyles.border = `1px solid ${theme.errorDark}`
  } else {
    buttonStyles.backgroundColor = theme.featureDark
    buttonStyles.border = `1px solid ${theme.featureDark}`
  }
  let dialogStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color3}`,
  }
  if (maxWidth !== undefined) {
    dialogStyles.maxWidth = maxWidth
  }
  let iconStyles = {}
  if (title === undefined) {
    iconStyles.marginRight = 0
  }
  
  if(size === 'sm' || size === 'small') {
    buttonStyles.fontSize = '0.85em'
    buttonStyles.padding = '0px 17px'
  } else {
    buttonStyles.fontSize = '1em'
    buttonStyles.padding = '0px 20px'
  }

  
  /* icons */
  const icons = buildIcons(buttonStyles.color)


  return (
    <div className={css.container}>
      <div
        className={css.button}
        style={buttonStyles}
        onClick={() => {
          updateClicked(!clicked)
          if (handler !== undefined) {
            handler()
          }
        }}
      >
      { icon ? <img alt="" className={css.icon} style={iconStyles} src={icons[icon]} /> : null }
      {title}
    </div>

      {clicked ?
        <div className={css.dialog_container}>
          <div
            ref={dialogRef}
            style={dialogStyles}
            className={css.dialog_item}
          >
            <div className={css.dialog_content}>
              <button
                className={css.dialog_close}
                onClick={() => {
                  updateClicked(!clicked)
                }}>
                X
              </button>
                
              {children}
            </div>
            
          </div>
        </div>
       : null }

    </div>

  )
}

export default Dialog
