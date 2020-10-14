import React from 'react'
import css from './NavContainer.module.css'

const NavContainer = ({ children, fullwidth }) => {
  let styles = {}
  if (fullwidth) {
    styles.width = '100%'
  }
  return (
    <div style={styles} className={css.container}>
      {children}
    </div>
  )
}

export default NavContainer
