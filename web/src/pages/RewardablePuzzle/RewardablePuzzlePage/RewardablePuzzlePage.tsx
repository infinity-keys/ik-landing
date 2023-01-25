// import PuzzleStepsCell from 'src/components/Puzzle/PuzzleCell'
import RewardablePuzzleCell from 'src/components/RewardablePuzzle/RewardablePuzzleCell'

type RewardablePageProps = {
  slug: string
}

const RewardablePuzzlePage = ({ slug }: RewardablePageProps) => {
  return (
    <div>
      <RewardablePuzzleCell slug={slug} />
    </div>
  )
}

export default RewardablePuzzlePage
