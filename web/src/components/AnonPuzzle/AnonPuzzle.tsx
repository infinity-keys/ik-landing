import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import { useParams } from '@redwoodjs/router'

import AnonStepsCell from 'src/components/AnonStepsCell'
import PuzzleLandingLayout from 'src/components/PuzzleLandingLayout/PuzzleLandingLayout'

import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: NonNullable<FindRewardablePuzzleBySlug['puzzle']>
}

const AnonPuzzle = ({ rewardable }: Props) => {
  const { step: stepParam } = useParams()
  const stepNum = stepParam && parseInt(stepParam, 10)
  const stepIndex = stepNum && stepNum - 1

  return (
    <PuzzleLandingLayout rewardable={rewardable} stepParam={stepParam}>
      <AnonStepsCell
        stepId={stepParam && rewardable.puzzle.steps[stepIndex].id}
        puzzleId={rewardable.puzzle.id}
        stepNum={stepNum && stepNum}
      />
    </PuzzleLandingLayout>
  )
}

export default AnonPuzzle
