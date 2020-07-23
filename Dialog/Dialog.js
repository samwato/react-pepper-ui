import React, { useRef, useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Dialog.module.css'
import buildIcons from '../utils/buildIcons'


const Dialog = ({ size, varient, buttonText, headerText, children, maxWidth, icon, handler, dialogOverride, grouped }) => {
  /* Theme context */
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* user interactions */
  const [clicked, updateClicked] = useState(false)
  const handleClick = (e) => {
    if(dialogRef.current && !dialogRef.current.contains(e.target)) {
      // !!!! THIS DOES NOT WORK WITH A MESSAGE ALERT OUTSIDE OF THIS ELEMENT
      // COMMENTING OUT FOR NOW
      // updateClicked(false)
    }
  }
  const dialogRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false)
    return () => {
      document.removeEventListener('mousedown', handleClick, false)
    }
  },[dialogRef])
  
  // pass in bool to trigger a switch in clicked
  useEffect(() => {
    if (dialogOverride !== undefined && dialogOverride !== null) {
      updateClicked(!clicked)
    }
  }, [dialogOverride])

  /* Styles */
  let buttonStyles = {
    boxShadow: theme.shadow1,
    borderRadius: theme.borderRadius
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
    buttonStyles.color = 'white'
    buttonStyles.backgroundColor = theme.featureDark
    buttonStyles.border = `1px solid ${theme.featureDark}`
  }
  
  let dialogStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color3}`,
    borderRadius: theme.borderRadius
  }
  if (maxWidth !== undefined) {
    dialogStyles.maxWidth = maxWidth
  }
  let iconStyles = {}
  if (buttonText === undefined) {
    iconStyles.marginRight = 0
  }
  
  if(size === 'sm' || size === 'small') {
    buttonStyles.fontSize = '12px'
    buttonStyles.padding = '5px 15px'
    iconStyles.height = '15px'
    buttonStyles.height = '32px'
  } else {
    buttonStyles.fontSize = '14px'
    buttonStyles.padding = '10px 20px'
    buttonStyles.height = '40px'
  }
  
  const dialogHeaderStyles = {
    backgroundColor: theme.color2,
    borderBottom: `1px solid ${theme.color3}`
  }
  
  if (grouped === 'left') {
    buttonStyles.marginRight = '10px'
  }
  if (grouped === 'right') {
    buttonStyles.marginLeft = '10px'
  }
  if (grouped === 'middle') {
    buttonStyles.marginRight = '10px'
    buttonStyles.marginLeft = '10px'
  }

  
  /* icons */
  const icons = buildIcons(theme.textColor)


  return (
    <div className={css.container}>
      <button
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
        {buttonText}
      </button>

      {clicked ?
        <div className={css.dialog_container}>
          <div
            ref={dialogRef}
            style={dialogStyles}
            className={css.dialog_item}
          >
            <div style={dialogHeaderStyles} className={css.dialog_header}>
              <h4>{headerText}</h4>
              <button
                className={css.dialog_close}
                onClick={() => {
                  updateClicked(!clicked)
                }}>
                <img alt="" className={css.close_icon} src={icons['x']} />
              </button>
            </div>
            <div className={css.dialog_content}>
              
                
              {children}
            </div>
            
          </div>
        </div>
       : null }

    </div>

  )
}

export default Dialog
