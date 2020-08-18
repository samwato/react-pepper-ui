import React, { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './MonthPicker.module.css'
import buildIcons from '../utils/buildIcons'
import buildMonths from './buildMonths'

const MonthPicker = ({ label, name, handlerChange, fullwidth, cleared, defaultValue, hideIcon, grouped }) => {
  /* theme context */
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* states */
  const [selectedMonth, setSelectedMonth] = useState()
  const [popUp, setPopUp] = useState(false)

  /* handler functions */
  const handlePopUp = (e) => {
    if(monthsRef.current && !monthsRef.current.contains(e.target)) {
      setPopUp(false)
    }
  }
  const monthsRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handlePopUp, false)
    return () => {
      document.removeEventListener('mousedown', handlePopUp, false)
    }
  },[monthsRef])


  const handleMonthSelected = (e) => {
    e.preventDefault()
    const month = e.target.getAttribute('month')
    setPopUp(false)
    setSelectedMonth(month)
  }


  /* use effects - submit data to parent form when selectedDate state changes */
  useEffect(() => {
    if(selectedMonth) {
      handlerChange(name, selectedMonth)
    }
  }, [name, selectedMonth, handlerChange])

  useEffect(() => {
    if(cleared) setSelectedMonth()
  },[cleared])

  /* if there is a default value set the component selected Month to that */
  useEffect(() => {
    if(defaultValue) setSelectedMonth(defaultValue)
  },[defaultValue])
  
  
  /* custom styles */
  const icons = buildIcons(theme.iconColor)

  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    boxShadow: theme.shadow1,
    borderRadius: theme.borderRadius
  }
  const monthPickerContainerStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color2}`
  }
  let containerStyles = {}
  if(fullwidth) {
    containerStyles.width = '100%'
  } else {
    containerStyles.margin = '0 10px'
  }

  if(grouped) {
    containerStyles.height = '100%'
    containerStyles.margin = '0'
    inputStyles.borderRight = `1px solid ${theme.color2}`
    inputStyles.borderLeft = `1px solid ${theme.color2}`
    inputStyles.borderTop = `1px solid ${theme.color2}`
    inputStyles.borderBottom = `1px solid ${theme.color2}`
  }
  if(grouped === 'left') {
    inputStyles.borderRadius = `${theme.borderRadius} 0 0 ${theme.borderRadius}`
    inputStyles.borderRight = 'none'
    inputStyles.borderLeft = `1px solid ${theme.color2}`
    inputStyles.borderTop = `1px solid ${theme.color2}`
    inputStyles.borderBottom = `1px solid ${theme.color2}`
  }
  if(grouped === 'middle') {
    inputStyles.borderRadius = '0'
  }
  if(grouped === 'right') {
    inputStyles.borderRadius = `0 ${theme.borderRadius} ${theme.borderRadius} 0`
    inputStyles.borderRight = `1px solid ${theme.color2}`
    inputStyles.borderLeft = 'none'
    inputStyles.borderTop = `1px solid ${theme.color2}`
    inputStyles.borderBottom = `1px solid ${theme.color2}`
  }
  const buttonStyles = {
    color: theme.textColor
  }

  /* build */
  const monthArray = buildMonths()
  const months = monthArray.map((month, i) => {
    return (
      <button
        key={i}
        month={month}
        style={buttonStyles}
        className={css.months_item}
        onClick={handleMonthSelected}>
        {month}
      </button>)
  })

  const monthString = selectedMonth ? selectedMonth : null

  

  return (
    <div ref={monthsRef} style={containerStyles} className={css.container}>

      {/* label */}
      { label ? <div className={css.label}><label>{label}</label></div> : null }

      {/* input */}
      <div style={inputStyles} className={css.input} onClick={() => setPopUp(!popUp)}>
        { hideIcon ? null : <img alt="" className={css.icon} src={icons.calendar} /> }
        <span>{monthString}</span>
      </div>

      {/* times */}
      {popUp ?
        <div style={monthPickerContainerStyles} className={css.month_picker_container}>
          <div className={css.months_container}>
            {months}
          </div>
        </div>
      : null }

    </div>
  )

}

export default MonthPicker
