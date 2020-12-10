import React from 'react'
import css from './DropdownItem.module.css'

const DropdownItem = ({ children }) => {
  
  return (
    <div className={css.dropdown_item}>
      {children}
    </div>
  )
  
}

export default DropdownItem
