import { PropsWithChildren, lazy, Suspense } from 'react'

import { FindStepQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Markdown from 'src/components/Markdown/Markdown'
import MarkdownCarousel from 'src/components/MarkdownCarousel/MarkdownCarousel'

interface StepsLayoutProps extends PropsWithChildren {
  currentStepId?: string
  hasBeenSolved: boolean
  puzzle: FindStepQuery['puzzle']
  step: FindStepQuery['step']
  stepNum?: number
}

// const SimpleTextInput = lazy(
//   () => import('src/components/SimpleTextInput/SimpleTextInput')
// )
// const AccountCheckButton = lazy(
//   () => import('src/components/AccountCheckButton/AccountCheckButton')
// )
// const StepLensApiButton = lazy(
//   () => import('src/components/StepLensApiButton/StepLensApiButton')
// )
// const ThumbnailMini = lazy(
//   () => import('src/components/ThumbnailMini/ThumbnailMini')
// )
// const CollapsibleMarkdown = lazy(
//   () => import('src/components/CollapsibleMarkdown/CollapsibleMarkdown')
// )

const Alert = lazy(() => import('src/components/Alert/Alert'))
const Button = lazy(() => import('src/components/Button/Button'))

const StepsLayout = ({
  hasBeenSolved,
  puzzle,
  step,
  stepNum,
  children,
}: StepsLayoutProps) => {
  const { isAuthenticated } = useAuth()

  if (!puzzle) return null
  const showButton = !stepNum && puzzle?.rewardable

  return (
    <div className="flex justify-center">
      {showButton && (
        <div className="mb-6">
          {isAuthenticated ? (
            <Button
              {...(hasBeenSolved
                ? { to: routes.claim({ id: puzzle.rewardable.id }) }
                : {})}
              text="Claim"
              disabled={!hasBeenSolved}
            />
          ) : (
            <div className="flex justify-center">
              <Alert text="Please sign in to claim" />
            </div>
          )}
        </div>
      )}

      <Suspense fallback={<LoadingIcon />}>
        {step && (
          <div className="flex w-full max-w-lg flex-col md:max-w-5xl md:flex-row md:gap-8 md:px-6">
            <div className="flex-1">
              <img src={step.featuredImage} alt="" className="block w-full" />
            </div>
            <div className="flex-1 pb-6">
              <MarkdownCarousel>
                {step.body.map((text, i) => {
                  if (!text) return null
                  return (
                    <div key={i} className="markdown py-20 px-12">
                      <Markdown>{text}</Markdown>
                    </div>
                  )
                })}
              </MarkdownCarousel>
            </div>
            {/* // <div>
            //   {step.type === 'SIMPLE_TEXT' && (
            //     <div className="pt-8">
            //       <SimpleTextInput
            //         count={step.stepSimpleText?.solutionCharCount || 0}
            //         step={step}
            //         puzzleId={puzzle.id}
            //         isAnon={puzzle.isAnon}
            //       />
            //     </div>
            //   )}

            //   {(step.type === 'NFT_CHECK' ||
            //     step.type === 'FUNCTION_CALL' ||
            //     step.type === 'COMETH_API' ||
            //     step.type === 'ORIUM_API' ||
            //     step.type === 'ASSET_TRANSFER' ||
            //     step.type === 'TOKEN_ID_RANGE' ||
            //     step.type === 'ERC20_BALANCE') && (
            //     <div className="pt-8">
            //       <AccountCheckButton step={step} puzzleId={puzzle.id} />
            //     </div>
            //   )}

            //   {step.type === 'LENS_API' && (
            //     <div className="pt-8">
            //       <StepLensApiButton step={step} puzzleId={puzzle.id} />
            //     </div>
            //   )}
            // </div> */}
          </div>
        )}
      </Suspense>

      <div>{children}</div>
    </div>
  )
}

export default StepsLayout
