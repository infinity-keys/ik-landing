import "./Menu.css";

const Menu = ({ onClick }) => (
  <div className="Menu">
    <button className="Button" onClick={onClick}>
      Play Tetris
    </button>
    <span className="Instructions">
      <p>Press "Q" to Quit</p>
      <p>Press "P" to Pause/Resume</p>
      <p>Press "ArrowUp" to Rotate</p>
      <p>Press "ArrowLeft" to Move Left</p>
      <p>Press "ArrowRight" to Move Right</p>
      <p>Press "ArrowDown" to Slow Drop</p>
      <p>Press "Space" to Fast Drop</p>
    </span>
  </div>
);

export default Menu;
