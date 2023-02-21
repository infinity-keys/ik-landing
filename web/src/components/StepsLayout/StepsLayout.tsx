import { getThumbnailProgress } from '@infinity-keys/core'

import CollapsibleMarkdown from 'src/components/CollapsibleMarkdown/CollapsibleMarkdown'
import NftCheckButton from 'src/components/NftCheckButton/NftCheckButton'
import SimpleTextInput from 'src/components/SimpleTextInput/SimpleTextInput'
import ThumbnailMini from 'src/components/ThumbnailMini/ThumbnailMini'

const StepsLayout = ({
  getThumbnailRoute,
  currentStepIndex,
  puzzle,
  step,
  children,
}) => {
  return (
    <div>
      {step && (
        <div>
          {step.type === 'SIMPLE_TEXT' && (
            <SimpleTextInput
              count={step.stepSimpleText.solutionCharCount}
              step={step}
              puzzleId={puzzle.id}
            />
          )}

          {step.type === 'NFT_CHECK' && (
            <NftCheckButton step={step} puzzleId={puzzle.id} />
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
        </div>
      )}

      {children}

      <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20">
        {puzzle.steps.map(({ stepSortWeight }) => (
          <ThumbnailMini
            key={stepSortWeight}
            name={`Step ${stepSortWeight.toString()}`}
            progress={getThumbnailProgress({
              currentStep: currentStepIndex + 1,
              puzzleStep: stepSortWeight,
            })}
            to={getThumbnailRoute(stepSortWeight)}
          />
        ))}
      </div>
    </div>
  )
}

export default StepsLayout
