import { PropsWithChildren } from 'react'

import { buildUrlString, cloudinaryUrl } from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'
import {
  FindAnonRewardablePuzzleBySlug,
  FindRewardablePuzzleBySlug,
} from 'types/graphql'

import RewardableHeader from 'src/components/RewardableHeader/RewardableHeader'
import Seo from 'src/components/Seo/Seo'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'

import '@infinity-keys/react-lens-share-button/dist/style.css'

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
  return (
    <>
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name} puzzle?`}
        imageUrl={
          rewardable.nfts[0]?.cloudinaryId &&
          cloudinaryUrl(rewardable.nfts[0]?.cloudinaryId, 500, 500, false, 1)
        }
        url={buildUrlString(`/puzzle/${rewardable.slug}`)}
      />

      <div className="puzzle__main w-full px-4 text-center">
        <RewardableHeader
          name={rewardable.name}
          instructions={rewardable.explanation}
          cloudinaryId={rewardable.nfts[0]?.cloudinaryId}
          currentStep={stepParam}
        />

        {children}
      </div>

      <div className="flex justify-center gap-4 px-4 pb-9 pt-8">
        <LensShareButton
          postBody={`Can you unlock the ${rewardable.name} puzzle?`}
          url={buildUrlString(`/puzzle/${rewardable.slug}`)}
          className="text-sm font-medium"
        />
        <TwitterShare
          tweetBody={`Can you unlock the ${
            rewardable.name
          } puzzle? @InfinityKeys\n\n${buildUrlString(
            `/puzzle/${rewardable.slug}`
          )}`}
        />
      </div>
    </>
  )
}

export default PuzzleLandingLayout
