export default (timestamp, currentDate) => {
  const firstDay = timestamp.startOf('month').format('d')
  const daysInLastMonth = timestamp.subtract(1,'months').daysInMonth()
  const daysInNextMonth = timestamp.add(1,'months').daysInMonth()
  const daysInMonth = timestamp.daysInMonth()

  const dateSelectedMonth = timestamp.month()
  const dateSelectedYear = timestamp.year()

  let currentDateDate
  let currentDateMonth
  let currentDateYear

  if(currentDate !== undefined) {
    currentDateDate = currentDate.date()
    currentDateMonth = currentDate.month()
    currentDateYear = currentDate.year()
  }

  let array = []
  // push selected month days
  for (let j = 1; j <= daysInMonth; j++) {
    if(currentDate !== undefined && currentDateDate === j && currentDateMonth === dateSelectedMonth && currentDateYear === dateSelectedYear) {
      array.push({ date: j, current: true, disabled: false })
    } else {
      array.push({ date: j, current: false, disabled: false })
    }
  }
  // unshift previous month days
  for (let i = 0; i < firstDay; i++) {
    array.unshift({ date: daysInLastMonth - i, current: false, disabled: true })
  }
  // push next month days
  for (let k = 1; k <= daysInNextMonth; k++) {
    if(array.length < 42) {
      array.push({ date: k, current: false, disabled: true })
    }
  }
  return array
}
