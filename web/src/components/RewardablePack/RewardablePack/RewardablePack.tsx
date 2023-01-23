import { buildUrlString, cloudinaryUrl } from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'
import type { FindRewardablePackBySlug } from 'types/graphql'

import RewardableHeader from 'src/components/RewardableHeader/RewardableHeader'
import Seo from 'src/components/Seo/Seo'
import Thumbnail from 'src/components/Thumbnail/Thumbnail'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import Wrapper from 'src/components/Wrapper/Wrapper'
import useCurrentWidth from 'src/hooks/useCurrentWidth'
import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: NonNullable<FindRewardablePackBySlug['pack']>
}

// @TODO: get from NFT
const cloudinaryId = 'ik-alpha-trophies/Map-04_xzczep'
const LAYOUT_BREAKPOINT = 768

const isPuzzleCompleted = ({ steps }) =>
  steps.every(({ hasUserCompletedStep }) => hasUserCompletedStep)

const isPackCompleted = (pack) =>
  pack.every(({ childRewardable }) => {
    return isPuzzleCompleted(childRewardable.puzzle)
  })

const Rewardable = ({ rewardable }: Props) => {
  const width = useCurrentWidth()

  return (
    <Wrapper full fullHeight>
      <Seo
        title={rewardable.name}
        description={`Can you unlock the ${rewardable.name}?`}
        imageUrl={
          cloudinaryId && cloudinaryUrl(cloudinaryId, 500, 500, false, 1)
        }
        url={buildUrlString(`/pack/${rewardable.slug}`)}
      />

      <main className="pack__main w-full px-4 pt-10 text-center md:pt-20">
        <RewardableHeader
          name={rewardable.name}
          instructions={rewardable.explanation}
          cloudinaryId={cloudinaryId}
        />

        {isPackCompleted(rewardable.asParent) ? 'completed' : 'not completed'}

        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-4 pb-12 sm:flex-row md:pb-20 lg:flex-nowrap">
          {rewardable.asParent.map(({ childRewardable }) => (
            <div key={childRewardable.id}>
              <Thumbnail
                key={childRewardable.id}
                id={childRewardable.id}
                name={childRewardable.name}
                href={`/puzzle/${childRewardable.slug}`}
                isGrid={width >= LAYOUT_BREAKPOINT}
              />
              <p>
                {isPuzzleCompleted(childRewardable.puzzle)
                  ? 'completed'
                  : 'not completed'}
              </p>
            </div>
          ))}
        </div>
      </main>

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
    </Wrapper>
  )
}

export default Rewardable
