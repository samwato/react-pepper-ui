import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './CalendarPicker.module.css'
import moment from 'moment'
import buildIcons from '../utils/buildIcons'
import buildCalendar from './buildCalendar'

const CalendarPicker = ({ label, name, handlerChange, fullwidth, cleared, value }) => {
  /* theme context */
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* states */
  const [windowDate, setWindowDate] = useState(moment())


  /* handler functions */
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
    const outputDate = moment().set({ 'year': year, 'month': month, 'date': date, 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 })
    handlerChange(name, outputDate)
  }

  
  
  /* custom styles */
  const icons = buildIcons(theme.iconColor)
  
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


  


  return (
    <div style={containerStyles} className={css.container}>

      {/* calendar */}
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

    </div>
  )

}

export default CalendarPicker
