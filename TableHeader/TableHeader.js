import React, { useContext, useState } from 'react'
import { ThemeContext } from '../ThemeContext'
import css from './TableHeader.module.css'

const TableHeader = ({ children, title, value, sort, activeSort, handleSort }) => {
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  const [descOrder, updateDescOrder] = useState(true)

  let containerStyles = {
    color: theme.textColor,
    backgroundColor: theme.bgColor
  }

  const descIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.featureDark}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-down"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`
  const ascIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${theme.featureDark}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`

  const handleClick = () => {
    if (sort) {
      handleSort(value, !descOrder)
      updateDescOrder(!descOrder)
    }
  }

  return (
    <div
      style={containerStyles}
      className={css.container}
      onClick={handleClick}
    >
      {children}

      {sort && activeSort ?
        <img
          alt=""
          className={css.icon}
          src={descOrder ? descIcon : ascIcon}
        />
      : null}

    </div>
  )
}

export default TableHeader
