// import EditRewardableCell from 'src/components/RewardablePuzzle/EditRewardableCell'
import EditRewardableCell from 'src/components/RewardablePuzzle/EditRewardablePuzzleCell'

type RewardablePageProps = {
  id: string
}

const EditRewardablePage = ({ id }: RewardablePageProps) => {
  return <EditRewardableCell id={id} />
}

export default EditRewardablePage
