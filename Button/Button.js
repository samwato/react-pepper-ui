import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './Button.module.css'

const Button = ({ varient, size, type, handler, name, fullwidth, grouped, children, icon }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  let styles = {
    boxShadow: theme.shadow1
  }
  let iconStyles = {
    marginRight: '7px'
  }

  if (varient === 'secondary') {
    styles.color = theme.featureDark
    styles.backgroundColor = theme.featureLight
    styles.border = `1px solid ${theme.featureLight}`
  } else if (varient === 'outline') {
    styles.color = theme.textColor
    styles.backgroundColor = theme.color1
    styles.border = `1px solid ${theme.color2}`
  } else if (varient === 'normal') {
    styles.color = theme.textColor
    styles.backgroundColor = theme.color3
    styles.border = `1px solid ${theme.color3}`
  } else {
    styles.color = 'white'
    styles.backgroundColor = theme.featureDark
    styles.border = `1px solid ${theme.featureDark}`
  }

  if(size === 'sm' || size === 'small') {
    styles.fontSize = '0.85em'
    styles.padding = '7px 17px'
    iconStyles.height = '18px'
  } else {
    styles.fontSize = '1em'
    styles.padding = '10px 20px'
  }

  if(grouped) {
    styles.height = '100%'
    styles.margin = '0'
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
  const icons = {
    theme: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${styles.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    filter: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${styles.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
    download: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${styles.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`
  }

  return (
    <button
      name={name}
      type={type}
      className={css.button}
      style={styles}
      onClick={handler}
    >
      { icon ? <img alt="" className={css.icon} style={iconStyles} src={icons[icon]} /> : null }
      {children}
    </button>
  )
}

export default Button
