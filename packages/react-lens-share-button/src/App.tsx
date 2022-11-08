import React from 'react'

import { LensShareButton } from './components/LensShareButton'

function App() {
  return (
    <LensShareButton
      postBody="tesing 123"
      url="https://google.com"
      hashtags="one,two"
      via="stormcloud.lens"
    />
  )
}

export default App
