import type { CreateRewardableInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RewardableForm from 'src/components/RewardablePuzzle/RewardablePuzzleForm'

const CREATE_REWARDABLE_MUTATION = gql`
  mutation CreateRewardableMutation($input: CreateRewardableInput!) {
    createRewardable(input: $input) {
      id
    }
  }
`

const NewRewardable = () => {
  const [createRewardable, { loading, error }] = useMutation(
    CREATE_REWARDABLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Rewardable created')
        navigate(routes.puzzles())
      },
      onError: (error) => {
        toast.error(error.message)
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
      <div className="rw-segment-main">
        <RewardableForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRewardable
