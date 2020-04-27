import React, { createContext, Component } from 'react'

import UserContext from '../context/UserContext'

const ThemeContext = createContext()

class ThemeProvider extends Component {
  static contextType = UserContext

  state = {
    isLightTheme: true,
    light: {
      color1: '#FFFFFF',
      color2: '#F6F8FA',
      color3: '#E1E5EB',
      textColor: '#2F363D',
      iconColor: '#2F363D',
      featureDark: '#0066FF',
      featureLight: '#EAF1FE',
      success: '#60C480',
      error: '#E02C54'
    },
    dark: {
      color1: '#24292E',
      color2: '#2F363D',
      color3: '#444D56',
      textColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      featureDark: '#0066FF',
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
