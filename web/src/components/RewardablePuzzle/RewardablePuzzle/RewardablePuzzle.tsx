import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'

import DummyThumbnail from 'src/components/DummyThumbnail/DummyThumbnail'
import PuzzleLandingLayout from 'src/components/PuzzleLandingLayout/PuzzleLandingLayout'
import StepsCell from 'src/components/StepsCell'
import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: FindRewardablePuzzleBySlug['rewardable']
}

const Rewardable = ({ rewardable }: Props) => {
  const { isAuthenticated } = useAuth()
  const { step: stepParam } = useParams()
  const stepNum = stepParam && parseInt(stepParam, 10)
  const stepIndex = stepNum && stepNum - 1

  return (
    <PuzzleLandingLayout rewardable={rewardable} stepParam={stepParam}>
      {isAuthenticated ? (
        <StepsCell
          stepId={stepParam && rewardable.puzzle.steps[stepIndex].id}
          puzzleId={rewardable.puzzle.id}
          stepNum={stepNum && stepNum}
        />
      ) : (
        <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20">
          {rewardable.puzzle.steps.map(({ stepSortWeight }) => (
            <DummyThumbnail
              key={stepSortWeight}
              name={`Step ${stepSortWeight.toString()}`}
            />
          ))}
        </div>
      )}
    </PuzzleLandingLayout>
  )
}

export default Rewardable
