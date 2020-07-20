import React from 'react'
import css from './FormGroup.module.css'

const FormGroup = ({ children, justifyContent }) => {
  let styles = {}
  if (justifyContent !== undefined) {
    styles.justifyContent = justifyContent
  }
  return (
    <div style={styles} className={css.group}>
      {children}
    </div>
  )
}

export default FormGroup
