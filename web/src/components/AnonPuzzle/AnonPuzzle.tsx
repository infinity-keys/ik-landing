import type { FindAnonRewardablePuzzleBySlug } from 'types/graphql'

import { useParams } from '@redwoodjs/router'

import AnonStepsCell from 'src/components/AnonStepsCell'
import PuzzleLandingLayout from 'src/components/PuzzleLandingLayout/PuzzleLandingLayout'

import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: FindAnonRewardablePuzzleBySlug['rewardable']
}

const AnonPuzzle = ({ rewardable }: Props) => {
  const { step: stepParam } = useParams()

  if (!rewardable?.puzzle?.id) return null

  const stepNum = stepParam ? parseInt(stepParam, 10) : null
  const stepIndex = stepNum && stepNum - 1

  const stepId =
    typeof stepIndex === 'number'
      ? rewardable?.puzzle?.steps[stepIndex]?.id
      : undefined

  return (
    <PuzzleLandingLayout rewardable={rewardable} stepParam={stepParam}>
      <AnonStepsCell
        stepId={stepId}
        puzzleId={rewardable.puzzle.id}
        stepNum={stepNum && stepNum}
      />
    </PuzzleLandingLayout>
  )
}

export default AnonPuzzle
