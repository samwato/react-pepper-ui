import React, { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './TimePicker.module.css'
import moment from 'moment'
import buildIcons from '../utils/buildIcons'

import buildTimes from './buildTimes'

const TimePicker = ({ label, name, handlerChange, fullwidth, cleared }) => {
  /* theme context */
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  /* states */
  const [selectedTime, setSelectedTime] = useState()
  const [popUp, setPopUp] = useState(false)

  /* handler functions */
  const handlePopUp = (e) => {
    if(timesRef.current && !timesRef.current.contains(e.target)) {
      setPopUp(false)
    }
  }
  const timesRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handlePopUp, false)
    return () => {
      document.removeEventListener('mousedown', handlePopUp, false)
    }
  },[timesRef])


  const handleTimeSelected = (e) => {
    e.preventDefault()
    const hour = e.target.getAttribute('hour')
    const minute = e.target.getAttribute('minute')
    const outputDate = moment().set({ 'hour': hour, 'minute': minute, 'second': 0 })
    setPopUp(false)
    setSelectedTime(outputDate)
  }
  const handleChangeUpComponent = (name, selectedDate) => {
    handlerChange(name, selectedDate)
  }

  /* use effects - submit data to parent form when selectedDate state changes */
  useEffect(() => {
    if(selectedTime) {
      handleChangeUpComponent(name, selectedTime)
    }
  }, [selectedTime, name])

  useEffect(() => {
    if(cleared) setSelectedTime()
  },[cleared])
  
  
  /* custom styles */
  const icons = buildIcons(theme.iconColor)
  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color2}`,
    boxShadow: theme.shadow1,
    borderRadius: theme.borderRadius
  }
  const timePickerContainerStyles = inputStyles
  let containerStyles = {}
  if(fullwidth) {
    containerStyles.width = '100%'
  } else {
    containerStyles.margin = '0 10px'
  }
  const buttonStyles = {
    color: theme.textColor
  }

  /* buid */
  const timesArray = buildTimes()
  const times = timesArray.map((item, i) => {
    return (
      <button
        key={i}
        style={buttonStyles}
        hour={item.hour}
        minute={item.minute}
        className={css.times_item}
        onClick={handleTimeSelected}>
        {item.title}
      </button>)
  })

  const timeString = selectedTime ? selectedTime.format('HH:mm') : null

  

  return (
    <div ref={timesRef} style={containerStyles} className={css.container}>

      {/* label */}
      { label ? <div className={css.label}><label>{label}</label></div> : null }

      {/* input */}
      <div style={inputStyles} className={css.input} onClick={() => setPopUp(!popUp)}>
        <img alt="" className={css.icon} src={icons.clock} />
        <span>{timeString}</span>
      </div>

      {/* times */}
      {popUp ?
        <div style={timePickerContainerStyles} className={css.time_picker_container}>
          <div className={css.times_container}>
            {times}
          </div>
        </div>
      : null }

    </div>
  )

}

export default TimePicker
