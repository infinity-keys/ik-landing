import { Fragment, PropsWithChildren } from 'react'

import { buildUrlString, cloudinaryUrl } from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'
import capitalize from 'lodash/capitalize'
import {
  FindAnonRewardablePuzzleBySlug,
  FindRewardablePuzzleBySlug,
} from 'types/graphql'

import { Link } from '@redwoodjs/router'

import RewardableHeader from 'src/components/RewardableHeader/RewardableHeader'
import Seo from 'src/components/Seo/Seo'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'

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
  // the full https url to this page
  const url = buildUrlString(
    rewardableLandingRoute({
      slug: rewardable.slug,
      type: rewardable.type,
      anonPuzzle: rewardable.puzzle.isAnon,
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

      <div className="puzzle__main w-full px-4 text-center">
        <RewardableHeader
          name={rewardable.name}
          instructions={rewardable.explanation}
          cloudinaryId={rewardable.nfts[0]?.cloudinaryId}
          currentStep={stepParam}
        />

        {children}
      </div>

      {/* Allows user to navigate to every public parent of this puzzle */}
      {rewardable.asChildPublicParentRewardables.length > 0 && (
        <div className="text-center text-gray-200">
          <p>
            Return to:
            {rewardable.asChildPublicParentRewardables.map(
              ({ parentRewardable: { slug, name, type } }, index) => (
                <Fragment key={slug + type}>
                  {/* prepend a comma to all but the first item */}
                  {index ? ', ' : ''}
                  <Link
                    to={rewardableLandingRoute({ slug, type })}
                    className="ml-2 mt-2 inline-block italic transition-colors hover:text-turquoise"
                  >
                    {name} {capitalize(type)}
                  </Link>
                </Fragment>
              )
            )}
          </p>
        </div>
      )}

      <div className="flex justify-center gap-4 px-4 pb-9 pt-16">
        <LensShareButton
          postBody={`Can you unlock the ${rewardable.name} puzzle?`}
          url={url}
          className="text-sm font-medium"
        />
        <TwitterShare
          tweetBody={`Can you unlock the ${rewardable.name} puzzle? @InfinityKeys\n\n${url}`}
        />
      </div>
    </div>
  )
}

export default PuzzleLandingLayout
