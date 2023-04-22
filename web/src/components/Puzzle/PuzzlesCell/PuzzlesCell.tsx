import type { FindPuzzles } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Puzzles from 'src/components/Puzzle/Puzzles'

export const QUERY = gql`
  query FindPuzzles {
    puzzles {
      id
      rewardableId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No puzzles yet. '}
      <Link to={routes.newPuzzle()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ puzzles }: CellSuccessProps<FindPuzzles>) => {
  return <Puzzles puzzles={puzzles} />
}
