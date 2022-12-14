import { useGameOver } from '../hooks/useGameOver'

import Menu from './Menu'
import Tetris from './Tetris'

const Game = ({ rows, columns, setCompleted }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver()

  const start = () => resetGameOver()

  return (
    <div className="Game">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris
          rows={rows}
          columns={columns}
          setGameOver={setGameOver}
          setCompleted={setCompleted}
        />
      )}
    </div>
  )
}

export default Game
