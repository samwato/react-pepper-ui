import React, { useRef, useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Dialog.module.css'

const Dialog = ({ type, varient, title, children }) => {
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
  },[dialogRef])

  /* Styles */
  let buttonStyles = {}
  if (varient === 'secondary') {
    buttonStyles.color = theme.featureDark
    buttonStyles.backgroundColor = theme.featureLight
    buttonStyles.border = `1px solid ${theme.featureLight}`
  } else if (varient === 'outline') {
    buttonStyles.color = theme.textColor
    buttonStyles.backgroundColor = theme.color1
    buttonStyles.border = `1px solid ${theme.color3}`
  } else if (varient === 'normal') {
    buttonStyles.color = theme.textColor
    buttonStyles.backgroundColor = theme.color3
    buttonStyles.border = `1px solid ${theme.color3}`
  } else {
    buttonStyles.backgroundColor = theme.featureDark
    buttonStyles.border = `1px solid ${theme.featureDark}`
  }
  let dialogStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color3}`
  }

  /* icons */
  const icons = {
    info: `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="${theme.iconColor}"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>`
  }

  return (
    <div className={css.container}>
      <div
        className={css.button}
        style={buttonStyles}
        onClick={() => updateClicked(!clicked)}
      >
      <img alt="" className={css.icon} src={icons[type]} />
        {title}
      </div>

      {clicked ?
        <div className={css.dialog_container}>
          <div
            ref={dialogRef}
            style={dialogStyles}
            className={css.dialog_item}
          >
            {children}
          </div>
        </div>
       : null }

    </div>

  )
}

export default Dialog
