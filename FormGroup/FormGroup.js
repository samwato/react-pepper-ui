import React from 'react'
import css from './FormGroup.module.css'

const FormGroup = ({ children }) => {
  return (
    <div className={css.group}>
      {children}
    </div>
  )
}

export default FormGroup
