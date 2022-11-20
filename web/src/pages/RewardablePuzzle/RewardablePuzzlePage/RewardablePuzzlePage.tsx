import RewardableCell from 'src/components/RewardablePuzzle/RewardablePuzzleCell'

type RewardablePageProps = {
  slug: string
}

const RewardablePage = ({ slug }: RewardablePageProps) => {
  return <RewardableCell slug={slug} />
}

export default RewardablePage
