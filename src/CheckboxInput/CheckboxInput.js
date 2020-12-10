import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './CheckboxInput.module.css'
import buildIcons from '../utils/buildIcons'

const CheckboxInput = ({ required, fullwidth, label, options, handleChange, gridColumns }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark
  
      
  /* reformatting trick with custom radio */
  const handleClick = (name) => {
    handleChange(name)
  }

  
  const icons = buildIcons(theme.featureDark)

  let containerStyles = {}
  if(fullwidth) {
    containerStyles.width = '100%'
  }
  if (gridColumns) {
    containerStyles.gridTemplateColumns = gridColumns
  }

  return (
    <div style={containerStyles} className={css.container}>
      { label ? <label className={css.label}>{label}</label> : null }

      {options.map((option, i) => {
        return (
          <div
            className={css.radio}
            key={i}
            onClick={ () => handleClick(option.name) }
          >
            <input
              className={css.input}
              type="radio"
              name={option.name}
              value={option.value}
              onChange={() => null}
              checked={option.value}
            />
            <div
              style={{
                border: `1px solid ${theme.color2}`,
                backgroundColor: theme.color1,
                boxShadow: theme.shadow1
              }}
              className={css.checkmark}
            >
              { option.value ? <img alt="" src={icons.check} className={css.icon}/> : null }
            </div>
            <span className={css.title}>{option.title}</span>
          </div>
        )
      })}

    </div>

  )
}

export default CheckboxInput
