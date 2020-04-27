import React from 'react'

export default ({ name, value, onChange }) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}
