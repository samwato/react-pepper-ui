import React from 'react'
import css from './FormGroup.module.css'

const FormGroup = ({ children, justifyContent, alignItems }) => {
  let styles = {}
  if (justifyContent !== undefined) {
    styles.justifyContent = justifyContent
  }
  if (alignItems !== undefined) {
    styles.alignItems = alignItems
  }
  return (
    <div style={styles} className={css.group}>
      {children}
    </div>
  )
}

export default FormGroup
