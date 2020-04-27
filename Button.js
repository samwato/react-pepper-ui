import React from 'react'

export default ({ type, theme, children }) => {
  const styles ={
    color: theme.color,
    backgroundColor: theme.backgroundColor
  }
  return (
    <button
      type={type}
      style={styles}
    >
      {children}
    </button>
  )
}
