import React from 'react'
import css from './ContentHeader.module.css'

const ContentHeader = ({ children, justifyContent, alignItems, flexWrap }) => {
  
  let styles = {}
  if (justifyContent !== undefined) {
    styles.justifyContent = justifyContent
  }
  if (alignItems !== undefined) {
    styles.alignItems = alignItems
  }
  if (flexWrap !== undefined) {
    styles.flexWrap = flexWrap
  }
  
  return (
    <div style={styles} className={css.header}>
      {children}
    </div>
  )
}

export default ContentHeader
