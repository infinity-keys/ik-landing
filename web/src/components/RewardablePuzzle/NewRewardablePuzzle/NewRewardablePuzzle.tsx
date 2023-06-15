import type { CreateRewardableInput } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import NewRewardableForm from 'src/components/RewardablePuzzle/NewRewardablePuzzleForm'

const CREATE_REWARDABLE_MUTATION = gql`
  mutation CreateRewardablesStepsNftsMutation(
    $input: CreateRewardablesStepsNftsInput!
  ) {
    createRewardablesStepsNfts(input: $input) {
      id
    }
  }
`

const NewRewardable = () => {
  const [createRewardable, { loading, error }] = useMutation(
    CREATE_REWARDABLE_MUTATION,
    {
      onCompleted: (data) => {
        console.log(data.createRewardablesStepsNfts)
        alert(
          `Rewardable created 🎉 🪑\n\nID: ${data.createRewardablesStepsNfts.id}`
        )
      },
      onError: (error) => {
        alert(`error: ${error.message}`)
      },
    }
  )

  const onSave = (input: CreateRewardableInput) => {
    createRewardable({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Rewardable</h2>
      </header>
      <div className="rw-segment-main text-gray-500">
        <NewRewardableForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRewardable
