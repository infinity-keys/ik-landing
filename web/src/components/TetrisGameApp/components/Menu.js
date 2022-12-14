import './Menu.css'

const Menu = ({ onClick }) => (
  <div className="Menu">
    <button className="Button" onClick={onClick}>
      Play Tetris
    </button>
    <span className="Instructions">
      <p>Press &quot;Q&quot; to Quit</p>
      <p>Press &quot;P&quot; to Pause/Resume</p>
      <p>Press &quot;ArrowUp&quot; to Rotate</p>
      <p>Press &quot;ArrowLeft&quot; to Move Left</p>
      <p>Press &quot;ArrowRight&quot; to Move Right</p>
      <p>Press &quot;ArrowDown&quot; to Slow Drop</p>
      <p>Press &quot;Space&quot; to Fast Drop</p>
    </span>
  </div>
)

export default Menu
