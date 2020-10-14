# @samwato/react-pepper-ui

> Custom React Component Library

[![NPM](https://img.shields.io/npm/v/@samwato/react-pepper-ui.svg)](https://www.npmjs.com/package/@samwato/react-pepper-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @samwato/react-pepper-ui
```

## Usage Example

```jsx
import Reactfrom 'react'
import { Button } from '@samwato/react-pepper-ui'

export const Page = () => {
  
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
        fullwidth
        icon="trash"
      >
        Hello
      </Button>
    </div>
  )
}
```
