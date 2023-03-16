import type { EditPuzzleById, UpdatePuzzleInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PuzzleForm from 'src/components/Puzzle/PuzzleForm'

export const QUERY = gql`
  query EditPuzzleById($id: String!) {
    puzzle: puzzle(id: $id) {
      id
      rewardableId
    }
  }
`
const UPDATE_PUZZLE_MUTATION = gql`
  mutation UpdatePuzzleMutation($id: String!, $input: UpdatePuzzleInput!) {
    updatePuzzle(id: $id, input: $input) {
      id
      rewardableId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ puzzle }: CellSuccessProps<EditPuzzleById>) => {
  const [updatePuzzle, { loading, error }] = useMutation(
    UPDATE_PUZZLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Puzzle updated')
        navigate(routes.puzzles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePuzzleInput,
    id: EditPuzzleById['puzzle']['id']
  ) => {
    updatePuzzle({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Puzzle {puzzle?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <PuzzleForm puzzle={puzzle} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
