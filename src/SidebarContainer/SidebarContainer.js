import React from 'react'
import css from './SidebarContainer.module.css'

const SidebarContainer = ({ children }) => {
  return (
    <div className={css.container}>
      {children}
    </div>
  )
}

export default SidebarContainer
