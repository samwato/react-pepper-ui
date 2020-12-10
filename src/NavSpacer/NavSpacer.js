import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

const NavSpacer = ({ children, alignment, margin }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
  const styles = {
    backgroundColor: theme.color3
  }
  
  if (alignment === 'horizontal') {
    styles.height = '45px'
    styles.width = '1px'
    if (margin !== undefined) {
      styles.marginRight = margin
      styles.marginLeft = margin
    } else {
      styles.marginRight = '20xpx'
      styles.marginLeft = '20xpx'
    }
  }
  
  if (alignment === 'vertical') {
    styles.height = '1px'
    styles.width = '100%'
    if (margin !== undefined) {
      styles.marginTop = margin
      styles.marginBottom = margin
    } else {
      styles.marginTop = '20xpx'
      styles.marginBottom = '20xpx'
    }
  }


  return (
    <div style={styles}></div>
  )
}

export default NavSpacer
