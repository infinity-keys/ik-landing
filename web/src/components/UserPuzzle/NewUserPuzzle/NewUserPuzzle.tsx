import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserPuzzleForm from 'src/components/UserPuzzle/UserPuzzleForm'

import type { CreateUserPuzzleInput } from 'types/graphql'

const CREATE_USER_PUZZLE_MUTATION = gql`
  mutation CreateUserPuzzleMutation($input: CreateUserPuzzleInput!) {
    createUserPuzzle(input: $input) {
      id
    }
  }
`

const NewUserPuzzle = () => {
  const [createUserPuzzle, { loading, error }] = useMutation(
    CREATE_USER_PUZZLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserPuzzle created')
        navigate(routes.userPuzzles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateUserPuzzleInput) => {
    createUserPuzzle({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New UserPuzzle</h2>
      </header>
      <div className="rw-segment-main">
        <UserPuzzleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUserPuzzle
