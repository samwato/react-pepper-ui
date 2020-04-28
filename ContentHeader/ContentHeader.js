import React from 'react'
import css from './ContentHeader.module.css'

const ContentHeader = ({ children }) => {
  return (
    <div className={css.header}>
      {children}
    </div>
  )
}

export default ContentHeader
