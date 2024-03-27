import type {
  EditRewardableMutation,
  EditRewardableMutationVariables,
  FindEditPuzzleQuery,
  FindEditPuzzleQueryVariables,
  RestoreRewardablePuzzle,
  RestoreRewardablePuzzleVariables,
  StepType,
  TrashRewardablePuzzle,
  TrashRewardablePuzzleVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

import PuzzleForm from 'src/components/PuzzleForm/PuzzleForm'

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

const EDIT_REWARDABLE_MUTATION = gql`
  mutation EditRewardableMutation(
    $input: UpdateRewardableInput!
    $rewardableId: String!
    $puzzleId: String!
  ) {
    editRewardablePuzzle(
      input: $input
      rewardableId: $rewardableId
      puzzleId: $puzzleId
    ) {
      rewardable {
        name
        slug
      }
      success
      errorMessage
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
  const [editRewardablePuzzle, { loading, error }] = useMutation<
    EditRewardableMutation,
    EditRewardableMutationVariables
  >(EDIT_REWARDABLE_MUTATION, {
    onCompleted: ({ editRewardablePuzzle }) => {
      if (
        editRewardablePuzzle?.success &&
        editRewardablePuzzle.rewardable?.slug
      ) {
        return navigate(
          routes.puzzleLanding({ slug: editRewardablePuzzle.rewardable.slug })
        )
      }

      if (editRewardablePuzzle?.errorMessage) {
        return alert(editRewardablePuzzle.errorMessage)
      }

      return alert('There was an error creating your rewardable!')
    },
  })

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

  const formattedSteps = rewardable.puzzle.steps.flatMap((step) => {
    if (!step) return []
    return {
      solution: step.stepSimpleText?.solution ?? '',
      solutionHint: step.solutionHint ?? '',
      defaultImage: step.defaultImage ?? '',
      stepSortWeight: step.stepSortWeight ?? '',
      stepGuideType: step.stepGuideType ?? 'SEEK',
      type: 'SIMPLE_TEXT' as StepType,
      stepPage: step?.stepPage?.flatMap((page) => {
        if (!page) return []
        // Apollo automatically adds `__typename` to the query result.
        // Our sdls do not have that field and will error if it's present.
        const { __typename, ...rest } = page
        return rest
      }) || [
        {
          body: '',
          showStepGuideHint: false,
          sortWeight: 1,
        },
      ],
    }
  })

  const dbNft = rewardable.nfts[0]?.data

  const nftName =
    dbNft &&
    typeof dbNft === 'object' &&
    'name' in dbNft &&
    typeof dbNft.name === 'string'
      ? dbNft.name
      : ''
  const nftImage =
    dbNft &&
    typeof dbNft === 'object' &&
    'image' in dbNft &&
    typeof dbNft.image === 'string'
      ? dbNft.image
      : ''

  const trashed = !!rewardable.trashedAt

  return (
    <div className="form min-h-[calc(100vh-80px)] px-4 pb-16">
      <div className="my-8 p-2 text-center text-3xl tracking-wide">
        Edit Your Puzzle
      </div>

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

      <PuzzleForm
        initialValues={{
          rewardable: {
            id: rewardable.id,
            name: rewardable.name,
            listPublicly: rewardable.listPublicly,
            nft: {
              name: nftName,
              image: nftImage,
            },
          },
          puzzle: {
            coverImage: rewardable.puzzle?.coverImage || '',
            requirements: rewardable.puzzle?.requirements?.length
              ? rewardable.puzzle.requirements
              : ['DETAIL'],
          },
          steps: formattedSteps,
        }}
        isEditMode
        onFormSubmit={({ input }) => {
          if (!rewardable.puzzle?.id) {
            throw new Error('Error obtaining puzzle ID')
          }

          editRewardablePuzzle({
            variables: {
              input,
              rewardableId: rewardable.id,
              puzzleId: rewardable.puzzle.id,
            },
          })
        }}
        submissionError={error}
        submissionPending={loading}
      />
    </div>
  )
}
