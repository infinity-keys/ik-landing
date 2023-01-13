import { buildUrlString, cloudinaryUrl } from '@infinity-keys/core'
import { LensShareButton } from '@infinity-keys/react-lens-share-button'
import type { FindRewardablePuzzleBySlug } from 'types/graphql'

import Seo from 'src/components/Seo/Seo'
import TwitterShare from 'src/components/TwitterShare/TwitterShare'
import Wrapper from 'src/components/Wrapper/Wrapper'
import '@infinity-keys/react-lens-share-button/dist/style.css'

interface Props {
  rewardable: NonNullable<FindRewardablePuzzleBySlug['puzzle']>
}

// @TODO: get from NFT
const cloudinaryId = 'ik-alpha-trophies/Map-04_xzczep'

const Rewardable = ({ rewardable }: Props) => {
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
        <h1>{rewardable.name}</h1>
        {/* <PuzzleHeader
          name={rewardable.name}
          instructions={rewardable.explanation}
          cloudinaryId={cloudinaryId}
          currentStep={stepParam}
        /> */}

        {/* <StepsCell
          stepId={stepParam && rewardable.puzzle.steps[stepIndex].id}
          puzzleId={rewardable.puzzle.id}
        /> */}
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
