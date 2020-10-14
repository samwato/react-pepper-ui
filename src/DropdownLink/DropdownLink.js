import React from 'react'
import css from './DropdownLink.module.css'

const DropdownLink = ({ children, name, value, handler }) => {
  
  return (
    <div
      className={css.dropdown_item}
      onClick={() => handler(value)}
    >
      {name}
    </div>
  )
  
}

export default DropdownLink
