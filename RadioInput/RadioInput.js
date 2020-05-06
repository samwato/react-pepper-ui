import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './RadioInput.module.css'

const RadioInput = ({ required, fullwidth, checked, label, name, options, handleChange }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* reformatting trick with custom radio */
  const handleClick = (name, value) => {
    const e = { target: { name: name, value: value } }
    handleChange(e)
  }

  const checkedIcon = `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="${theme.featureDark}" stroke-width="3" stroke-linecap="round"
    stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline></svg>
  `

  let containerStyles = {}
  if(fullwidth) {
    containerStyles.width = '100%'
  }

  return (
    <div style={containerStyles} className={css.container}>
      { label ? <label className={css.label}>{label}</label> : null }

      {options.map((option, i) => {
        const isChecked = option.value === checked ? true : false

        return (
          <div
            className={css.radio}
            key={i}
            onClick={ () => handleClick(name, option.value) }
          >
            <input
              className={css.input}
              type="radio"
              name={name}
              value={option.value}
              onChange={() => null}
              checked={isChecked}
            />
          <div
              style={{ border: `1px solid ${theme.color3}`, backgroundColor: theme.color2 }}
              className={css.checkmark}
            >
              { isChecked ? <img alt="" src={checkedIcon} height="22" /> : null }
            </div>
            <span className={css.title}>{option.title}</span>
          </div>
        )
      })}

    </div>

  )
}

export default RadioInput
