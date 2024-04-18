import type {
  FindRewardablePuzzleBySlug,
  RestoreRewardablePuzzle,
  RestoreRewardablePuzzleVariables,
  TrashRewardablePuzzle,
  TrashRewardablePuzzleVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

import RestorePuzzle from 'src/components/EditRewardableCell/RestorePuzzle'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import OldFormatMessage from 'src/components/OldFormatMessage/OldFormatMessage'
import RewardablePuzzle from 'src/components/RewardablePuzzle/RewardablePuzzle'

// @TODO: This query is skip auth, and the only thing we need when users are
// logged out is the puzzle cover image.
export const QUERY = gql`
  query FindRewardablePuzzleBySlug($slug: String!) {
    rewardable: rewardableBySlug(slug: $slug, type: PUZZLE) {
      id
      name
      trashedAt
      slug
      orgId
      successMessage
      userCanEdit
      userRewards {
        id
      }
      puzzle {
        id
        coverImage
        requirements
        steps {
          stepSortWeight
          hasUserCompletedStep
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

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Rewardable not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  rewardable,
  queryResult,
}: CellSuccessProps<FindRewardablePuzzleBySlug>) => {
  const [trashPuzzle, { loading: trashLoading }] = useMutation<
    TrashRewardablePuzzle,
    TrashRewardablePuzzleVariables
  >(TRASH_PUZZLE_MUTATION, {
    onCompleted: (data) => {
      if (data.trashRewardablePuzzle.success) {
        return navigate(routes.profile())
      }
      if (
        data.trashRewardablePuzzle.success &&
        typeof queryResult?.refetch === 'function'
      ) {
        queryResult.refetch()
      }
    },
  })

  const [restorePuzzle, { loading: restoreLoading }] = useMutation<
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

  const trashed = !!rewardable.trashedAt

  if (trashLoading || restoreLoading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center">
        <LoadingIcon />
      </div>
    )
  }

  if (trashed) {
    return (
      <RestorePuzzle
        name={rewardable.name}
        restorePuzzle={() =>
          restorePuzzle({
            variables: {
              rewardableId: rewardable.id,
            },
          })
        }
      />
    )
  }

  return rewardable.puzzle?.coverImage ? (
    <div>
      <button
        type="button"
        className="rounded bg-white/10 px-3"
        onClick={() =>
          trashPuzzle({
            variables: {
              rewardableId: rewardable.id,
            },
          })
        }
      >
        Trash Puzzle
      </button>
      <RewardablePuzzle rewardable={rewardable} />
    </div>
  ) : (
    <OldFormatMessage />
  )
}
