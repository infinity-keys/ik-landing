interface DevPuzzleProps {
  val: string;
}

const DevPuzzle = ({ val }: DevPuzzleProps) => {

  return (
    <h1>{val}</h1>
  )
}

export default DevPuzzle;
