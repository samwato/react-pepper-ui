import React, { useContext, useState, useEffect, useRef } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Dropdown.module.css'
import buildIcons from '../utils/buildIcons'

const Dropdown = ({ varient, title, children, minWidth, grouped, prefix, icon }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
    
  /* user interactions */
  const [clicked, updateClicked] = useState(false)
  const handleClick = (e) => {
    if(linkRef.current && !linkRef.current.contains(e.target)) {
      updateClicked(false)
    }
  }
  const linkRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false)
    return () => {
      document.removeEventListener('mousedown', handleClick, false)
    }
  },[linkRef])

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
  } else {
    buttonStyles.backgroundColor = theme.featureDark
    buttonStyles.border = `1px solid ${theme.featureDark}`
    buttonStyles.color = 'white'
  }
  
  let dropdownPointerStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    borderTop: `1px solid ${theme.color3}`,
    borderLeft: `1px solid ${theme.color3}`
  }

  let dropdownStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color3}`,
    borderRadius: theme.borderRadius
  }
  if (minWidth !== undefined) {
    dropdownStyles.minWidth = minWidth
  }
  
  if(grouped === 'left') {
    buttonStyles.borderRadius = `${theme.borderRadius} 0 0 ${theme.borderRadius}`
    buttonStyles.borderRight = 'none'
  }
  if(grouped === 'middle') {
    buttonStyles.borderRadius = '0'
  }
  if(grouped === 'right') {
    buttonStyles.borderRadius = `0 ${theme.borderRadius} ${theme.borderRadius} 0`
    buttonStyles.borderLeft = 'none'
  }
  
  /* icons */
  const icons = buildIcons(buttonStyles.color)

  return (
    <div ref={linkRef} className={css.container}>
      <div
        className={css.button}
        style={buttonStyles}
        onClick={() => updateClicked(!clicked)}
      >
        { icon ? <img alt="" className={css.icon} src={icons[icon]} /> : null }
        <span style={{fontWeight: '400'}}>{prefix}</span>
        <span>{title}</span>
        <img
          alt=""
          className={css.arrow_icon}
          src={clicked ? icons['chevron-up'] : icons['chevron-down']}
        />
      </div>

      {clicked ?
        <div
          style={dropdownStyles}
          className={css.dropdown_container}
          onClick={() => updateClicked(!clicked)}
        >
          <div style={dropdownPointerStyles} className={css.dropdown_pointer}></div>
          {children}

        </div>
       : null }

    </div>

  )
}

export default Dropdown
