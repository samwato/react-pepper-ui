import React, { createContext, Component } from 'react'

import UserContext from '../context/UserContext'

const ThemeContext = createContext()

class ThemeProvider extends Component {
  static contextType = UserContext

  state = {
    isLightTheme: true,
    light: {
      color1: 'rgb(255,255,255)',
      color2: '#F6F8FA',
      color3: '#E1E5EB',
      textColor: 'rgb(47, 54, 61)',
      iconColor: 'rgb(47, 54, 61)',
      featureDark: 'rgb(0,102,255)',
      featureLight: '#EAF1FE',
      success: '#60C480',
      error: '#E02C54'
    },
    dark: {
      color1: '#24292E',
      color2: 'rgb(47, 54, 61)',
      color3: '#444D56',
      textColor: 'rgb(255,255,255)',
      iconColor: 'rgb(255,255,255)',
      featureDark: 'rgb(0,102,255)',
      featureLight: '#EAF1FE',
      success: '#60C480',
      error: '#E02C54'
    }
  }

  render() {
    return (
      <ThemeContext.Provider
        value={{
          ...this.state,
          isLightTheme: this.context.isLightTheme
        }}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export { ThemeProvider }

export default ThemeContext
