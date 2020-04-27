import React from 'react'

export default ({ type, theme, children }) => {
  return (
    <button
      type={type}
      style={{ color: theme.color, backgroundColor: theme.backgroundColor }}
    >
      {children}
    </button>
  )
}
