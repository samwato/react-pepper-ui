import React, { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './YearPicker.module.css'
import moment from 'moment'
import buildIcons from '../utils/buildIcons'
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

  /* use effects - submit data to parent form when selectedDate state changes */
  /* handlerChange must be a useCallback */
  useEffect(() => {
    if(selectedYear) {
      handlerChange(name, selectedYear)
    }
  }, [name, selectedYear, handlerChange])

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
  },[defaultValue])
  
  
  /* custom styles */
  const icons = buildIcons(theme.iconColor)

  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    boxShadow: theme.shadow1,
    borderRadius: theme.borderRadius
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
    inputStyles.borderRight = `1px solid ${theme.color2}`
    inputStyles.borderLeft = `1px solid ${theme.color2}`
    inputStyles.borderTop = `1px solid ${theme.color2}`
    inputStyles.borderBottom = `1px solid ${theme.color2}`
  }
  if(grouped === 'left') {
    inputStyles.borderRadius = '10px 0 0 10px'
    inputStyles.borderRight = 'none'
    inputStyles.borderLeft = `1px solid ${theme.color2}`
    inputStyles.borderTop = `1px solid ${theme.color2}`
    inputStyles.borderBottom = `1px solid ${theme.color2}`
  }
  if(grouped === 'middle') {
    inputStyles.borderRadius = '0'
  }
  if(grouped === 'right') {
    inputStyles.borderRadius = '0 10px 10px 0'
    inputStyles.borderRight = `1px solid ${theme.color2}`
    inputStyles.borderLeft = 'none'
    inputStyles.borderTop = `1px solid ${theme.color2}`
    inputStyles.borderBottom = `1px solid ${theme.color2}`
  }
  const buttonStyles = {
    color: theme.textColor
  }
  

  /* build */
  const yearArray = buildYears(windowYear, count)
  const years = yearArray.map((year, i) => {
    return (
      <button
        key={i}
        year={year}
        style={buttonStyles}
        className={css.years_item}
        onClick={handleYearSelected}>
        {year}
      </button>)
  })
  const yearString = selectedYear ? selectedYear : null
  

  return (
    <div ref={yearsRef} style={containerStyles} className={css.container}>

      {/* label */}
      { label ? <div className={css.label}><label>{label}</label></div> : null }

      {/* input */}
      <div style={inputStyles} className={css.input} onClick={() => setPopUp(!popUp)}>
        { hideIcon ? null : <img alt="" className={css.icon} src={icons.calendar} /> }
        <span>{yearString}</span>
      </div>

      {/* times */}
      {popUp ?
        <div style={yearPickerContainerStyles} className={css.year_picker_container}>


          <div className={css.arrow_container}>
            <div className={css.arrow_box}>
              <button className={css.arrow_link} name="previous" onClick={handleYearChange}></button>
              <img alt="" src={icons['chevron-left']}></img>
            </div>
            <div className={css.arrow_box}>
              <button className={css.arrow_link} name="next" onClick={handleYearChange}></button>
              <img alt="" src={icons['chevron-right']}></img>
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
