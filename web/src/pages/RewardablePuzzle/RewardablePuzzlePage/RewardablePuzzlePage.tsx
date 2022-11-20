import RewardableCell from 'src/components/RewardablePuzzle/RewardablePuzzleCell'

type RewardablePageProps = {
  id: string
}

const RewardablePage = ({ id }: RewardablePageProps) => {
  return <RewardableCell id={id} />
}

export default RewardablePage
