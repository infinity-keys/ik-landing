import type { FindStepsByPuzzleId } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PuzzleSteps from 'src/components/Puzzle/Puzzle'

export const QUERY = gql`
  query FindStepsByPuzzleId($id: String!) {
    puzzle(id: $id) {
      id
      rewardableId
      steps {
        id
        hasUserCompletedStep
        stepSortWeight
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Puzzle not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ puzzle }: CellSuccessProps<FindStepsByPuzzleId>) => {
  return <PuzzleSteps puzzle={puzzle} />
}
