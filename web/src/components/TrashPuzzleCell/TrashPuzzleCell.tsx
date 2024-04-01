import type {
  FindEditPuzzleQuery,
  FindEditPuzzleQueryVariables,
  RestoreRewardablePuzzle,
  RestoreRewardablePuzzleVariables,
  TrashRewardablePuzzle,
  TrashRewardablePuzzleVariables,
} from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

export const QUERY = gql`
  query FindEditPuzzleQuery($slug: String!) {
    rewardable: rewardableBySlugWithOrg(slug: $slug, type: PUZZLE) {
      id
      name
      listPublicly
      trashedAt
      nfts {
        data
      }
      puzzle {
        id
        coverImage
        requirements
        steps {
          type
          solutionHint
          defaultImage
          stepSortWeight
          stepGuideType
          stepPage {
            body
            showStepGuideHint
            sortWeight
          }
          stepSimpleText {
            solution
          }
        }
      }
    }
  }
`

const TRASH_PUZZLE_MUTATION = gql`
  mutation TrashRewardablePuzzle($rewardableId: String!) {
    trashRewardablePuzzle(rewardableId: $rewardableId) {
      success
    }
  }
`

const RESTORE_PUZZLE_MUTATION = gql`
  mutation RestoreRewardablePuzzle($rewardableId: String!) {
    restoreRewardablePuzzle(rewardableId: $rewardableId) {
      success
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty!</div>

export const Failure = ({
  error,
}: CellFailureProps<FindEditPuzzleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  rewardable,
  queryResult,
}: CellSuccessProps<FindEditPuzzleQuery, FindEditPuzzleQueryVariables>) => {
  const [trashPuzzle] = useMutation<
    TrashRewardablePuzzle,
    TrashRewardablePuzzleVariables
  >(TRASH_PUZZLE_MUTATION, {
    onCompleted: (data) => {
      if (
        data.trashRewardablePuzzle.success &&
        typeof queryResult?.refetch === 'function'
      ) {
        queryResult.refetch()
      }
    },
  })

  const [restorePuzzle] = useMutation<
    RestoreRewardablePuzzle,
    RestoreRewardablePuzzleVariables
  >(RESTORE_PUZZLE_MUTATION, {
    onCompleted: (data) => {
      if (
        data.restoreRewardablePuzzle.success &&
        typeof queryResult?.refetch === 'function'
      ) {
        queryResult.refetch()
      }
    },
  })

  if (!rewardable.puzzle?.steps.length) {
    return null
  }

  const trashed = !!rewardable.trashedAt

  return (
    <div className="form min-h-[calc(100vh-80px)] px-4 pb-16">
      <button
        type="button"
        className="rounded bg-white/10 px-3"
        onClick={() =>
          trashed
            ? restorePuzzle({
                variables: {
                  rewardableId: rewardable.id,
                },
              })
            : trashPuzzle({
                variables: {
                  rewardableId: rewardable.id,
                },
              })
        }
      >
        {trashed ? 'Restore Puzzle' : 'Trash Puzzle'}
      </button>
    </div>
  )
}

export default Success
