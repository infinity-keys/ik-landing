import { StrictMode } from 'react'

import ReactDOM from 'react-dom'

import TetrisApp from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <TetrisApp />
  </StrictMode>,
  rootElement
)
