import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/* Context */
import { ViewportContextProvider, ThemeContextProvider } from '@samwato/react-pepper-ui'


ReactDOM.render(
  <React.StrictMode>
    <ViewportContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </ViewportContextProvider>
  </React.StrictMode>,
  
document.getElementById('root'))
