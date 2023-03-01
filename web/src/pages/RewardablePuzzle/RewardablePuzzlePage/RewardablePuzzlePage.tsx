import RewardablePuzzleCell from 'src/components/RewardablePuzzle/RewardablePuzzleCell'

type RewardablePageProps = {
  slug: string
}

const RewardablePuzzlePage = ({ slug }: RewardablePageProps) => {
  return <RewardablePuzzleCell slug={slug} />
}

export default RewardablePuzzlePage
