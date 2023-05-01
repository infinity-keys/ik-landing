import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import { useAuth } from 'src/auth'
import { useParams } from '@redwoodjs/router'
import { routes } from '@redwoodjs/router'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
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
        <div>
          <div className="flex justify-center">
            <Alert text="Must be logged in to play." />
          </div>
          <div className="mt-4 flex justify-center">
            <Button text="Login to Play" to={routes.profile()} />
          </div>
          <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20">
            {rewardable.puzzle.steps.map(({ stepSortWeight }) => (
              <DummyThumbnail
                key={stepSortWeight}
                name={`Step ${stepSortWeight.toString()}`}
              />
            ))}
          </div>
        </div>
      )}
    </PuzzleLandingLayout>
  )
}

export default Rewardable
