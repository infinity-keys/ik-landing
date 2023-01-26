import { buildUrlString, cloudinaryUrl } from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'
import type { FindRewardablePackBySlug } from 'types/graphql'

import RewardableHeader from 'src/components/RewardableHeader/RewardableHeader'
import Seo from 'src/components/Seo/Seo'
import Thumbnail from 'src/components/Thumbnail/Thumbnail'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import useCurrentWidth from 'src/hooks/useCurrentWidth'
import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: NonNullable<FindRewardablePackBySlug['pack']>
}

// @TODO: get from NFT
const cloudinaryId = 'ik-alpha-trophies/Map-04_xzczep'
const LAYOUT_BREAKPOINT = 768

const Rewardable = ({ rewardable }: Props) => {
  const width = useCurrentWidth()
  return (
    <>
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name}?`}
        imageUrl={
          cloudinaryId && cloudinaryUrl(cloudinaryId, 500, 500, false, 1)
        }
        url={buildUrlString(`/pack/${rewardable.slug}`)}
      />

      <div className="pack__main w-full px-4 text-center">
        <RewardableHeader
          name={rewardable.name}
          instructions={rewardable.explanation}
          cloudinaryId={cloudinaryId}
        />

        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20 lg:flex-nowrap">
          {rewardable.asParent.map(({ childRewardable }) => (
            <Thumbnail
              key={childRewardable.id}
              id={childRewardable.id}
              name={childRewardable.name}
              href={`/puzzle/${childRewardable.slug}`}
              isGrid={width >= LAYOUT_BREAKPOINT}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 px-4 pb-9 pt-8">
        <LensShareButton
          postBody={`Can you unlock the ${rewardable.name}?`}
          url={buildUrlString(`/pack/${rewardable.slug}`)}
          className="text-sm font-medium"
        />
        <TwitterShare
          tweetBody={`Can you unlock the ${
            rewardable.name
          }? @InfinityKeys\n\n${buildUrlString(`/pack/${rewardable.slug}`)}`}
        />
      </div>
    </>
  )
}

export default Rewardable
