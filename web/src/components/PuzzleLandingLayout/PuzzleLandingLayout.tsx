import { PropsWithChildren } from 'react'

import { buildUrlString, cloudinaryUrl } from '@infinity-keys/core'
import {
  FindAnonRewardablePuzzleBySlug,
  FindRewardablePuzzleBySlug,
} from 'types/graphql'

import RewardableHeader from 'src/components/RewardableHeader/RewardableHeader'
import Seo from 'src/components/Seo/Seo'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'

import '@infinity-keys/react-lens-share-button/dist/style.css'
import Wrapper from '../Wrapper/Wrapper'

interface PuzzleLandingLayoutProps extends PropsWithChildren {
  rewardable:
    | FindAnonRewardablePuzzleBySlug['rewardable']
    | FindRewardablePuzzleBySlug['rewardable']
  stepParam: string
}

const PuzzleLandingLayout = ({
  rewardable,
  stepParam,
  children,
}: PuzzleLandingLayoutProps) => {
  if (!rewardable) return null

  // the full https url to this page
  const url = buildUrlString(
    rewardableLandingRoute({
      slug: rewardable.slug,
      type: rewardable.type,
      anonPuzzle: rewardable.puzzle?.isAnon,
    })
  )

  return (
    <div className="pt-10">
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name} puzzle?`}
        imageUrl={
          rewardable.nfts[0]?.cloudinaryId &&
          cloudinaryUrl(rewardable.nfts[0]?.cloudinaryId, 500, 500, false, 1)
        }
        url={url}
      />

      <div className="puzzle__main w-full text-center">
        {stepParam ?? (
          <Wrapper>
            <RewardableHeader
              name={rewardable.name}
              instructions={rewardable.explanation}
              cloudinaryId={rewardable.nfts[0]?.cloudinaryId}
              currentStep={stepParam}
            />
          </Wrapper>
        )}

        {children}
      </div>
    </div>
  )
}

export default PuzzleLandingLayout
