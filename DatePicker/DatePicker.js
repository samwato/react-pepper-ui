import React, { useState, useEffect, useContext, useRef } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './DatePicker.module.css'
import moment from 'moment'

import buildCalendar from './buildCalendar'

const DatePicker = ({ label, name, handlerChange, fullwidth, cleared }) => {
  /* theme context */
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* states */
  const [windowDate, setWindowDate] = useState(moment())
  const [selectedDate, setSelectedDate] = useState()
  const [popUp, setPopUp] = useState(false)

  /* handler functions */
  const handlePopUp = (e) => {
    if(calendarRef.current && !calendarRef.current.contains(e.target)) {
      setPopUp(false)
    }
  }
  const calendarRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handlePopUp, false)
    return () => {
      document.removeEventListener('mousedown', handlePopUp, false)
    }
  },[calendarRef])

  const handleMonthChange = (e) => {
    e.preventDefault()
    const { name } = e.target
    if (name === 'previous') setWindowDate(moment(windowDate.subtract(1,'months')))
    if (name === 'next') setWindowDate(moment(windowDate.add(1,'months')))
  }
  const handleDateSelected = (e) => {
    e.preventDefault()
    const year = windowDate.year()
    const month = windowDate.month()
    const date = e.target.name
    const outputDate = moment().set({ 'year': year, 'month': month, 'date': date })
    setPopUp(false)
    setSelectedDate(outputDate)
  }
  const handleChangeUpComponent = (name, selectedDate) => {
    handlerChange(name, selectedDate)
  }

  /* use effects - submit data to parent form when selectedDate state changes */
  useEffect(() => {
    if(selectedDate) {
      handleChangeUpComponent(name, selectedDate)
    }
  }, [selectedDate, name])

  useEffect(() => {
    if(cleared) setSelectedDate()
  },[cleared])


  const daysArray = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const days = daysArray.map(item => <span key={item} className={css.days_item}>{item}</span>)

  const monthString = windowDate.format('MMMM YYYY')

  const daysInMonthArray = buildCalendar(windowDate, selectedDate)
  const monthNumbers = daysInMonthArray.map((item, i) => {
    if(item.disabled) {
      return (
        <button
          key={i} name={item.date}
          className={`${css.calendar_item} ${css.calendar_item_disabled}`}
          onClick={(e) => e.preventDefault()}>
          {item.date}
        </button>
      )
    } else if (item.current) {
      return (
        <button
          key={i} name={item.date}
          style={{ backgroundColor: theme.featureDark, color: 'white', fontWeight: 'bold' }}
          className={css.calendar_item}
          onClick={handleDateSelected}>
          {item.date}
        </button>)
    } else {
      return (
        <button
          key={i} name={item.date}
          className={css.calendar_item}
          onClick={handleDateSelected}>
          {item.date}
        </button>)
    }
  })

  const dateString = selectedDate ? selectedDate.format('DD MMMM YYYY') : null

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
  const datePickerContainerStyles = inputStyles
  let containerStyles = {}
  if(fullwidth) {
    containerStyles.width = '100%'
  } else {
    containerStyles.margin = '0 10px'
  }


  return (
    <div ref={calendarRef} style={containerStyles} className={css.container}>

      {/* label */}
      { label ? <div className={css.label}><label>{label}</label></div> : null }

      {/* input */}
      <div style={inputStyles} className={css.input} onClick={() => setPopUp(!popUp)}>
        <img alt="" className={css.icon} src={calendarIcon} />
        <span>{dateString}</span>
      </div>

      {/* calendar */}
      {popUp ?
        <div style={datePickerContainerStyles} className={css.date_picker_container}>
          <div className={css.date_selection_container}>
            <span className={css.date_title}>{monthString}</span>
            <div className={css.arrow_container}>
              <div className={css.arrow_box}>
                <button className={css.arrow_link} name="previous" onClick={handleMonthChange}></button>
                <img alt="" src={arrowLeftIcon}></img>
              </div>
              <div className={css.arrow_box}>
                <button className={css.arrow_link} name="next" onClick={handleMonthChange}></button>
                <img alt="" src={arrowRightIcon}></img>
              </div>
            </div>
          </div>
          <div className={css.days_container}>
            {days}
          </div>
          <div className={css.calendar_container}>
            {monthNumbers}
          </div>
        </div>
      : null }

    </div>
  )

}

export default DatePicker
