import Button from 'src/components/Button'

interface RestorePuzzleProps {
  name: string
  restorePuzzle: () => void
}

const RestorePuzzle = ({ name, restorePuzzle }: RestorePuzzleProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg rounded-lg bg-white/10 p-8 text-center">
        <h1 className="mb-4 text-2xl">{name}</h1>
        <p className="mb-4">
          This puzzle is scheduled for deletion and cannot be edited. If you
          would like to keep this puzzle, you can restore it here.
        </p>
        <Button onClick={restorePuzzle} solid>
          Restore Puzzle
        </Button>
      </div>
    </div>
  )
}

export default RestorePuzzle
