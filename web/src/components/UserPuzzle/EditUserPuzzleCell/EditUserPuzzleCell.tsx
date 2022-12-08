import type { EditUserPuzzleById, UpdateUserPuzzleInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserPuzzleForm from 'src/components/UserPuzzle/UserPuzzleForm'

export const QUERY = gql`
  query EditUserPuzzleById($id: String!) {
    userPuzzle: userPuzzle(id: $id) {
      id
      userId
      name
      slug
      explanation
      challenge
      solution
      imageUrl
    }
  }
`
const UPDATE_USER_PUZZLE_MUTATION = gql`
  mutation UpdateUserPuzzleMutation($id: String!, $input: UpdateUserPuzzleInput!) {
    updateUserPuzzle(id: $id, input: $input) {
      id
      userId
      name
      slug
      explanation
      challenge
      solution
      imageUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ userPuzzle }: CellSuccessProps<EditUserPuzzleById>) => {
  const [updateUserPuzzle, { loading, error }] = useMutation(
    UPDATE_USER_PUZZLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserPuzzle updated')
        navigate(routes.userPuzzles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUserPuzzleInput,
    id: EditUserPuzzleById['userPuzzle']['id']
  ) => {
    updateUserPuzzle({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit UserPuzzle {userPuzzle?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <UserPuzzleForm userPuzzle={userPuzzle} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
