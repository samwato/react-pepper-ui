import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext'
import css from './NavSpacer.module.css'

const NavSpacer = ({ children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const styles = {
    backgroundColor: theme.color3
  }

  return (
    <div
      className={css.spacer}
      style={styles}
    >
    </div>
  )
}

export default NavSpacer
