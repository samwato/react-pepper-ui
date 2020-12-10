import React from 'react'

import { Button } from '@samwato/react-pepper-ui'
import '@samwato/react-pepper-ui/dist/index.css'

const App = () => {
  
  const handler = () => {
    console.log('Button')
  }
  
  return (
    <div>
      <Button
        varient="primary"
        size="sm"
        type="submit"
        handler={handler}
        icon="trash"
      >
        Hello
      </Button>
    </div>
  )
}

export default App
