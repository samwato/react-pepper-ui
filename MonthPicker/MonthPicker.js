import React, { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './MonthPicker.module.css'

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
    const month = e.target.getAttribute('month')
    setPopUp(false)
    setSelectedMonth(month)
  }

  /* use effects - submit data to parent form when selectedDate state changes */
  useEffect(() => {
    if(selectedMonth) {
      handlerChange(name, selectedMonth)
    }
  }, [selectedMonth, handlerChange, name])

  useEffect(() => {
    if(cleared) setSelectedMonth()
  },[cleared])

  /* if there is a default value set the component selected Month to that */
  useEffect(() => {
    if(defaultValue) setSelectedMonth(defaultValue)
  },[defaultValue])


  const monthArray = buildMonths()
  const months = monthArray.map((month, i) => {
    return (
      <a
        key={i}
        month={month}
        className={css.months_item}
        onClick={handleMonthSelected}>
        {month}
      </a>)
  })

  const monthString = selectedMonth ? selectedMonth : null

  /* custom styles */
  const calendarIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
  // const clockIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color2}`,
    boxShadow: theme.shadow1
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
  }
  if(grouped === 'left') {
    inputStyles.borderRadius = '10px 0 0 10px'
    inputStyles.borderRight = 'none'
  }
  if(grouped === 'middle') {
    inputStyles.borderRadius = '0'
  }
  if(grouped === 'right') {
    inputStyles.borderRadius = '0 10px 10px 0'
    inputStyles.borderLeft = 'none'
  }

  return (
    <div ref={monthsRef} style={containerStyles} className={css.container}>

      {/* label */}
      { label ? <div className={css.label}><label>{label}</label></div> : null }

      {/* input */}
      <div style={inputStyles} className={css.input} onClick={() => setPopUp(!popUp)}>
        { hideIcon ? null : <img alt="" className={css.icon} src={calendarIcon} /> }
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
