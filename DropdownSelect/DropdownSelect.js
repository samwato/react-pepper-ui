import React, { useContext, useState } from 'react'
import ThemeContext from '../ThemeContext'
import css from './DropdownSelect.module.css'

const DropdownSelect = ({ varient, selected, prefix, options, handler, children }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const [clicked, updateClicked] = useState(false)

  let buttonStyles = {}

  if (varient === 'secondary') {
    buttonStyles.color = theme.featureDark
    buttonStyles.backgroundColor = theme.featureLight
    buttonStyles.border = `1px solid ${theme.featureLight}`
  } else if (varient === 'outline') {
    buttonStyles.color = theme.textColor
    buttonStyles.backgroundColor = theme.color1
    buttonStyles.border = `1px solid ${theme.color3}`
  } else if (varient === 'normal') {
    buttonStyles.color = theme.textColor
    buttonStyles.backgroundColor = theme.color3
    buttonStyles.border = `1px solid ${theme.color3}`
  } else {
    buttonStyles.backgroundColor = theme.featureDark
    buttonStyles.border = `1px solid ${theme.featureDark}`
  }

  let dropdownStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color3}`
  }

  const unClickedIcon = `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="${theme.featureDark}"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-chevron-down"
      >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`

    const clickedIcon = `data:image/svg+xml;utf8,
      <svg xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="${theme.featureDark}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-down"
        >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>`

  return (
    <div className={css.container}>
      <a
        className={css.button}
        style={buttonStyles}
        onClick={() => updateClicked(!clicked)}
      >
        {prefix}{selected}
        <img
          className={css.icon}
          src={clicked ? clickedIcon : unClickedIcon}
        />
      </a>

      {clicked ?
        <div
          style={dropdownStyles}
          className={css.dropdown_container}>
          {options.map((item, i) => (
            <a
              style={ i !== 0 ? { borderTop: `1px solid ${theme.color3}`} : null }
              className={css.dropdown_item}
              key={i}
              onClick={() => {
                handler(item)
                updateClicked(!clicked)
              }}
            >{item}</a>
          ))}
        </div>
       : null }

    </div>

  )
}

export default DropdownSelect
