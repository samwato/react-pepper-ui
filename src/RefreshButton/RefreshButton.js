import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './RefreshButton.module.css'
import buildIcons from '../utils/buildIcons'

const RefreshButton = ({ size, type, handler, name, grouped, children, icon, isLoading }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  let styles = {
    boxShadow: theme.shadow1,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color2}`,
    transition: `all ${theme.transition}`
  }
  let iconStyles = {
    marginRight: '7px',
    transition: `all ${theme.transition}`
  }

  if (isLoading) {
    styles.opacity = '0.5'
    styles.color = theme.iconColor
  } else {
    styles.opacity = '1'
    styles.color = theme.successDark
  }

  if(size === 'sm' || size === 'small') {
    styles.fontSize = '12px'
    styles.padding = '5px 15px'
    iconStyles.height = '15px'
    styles.height = '32px'
  } else {
    styles.fontSize = '14px'
    styles.padding = '10px 20px'
    styles.height = '40px'
  }
  if(grouped === 'left') {
    styles.borderRadius = '10px 0 0 10px'
    styles.borderRight = 'none'
  }
  if(grouped === 'middle') {
    styles.borderRadius = '0'
  }
  if(grouped === 'right') {
    styles.borderRadius = '0 10px 10px 0'
    styles.borderLeft = 'none'
  }
  if(!children) {
    iconStyles.marginRight = '0px'
    styles.padding = '10px'
  }
  


  /* icons */
  const icons = buildIcons(styles.color)

  return (
    <button
      name={name}
      type={type}
      className={css.button}
      style={styles}
      onClick={handler}
    >
      <img
        alt=""
        className={isLoading ? [css.icon,css.is_loading].join(' ') : css.icon}
        style={iconStyles}
        src={icons.refresh}
      />
        
      {children}
      
    </button>
  )
}

export default RefreshButton
