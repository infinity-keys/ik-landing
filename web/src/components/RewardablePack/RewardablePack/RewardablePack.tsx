import {
  buildUrlString,
  cloudinaryUrl,
  ThumbnailProgress,
} from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'
import type { FindRewardablePackBySlug } from 'types/graphql'

import { routes } from '@redwoodjs/router'

import Button from 'src/components/Button'
import RewardableHeader from 'src/components/RewardableHeader/RewardableHeader'
import Seo from 'src/components/Seo/Seo'
import Thumbnail from 'src/components/Thumbnail/Thumbnail'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import useCurrentWidth from 'src/hooks/useCurrentWidth'
import '@infinity-keys/react-lens-share-button/dist/style.css'
import { rewardableLandingRoute } from 'src/lib/urlBuilders'

interface Props {
  rewardable: NonNullable<FindRewardablePackBySlug['pack']>
}

const LAYOUT_BREAKPOINT = 768

const Rewardable = ({ rewardable }: Props) => {
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

      <div className="pack__main w-full px-4 text-center">
        <RewardableHeader
          name={rewardable.name}
          instructions={rewardable.explanation}
          cloudinaryId={rewardable.nfts[0]?.cloudinaryId}
        />

        {rewardable.userRewards.length > 0 && (
          <Button to={routes.claim({ id: rewardable.id })} text="Mint" />
        )}

        <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20">
          {rewardable.asParent.map(({ childRewardable }) => {
            return (
              <Thumbnail
                key={childRewardable.id}
                id={childRewardable.id}
                name={childRewardable.name}
                href={rewardableLandingRoute({
                  type: childRewardable.type,
                  slug: childRewardable.slug,
                  anonPuzzle: childRewardable.puzzle?.isAnon,
                })}
                progress={
                  childRewardable.userRewards.length
                    ? ThumbnailProgress.Completed
                    : ThumbnailProgress.Unknown
                }
                isGrid={width >= LAYOUT_BREAKPOINT}
                cloudinaryId={childRewardable.nfts[0]?.cloudinaryId}
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
