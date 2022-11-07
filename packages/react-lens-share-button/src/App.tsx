import React from 'react'

import ShareButton from './ShareButton'

function App() {
  return (
    <div className="App">
      <ShareButton
        postBody="tesing 123"
        url="https://google.com"
        hashtags="one,two"
        via="stormcloud.lens"
      />
    </div>
  )
}

export default App
