import React from 'react'
import css from './ButtonGroup.module.css'

const ButtonGroup = ({ children }) => {
  return (
    <div className={css.group}>
      {children}
    </div>
  )
}

export default ButtonGroup
