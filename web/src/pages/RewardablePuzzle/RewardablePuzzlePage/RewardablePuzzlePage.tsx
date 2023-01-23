// import PuzzleStepsCell from 'src/components/Puzzle/PuzzleCell'
import RewardablePuzzleCell from 'src/components/RewardablePuzzle/RewardablePuzzleCell'

type RewardablePageProps = {
  slug: string
}

const RewardablePage = ({ slug }: RewardablePageProps) => {
  return (
    <div>
      <RewardablePuzzleCell slug={slug} />
      {/* <PuzzleStepsCell slug={slug}/> */}
    </div>
  )
}

export default RewardablePage
