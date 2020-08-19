import React from 'react'
import css from './ContentHeaderItem.module.css'

const ContentHeaderItem = ({ children }) => {
  return (
    <div className={css.header}>
      {children}
    </div>
  )
}

export default ContentHeaderItem
