import type { EditRewardableById, UpdateRewardableInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RewardableForm from 'src/components/RewardablePuzzle/RewardablePuzzleForm'

export const QUERY = gql`
  query EditRewardableById($id: String!) {
    rewardable: rewardable(id: $id) {
      id
      createdAt
      updatedAt
      name
      slug
      explanation
      successMessage
      listPublicly
      type
      orgId
    }
  }
`
const UPDATE_REWARDABLE_MUTATION = gql`
  mutation UpdateRewardableMutation(
    $id: String!
    $input: UpdateRewardableInput!
  ) {
    updateRewardable(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      slug
      explanation
      successMessage
      listPublicly
      type
      orgId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  rewardable,
}: CellSuccessProps<EditRewardableById>) => {
  const [updateRewardable, { loading, error }] = useMutation(
    UPDATE_REWARDABLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Rewardable updated')
        navigate(routes.puzzles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateRewardableInput,
    id: EditRewardableById['rewardable']['id']
  ) => {
    updateRewardable({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Rewardable {rewardable?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RewardableForm
          rewardable={rewardable}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
