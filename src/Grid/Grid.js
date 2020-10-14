import React, { useContext } from 'react'
import css from './Grid.module.css'
import { ViewportContext } from '../ViewportContext'

const Grid = ({ children }) => {
  
  const { isMobile } = useContext(ViewportContext)
  
  let styles = {}
  
  if (isMobile) {
    styles.gridTemplateColumns = '0px auto'
  } else {
    styles.gridTemplateColumns = '240px auto'
  }
  
  return (
    <div
      style={styles}
      className={css.grid}>
      {children}
    </div>
  )
}

export default Grid
