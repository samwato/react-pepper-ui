import React, { useState, useEffect, useContext, useRef } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './DatePicker.module.css'
import moment from 'moment'
import buildIcons from '../utils/buildIcons'
import buildCalendar from './buildCalendar'

const DatePicker = ({ label, name, handlerChange, fullwidth, cleared, grouped, size, open, value, icon }) => {
  /* theme context */
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* states */
  const [windowDate, setWindowDate] = useState(moment())
  // const [selectedDate, setSelectedDate] = useState(value)
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
    handlerChange(name, outputDate)
  }
  // const handleChangeUpComponent = (name, selectedDate) => {
  //   handlerChange(name, selectedDate)
  // }

  /* use effects - submit data to parent form when selectedDate state changes */
  // useEffect(() => {
  //   if(selectedDate) {
  //     handleChangeUpComponent(name, selectedDate)
  //   }
  // }, [selectedDate, name])

  // useEffect(() => {
  //   if(cleared) setSelectedDate()
  // },[cleared])
  
  
  /* custom styles */
  const icons = buildIcons(theme.iconColor)
  
  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color2}`,
    boxShadow: theme.shadow1,
    borderRadius: theme.borderRadius
  }
  const datePickerContainerStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color2}`,
    boxShadow: theme.shadow1,
    borderRadius: theme.borderRadius
  }
  let containerStyles = {}
  if(fullwidth) {
    containerStyles.width = '100%'
  } else {
    containerStyles.margin = '0 10px'
  }
  const buttonStyles = {
    color: theme.textColor
  }
  let iconStyles = {
    marginRight: '7px'
  }
  if(size === 'sm' || size === 'small') {
    inputStyles.fontSize = '12px'
    inputStyles.padding = '5px 15px'
    inputStyles.height = '32px'
    iconStyles.height = '15px'
  } else {
    inputStyles.fontSize = '14px'
    inputStyles.padding = '10px 20px'
    inputStyles.height = '40px'
    iconStyles.height = '20px'
  }
  
  if(!icon) {
    iconStyles.marginRight = '0px'
  }
  
  if(grouped === 'left') {
    inputStyles.borderRadius = '10px 0 0 10px'
    inputStyles.borderRight = 'none'
    containerStyles.margin = '0'
  }
  if(grouped === 'middle') {
    inputStyles.borderRadius = '0'
    containerStyles.margin = '0'
    inputStyles.borderRight = 'none'
  }
  if(grouped === 'right') {
    inputStyles.borderRadius = '0 10px 10px 0'
    containerStyles.margin = '0'
  }
  
  if (open === 'left') {
    datePickerContainerStyles.right = '0'
  }
  

  /* build numbers */
  const daysArray = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const days = daysArray.map(item => <span key={item} className={css.days_item}>{item}</span>)

  const monthString = windowDate.format('MMMM YYYY')

  const daysInMonthArray = buildCalendar(windowDate, value)
  const monthNumbers = daysInMonthArray.map((item, i) => {
    if(item.disabled) {
      return (
        <button
          key={i} name={item.date} style={buttonStyles}
          className={`${css.calendar_item} ${css.calendar_item_disabled}`}
          onClick={(e) => e.preventDefault()}>
          {item.date}
        </button>
      )
    } else if (item.current) {
      return (
        <button
          key={i} name={item.date} style={buttonStyles}
          style={{ backgroundColor: theme.featureDark, color: 'white', fontWeight: 'bold' }}
          className={css.calendar_item}
          onClick={handleDateSelected}>
          {item.date}
        </button>)
    } else {
      return (
        <button
          key={i} name={item.date} style={buttonStyles}
          className={css.calendar_item}
          onClick={handleDateSelected}>
          {item.date}
        </button>)
    }
  })

  const dateString = value ? value.format('DD MMMM YYYY') : null

  


  return (
    <div ref={calendarRef} style={containerStyles} className={css.container}>

      {/* label */}
      { label ? <div className={css.label}><label>{label}</label></div> : null }

      {/* input */}
      <div style={inputStyles} className={css.input} onClick={() => setPopUp(!popUp)}>
        <img alt="" style={iconStyles} className={css.icon} src={icons[icon]} />
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
                <img alt="" src={icons['chevron-left']}></img>
              </div>
              <div className={css.arrow_box}>
                <button style={buttonStyles} className={css.arrow_link} name="next" onClick={handleMonthChange}></button>
                <img alt="" src={icons['chevron-right']}></img>
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
