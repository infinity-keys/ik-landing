import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PuzzleForm from 'src/components/Puzzle/PuzzleForm'

import type { CreatePuzzleInput } from 'types/graphql'

const CREATE_PUZZLE_MUTATION = gql`
  mutation CreatePuzzleMutation($input: CreatePuzzleInput!) {
    createPuzzle(input: $input) {
      id
    }
  }
`

const NewPuzzle = () => {
  const [createPuzzle, { loading, error }] = useMutation(
    CREATE_PUZZLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Puzzle created')
        navigate(routes.puzzles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePuzzleInput) => {
    createPuzzle({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Puzzle</h2>
      </header>
      <div className="rw-segment-main">
        <PuzzleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPuzzle
