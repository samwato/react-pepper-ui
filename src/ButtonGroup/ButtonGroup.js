import React from 'react'
import css from './ButtonGroup.module.css'

const ButtonGroup = ({ children, justifyContent, alignItems }) => {
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

export default ButtonGroup
