import React, { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './YearPicker.module.css'
import moment from 'moment'

import buildYears from './buildYears'

const YearPicker = ({ label, name, handlerChange, fullwidth, cleared, defaultValue, hideIcon, displayCount, grouped }) => {
  /* theme context */
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* states */
  const [windowYear, setWindowYear] = useState()
  const [selectedYear, setSelectedYear] = useState()
  const [popUp, setPopUp] = useState(false)

  let count
  if(displayCount) {
    count = displayCount
  } else {
    count = 5
  }


  /* handler functions */
  const handlePopUp = (e) => {
    if(yearsRef.current && !yearsRef.current.contains(e.target)) {
      setPopUp(false)
    }
  }
  const yearsRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handlePopUp, false)
    return () => {
      document.removeEventListener('mousedown', handlePopUp, false)
    }
  },[yearsRef])


  const handleYearSelected = (e) => {
    const year = e.target.getAttribute('year')
    setPopUp(false)
    setSelectedYear(year)
  }

  const handleYearChange = (e) => {
    const { name } = e.target
    if (name === 'previous') setWindowYear(moment().year(windowYear).subtract(count,'years').format('YYYY'))
    if (name === 'next') setWindowYear(moment().year(windowYear).add(count,'years').format('YYYY'))
  }
  const handleChangeUpComponent = (name, selectedDate) => {
    handlerChange(name, selectedDate)
  }

  /* use effects - submit data to parent form when selectedDate state changes */
  useEffect(() => {
    if(selectedYear) {
      handleChangeUpComponent(name, selectedYear)
    }
  }, [selectedYear, name])

  useEffect(() => {
    if(cleared) setSelectedYear()
  },[cleared])

  /* if there is a default value set the component selected Month to that */
  useEffect(() => {
    if(defaultValue) {
      setSelectedYear(defaultValue)
      setWindowYear(defaultValue)
    } else {
      setWindowYear(moment())
    }
  },[])


  const yearArray = buildYears(windowYear, count)
  const years = yearArray.map((year, i) => {
    return (
      <a
        key={i}
        year={year}
        className={css.years_item}
        onClick={handleYearSelected}>
        {year}
      </a>)
  })

  const yearString = selectedYear ? selectedYear : null

  /* custom styles */
  const calendarIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
  const arrowLeftIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>`
  const arrowRightIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>`

  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color2}`,
    boxShadow: theme.shadow1
  }
  const yearPickerContainerStyles = {
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
    <div ref={yearsRef} style={containerStyles} className={css.container}>

      {/* label */}
      { label ? <div className={css.label}><label>{label}</label></div> : null }

      {/* input */}
      <div style={inputStyles} className={css.input} onClick={() => setPopUp(!popUp)}>
        { hideIcon ? null : <img alt="" className={css.icon} src={calendarIcon} /> }
        <span>{yearString}</span>
      </div>

      {/* times */}
      {popUp ?
        <div style={yearPickerContainerStyles} className={css.year_picker_container}>


          <div className={css.arrow_container}>
            <div className={css.arrow_box}>
              <a className={css.arrow_link} name="previous" onClick={handleYearChange}></a>
              <img alt="" src={arrowLeftIcon}></img>
            </div>
            <div className={css.arrow_box}>
              <a className={css.arrow_link} name="next" onClick={handleYearChange}></a>
              <img alt="" src={arrowRightIcon}></img>
            </div>
          </div>


          <div className={css.years_container}>
            {years}
          </div>

        </div>
      : null }

    </div>
  )

}

export default YearPicker
