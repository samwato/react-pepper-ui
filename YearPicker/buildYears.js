import moment from 'moment'

export default (timestamp, displayCount) => {

  let yearsArray = []

  for (let i = 0; i < displayCount; i++) {
    const year = moment(timestamp).subtract('years', i).format('YYYY')
    yearsArray.unshift(year)
  }

  return yearsArray

}
