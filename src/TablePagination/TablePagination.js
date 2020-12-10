import React, { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './TablePagination.module.css'

const TablePagination = ({ varient, count, pageCount, rowCount, handleRowCount, handlePageCount }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const totalCount = count
  const firstView = ( ( pageCount - 1 ) * rowCount ) + 1
  const lastView = pageCount * rowCount > count ? count : pageCount * rowCount


  /* states */
  const [rowClicked, updateRowClicked] = useState(false)

  const rowOptions = [10, 20, 50, 100]

  /* user interactions */
  const handleRowClick = (e) => {
    if(selectRef.current && !selectRef.current.contains(e.target)) { updateRowClicked(false) }
  }
  const selectRef = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleRowClick, false)
    return () => {
      document.removeEventListener('mousedown', handleRowClick, false)
    }
  },[selectRef])

  /* page count handler */
  const handlePage = (action) => {
    const totalPages = Math.ceil(count / rowCount)
    if (action === "next" && pageCount < totalPages) {
      handlePageCount(pageCount + 1)
    }
    if (action === "previous" && pageCount !== 1) {
      handlePageCount(pageCount - 1)
    }
  }


  /* theme options */
  let iconStroke = varient === 'primary' ? 'white' : theme.iconColor

  /* styles */
  const inputStyles = {
    color: theme.textColor,
    backgroundColor: theme.color2,
    border: `1px solid ${theme.color3}`
  }

  const optionStyles = {
    color: theme.textColor,
    backgroundColor: theme.color1,
    border: `1px solid ${theme.color3}`
  }

  const arrowStyles = {
    color: theme.textColor,
    border: `1px solid ${theme.color3}`
  }

  /* icons */
  const arrowLeftIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>`
  const arrowRightIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>`


  return (
    <div className={css.container}>

      {/* row data */}
      <div ref={selectRef} className={css.row_container}>

        <span>Rows per page: </span>

        {/* row input */}
        <div style={inputStyles} className={css.input} onClick={() => updateRowClicked(!rowClicked)}>
          <span>{rowCount}</span>
        </div>

        {/* row popup dialog */}
        {rowClicked ?
          <div
            style={optionStyles}
            className={css.option_container}>
            {rowOptions.map((option, i) => (
              <div
                style={ i !== 0 ? { borderTop: `1px solid ${theme.color3}`} : null }
                className={css.option}
                key={i}
                onClick={() => {
                  handleRowCount(option)
                  updateRowClicked(!rowClicked)
                }}
              >{option}</div>)
            )}
          </div>
        : null }

      </div>




      {/* page data */}
      <div className={css.page_container}>

        <span>{firstView} - {lastView} of {totalCount}</span>

        <div
          className={css.arrow_container}>
          <div
            style={arrowStyles}
            className={css.arrow_left}
            onClick={() => handlePage("previous")}
          >
            <img
              alt=""
              className={css.arrow_icon}
              src={arrowLeftIcon}
            />
          </div>
          <div
            style={arrowStyles}
            className={css.arrow_right}
            onClick={() => handlePage("next")}
          >
            <img
              alt=""
              className={css.arrow_icon}
              src={arrowRightIcon}
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default TablePagination
