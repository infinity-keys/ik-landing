import { useEffect } from 'react'

import { getThumbnailProgress } from '@infinity-keys/core'
import loFindLastIndex from 'lodash/findLastIndex'
import type { FindStepQuery, FindStepQueryVariables } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import CollapsibleMarkdown from 'src/components/CollapsibleMarkdown/CollapsibleMarkdown'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import NftCheckButton from 'src/components/NftCheckButton/NftCheckButton'
import SimpleTextInput from 'src/components/SimpleTextInput/SimpleTextInput'
import ThumbnailMini from 'src/components/ThumbnailMini/ThumbnailMini'

export const QUERY = gql`
  query FindStepQuery($puzzleId: String!, $stepId: String, $stepNum: Int) {
    puzzle(id: $puzzleId) {
      id
      rewardable {
        id
        completed
      }
      steps {
        id
        stepSortWeight
        hasUserCompletedStep
      }
    }
    step: optionalStep(id: $stepId, puzzleId: $puzzleId, stepNum: $stepNum) {
      id
      challenge
      failMessage
      successMessage
      type
      stepSimpleText {
        solutionCharCount
      }
      stepNftCheck {
        chainId
        tokenId
        contractAddress
        poapEventId
      }
    }
  }
`

// @TODO: needs server side validation
const UPDATE_REWARDABLE_COMPLETE = gql`
  mutation UpdateRewardableCompleteMutation(
    $id: String!
    $input: UpdateRewardableInput!
  ) {
    updateRewardable(id: $id, input: $input) {
      id
      completed
    }
  }
`

export const Loading = () => <LoadingIcon />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStepQueryVariables>) => {
  const { slug, step } = useParams()
  return (
    <div>
      <p className="pb-6 text-gray-150">{error?.message}</p>
      <Button
        to={routes.puzzleStep({ slug, step: parseInt(step, 10) - 1 })}
        text="Go to Puzzle Page"
      />
    </div>
  )
}

export const Success = ({
  step,
  puzzle,
}: CellSuccessProps<FindStepQuery, FindStepQueryVariables>) => {
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()

  const [updateRewardable, { data }] = useMutation(UPDATE_REWARDABLE_COMPLETE, {
    onCompleted: () => {},
    onError: (error) => {
      console.log(error)
    },
  })

  const currentStepIndex = isAuthenticated
    ? loFindLastIndex(puzzle.steps, (step) => step.hasUserCompletedStep) + 1
    : 0

  const hasCompletedAllSteps = puzzle.steps.every(
    ({ hasUserCompletedStep }) => hasUserCompletedStep
  )

  useEffect(() => {
    if (!puzzle.rewardable.completed && hasCompletedAllSteps) {
      updateRewardable({
        variables: {
          id: puzzle.rewardable.id,
          input: {
            completed: true,
          },
        },
      })
    }
  }, [hasCompletedAllSteps, puzzle.rewardable, updateRewardable])

  return (
    <div>
      {step && (
        <>
          {step.type === 'SIMPLE_TEXT' && (
            <SimpleTextInput
              count={step.stepSimpleText.solutionCharCount}
              step={step}
              numberOfSteps={puzzle.steps.length}
              puzzleId={puzzle.id}
            />
          )}

          {step.type === 'NFT_CHECK' && (
            <NftCheckButton
              step={step}
              puzzleId={puzzle.id}
              numberOfSteps={puzzle.steps.length}
            />
          )}

          <div className="mx-auto mt-12 mb-12 max-w-prose p-4 md:mt-16 md:mb-20">
            {step.challenge && (
              <CollapsibleMarkdown
                title="Challenge"
                content={step.challenge}
                defaultOpen
              />
            )}
          </div>
        </>
      )}

      {puzzle.rewardable.completed && (
        <Button to={routes.claim({ id: puzzle.rewardable.id })} text="Mint" />
      )}

      {/* @TODO: should we forward if there's only one step? */}
      <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20">
        {puzzle.steps.map(({ stepSortWeight }) => (
          <ThumbnailMini
            key={stepSortWeight}
            name={`Step ${stepSortWeight.toString()}`}
            progress={getThumbnailProgress({
              currentStep: currentStepIndex + 1,
              puzzleStep: stepSortWeight,
            })}
            to={
              isAuthenticated
                ? routes.puzzleStep({
                    slug,
                    step: stepSortWeight,
                  })
                : null
            }
          />
        ))}
      </div>
    </div>
  )
}
