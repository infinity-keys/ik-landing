import { lazy } from 'react'

import {
  buildUrlString,
  cloudinaryUrl,
  ThumbnailProgress,
} from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'
import type { FindRewardablePackBySlug } from 'types/graphql'

import { routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import RewardableHeader from 'src/components/RewardableHeader/RewardableHeader'
import Seo from 'src/components/Seo/Seo'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import useCurrentWidth from 'src/hooks/useCurrentWidth'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'

import '@infinity-keys/react-lens-share-button/dist/style.css'

const Thumbnail = lazy(() => import('src/components/Thumbnail/Thumbnail'))

interface Props {
  rewardable: NonNullable<FindRewardablePackBySlug['pack']>
}

const LAYOUT_BREAKPOINT = 768

const Rewardable = ({ rewardable }: Props) => {
  const { isAuthenticated } = useAuth()
  const width = useCurrentWidth()

  // the full https url to this page
  const url = buildUrlString(
    rewardableLandingRoute({
      slug: rewardable.slug,
      type: rewardable.type,
    })
  )

  return (
    <>
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name}?`}
        imageUrl={
          rewardable.nfts[0]?.cloudinaryId &&
          cloudinaryUrl(rewardable.nfts[0]?.cloudinaryId, 500, 500, false, 1)
        }
        url={url}
      />

      <div className="pack__main mt-10 w-full px-4 text-center">
        <RewardableHeader
          name={rewardable.name}
          instructions={rewardable.explanation}
          cloudinaryId={rewardable.nfts[0]?.cloudinaryId}
        />

        {rewardable.userRewards.length > 0 && (
          <div className="flex justify-center">
            <Button to={routes.claim({ id: rewardable.id })} text="Mint" />
          </div>
        )}

        <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20">
          {rewardable.asParent.map(({ childRewardable }) => {
            const solvedArray = childRewardable.puzzle.steps.map(
              ({ hasUserCompletedStep }) => hasUserCompletedStep
            )
            return (
              <Thumbnail
                key={childRewardable.id}
                id={childRewardable.id}
                name={childRewardable.name}
                href={rewardableLandingRoute({
                  type: childRewardable.type,
                  slug: childRewardable.slug,
                })}
                progress={
                  childRewardable.userRewards.length
                    ? ThumbnailProgress.Completed
                    : ThumbnailProgress.Unknown
                }
                isGrid={width >= LAYOUT_BREAKPOINT}
                cloudinaryId={childRewardable.nfts[0]?.cloudinaryId}
                solvedArray={isAuthenticated ? solvedArray : []}
              />
            )
          })}
        </div>
      </div>

      <div className="flex justify-center gap-4 px-4 pb-9 pt-8">
        <LensShareButton
          postBody={`Can you unlock the ${rewardable.name}?`}
          url={url}
          className="text-sm font-medium"
        />
        <TwitterShare
          tweetBody={`Can you unlock the ${rewardable.name}? @InfinityKeys\n\n${url}`}
        />
      </div>
    </>
  )
}

export default Rewardable
