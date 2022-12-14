import './styles.css'

import { useState } from 'react'

import Game from './components/Game'
import Message from './components/Message'

export default function TetrisApp() {
  const [completed, setCompleted] = useState(false)
  return (
    <div className="App">
      {completed ? (
        <Message />
      ) : (
        <Game setCompleted={setCompleted} rows={20} columns={10} />
      )}
    </div>
  )
}
