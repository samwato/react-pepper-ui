import React from 'react'
import css from './NavContainer.module.css'

const NavContainer = ({ children }) => {
  return (
    <div className={css.container}>
      {children}
    </div>
  )
}

export default NavContainer
