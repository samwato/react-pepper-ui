import React from 'react'

const Spacer = ({ alignment, width, height, fullwidth }) => {
  let styles = {}
  if (alignment === 'horizontal') {
    styles.height = '100%'
    if (width !== undefined) {
      styles.width = width
    } else {
      styles.width = '20px'
    }
  }
  if (alignment === 'vertical') {
    styles.width = '100%'
    if (height !== undefined) {
      styles.height = height
    } else {
      styles.height = '20px'
    }
  }

  return (
    <div style={styles}></div>
  )
}

export default Spacer
