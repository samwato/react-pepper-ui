export default (timestamp, displayCount) => {
  let yearsArray = []

  for (let i = 0; i < displayCount; i++) {
    yearsArray.unshift(timestamp - i)
  }

  return yearsArray

}
