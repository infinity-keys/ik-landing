import Menu from "./Menu";
import Tetris from "./Tetris";

import { useGameOver } from "../hooks/useGameOver";

const Game = ({ rows, columns, completed, setCompleted }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => resetGameOver();

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
  );
};

export default Game;
