import React from 'react'
import css from './Form.module.css'

const Form = ({ children, handleSubmit }) => {
  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}

export default Form
